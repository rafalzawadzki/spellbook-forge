import { Request, Response } from 'express';
import { deleteFile, getPromptBundle, resolveRepositoryUrl, upsertFile } from './git-file-repository';
import { executePrompt } from './execute-prompt';

export const getOrAct = async (req: Request, res: Response) => {
  try {
    const repositoryUrl = resolveRepositoryUrl(req);
    const filePath = req.params[0];
    const promptBundle = await getPromptBundle(repositoryUrl, filePath);
    if (req.query.execute) {
      const response = await executePrompt(promptBundle.template);
      res.json({
        'prompt-content': promptBundle.template,
        response,
      });
    } else {
      res.json({ content: promptBundle.template });
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
