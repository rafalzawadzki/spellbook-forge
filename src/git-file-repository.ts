import path from 'path';
import fs from 'fs-extra';
import { Request } from 'express';
import crypto from 'crypto';
import os from 'os';
import simpleGit from 'simple-git';
import yaml from "js-yaml";

const branchName = 'main';

type PromptBundle = {
  input_variables: [string]
  //output_parser: null
  template: string
  template_format: string
}

const acceptedExtensions = ['json', 'yaml', 'yml'];

const getFileWithExtension = async (folderPath: string, filePath: string, extensions = acceptedExtensions) => {
  const fullPath = path.join(folderPath, filePath);
  const fileCandidates = extensions.map((ext) => path.join(fullPath, `prompt.${ext}`));

  for (const candidate of fileCandidates) {
    if (await fs.pathExists(candidate)) {
      return candidate;
    }
  }

  throw new Error(`File not found with accepted extensions (${extensions.join(', ')})`);
};

export const resolveRepositoryUrl = (req: Request) => {
  const { userId, repoId } = req.params;
  const { gitHost } = req.options;
  return `${gitHost}/${userId}/${repoId}`;
};

function generateTempRepoPath() {
  const randomId = crypto.randomBytes(8).toString('hex');
  return path.join(os.tmpdir(), `temp-git-folder-${randomId}`);
}

async function cloneRepo(repositoryUrl: string, cloneFolder: string) {
  const git = simpleGit();
  await git.clone(repositoryUrl, cloneFolder);
  await git.cwd(cloneFolder);
  await git.checkout(branchName);
  return git;
}

const prepareTempRepo = async () => {
  return generateTempRepoPath();
};

export const cleanupTempRepo = async (directory: string) => {
  await fs.remove(directory);
};

export const getPromptBundle = async (repositoryUrl: string, filePath: string): Promise<PromptBundle> => {
  const cloneFolder = await prepareTempRepo();
  await cloneRepo(repositoryUrl, cloneFolder);
  const localFilePath = await getFileWithExtension(cloneFolder, filePath);
  const content = await fs.readFile(localFilePath, 'utf8');

  if (localFilePath.endsWith('.json')) {
    return JSON.parse(content) as PromptBundle;
  } else if (localFilePath.endsWith('.yaml') || localFilePath.endsWith('.yml')) {
    return yaml.load(content) as PromptBundle;
  } else {
    throw new Error('Invalid file extension');
  }
};

export const upsertFile = async (repositoryUrl: string, filePath: string, content: string) => {
  const cloneFolder = await prepareTempRepo();
  const git = await cloneRepo(repositoryUrl, cloneFolder);
  const localFilePath = await getFileWithExtension(cloneFolder, filePath);
  let fileData;

  if (localFilePath.endsWith('.json')) {
    fileData = JSON.stringify({ template: content });
  } else if (localFilePath.endsWith('.yaml') || localFilePath.endsWith('.yml')) {
    fileData = yaml.dump({ template: content });
  } else {
    throw new Error('Invalid file extension');
  }

  await fs.outputFile(localFilePath, fileData);
  await git.add('.');
  await git.commit(`Update ${path.basename(filePath)}`);
  await git.push('origin', branchName);
};

export const deleteFile = async (repositoryUrl: string, filePath: string) => {
  const cloneFolder = await prepareTempRepo();
  const git = await cloneRepo(repositoryUrl, cloneFolder);
  const localFilePath = await getFileWithExtension(cloneFolder, filePath);
  await fs.unlink(localFilePath);
  await git.add('.');
  await git.commit(`Delete ${path.basename(filePath)}`);
  await git.push('origin', branchName);
};
