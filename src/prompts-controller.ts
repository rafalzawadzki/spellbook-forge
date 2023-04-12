import { Request, Response } from 'express';
import { deleteFile, getFile, resolveRepositoryUrl, upsertFile } from './git-file-repository';
import { executePrompt } from './execute-prompt';

export const getOrAct = async (req: Request, res: Response) => {
  try {
    const repositoryUrl = resolveRepositoryUrl(req);
    const filePath = req.params[0];
    const content = await getFile(repositoryUrl, filePath);
    if (req.query.execute) {
      const response = await executePrompt(content);
      res.json({
        'prompt-content': content,
        response,
      });
    } else {
      res.json({ content });
    }
    //cleanupTempRepo(cloneFolder)
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const upsert = async (req: Request, res: Response) => {
  try {
    const repositoryUrl = resolveRepositoryUrl(req);
    const { content } = req.body;
    const filePath = req.params[0];
    await upsertFile(repositoryUrl, filePath, content);
    res.json({ message: 'File created/updated successfully' });
    //cleanupTempRepo(cloneFolder)
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const del = async (req: Request, res: Response) => {
  try {
    const repositoryUrl = resolveRepositoryUrl(req);
    const filePath = req.params[0];
    await deleteFile(repositoryUrl, filePath);
    res.json({ message: 'File deleted successfully' });
    //cleanupTempRepo(cloneFolder)
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
