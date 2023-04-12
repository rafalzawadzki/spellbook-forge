import path from 'path';
import fs from 'fs-extra';
import { Request } from 'express';
import crypto from 'crypto';
import os from 'os';
import simpleGit from 'simple-git';

const branchName = 'main';

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

export const getFile = async (repositoryUrl: string, filePath: string) => {
  const cloneFolder = await prepareTempRepo();
  const git = await cloneRepo(repositoryUrl, cloneFolder);
  const localFilePath = path.join(cloneFolder, filePath);
  return fs.readFile(localFilePath, 'utf8');
};

export const upsertFile = async (repositoryUrl: string, filePath: string, content: string) => {
  const cloneFolder = await prepareTempRepo();
  const git = await cloneRepo(repositoryUrl, cloneFolder);
  const localFilePath = path.join(cloneFolder, filePath);
  await fs.outputFile(localFilePath, content);
  await git.add('.');
  await git.commit(`Update ${path.basename(filePath)}`);
  await git.push('origin', branchName);
};

export const deleteFile = async (repositoryUrl: string, filePath: string) => {
  const cloneFolder = await prepareTempRepo();
  const git = await cloneRepo(repositoryUrl, cloneFolder);
  const localFilePath = path.join(cloneFolder, filePath);
  await fs.unlink(localFilePath);
  await git.add('.');
  await git.commit(`Delete ${path.basename(filePath)}`);
  await git.push('origin', branchName);
};
