import * as dotenv from 'dotenv';
dotenv.config();
import { NextFunction, Router, Response, Request } from 'express';
import { del, getOrAct, upsert } from './prompts-controller';
import { ForgeOptions } from './types';

export function spellbookForge(options: ForgeOptions) {
  const router = Router();

  const attachOptions = (options: ForgeOptions) => {
    return (req: Request, res: Response, next: NextFunction) => {
      req.options = options;
      next();
    };
  };

  router.use(attachOptions(options));
  router.get('/:userId/:repoId/*', getOrAct);
  router.post('/:userId/:repoId/*', upsert);
  router.delete('/:userId/:repoId/*', del);
  return router;
}
