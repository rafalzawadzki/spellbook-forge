import { resolveRepositoryUrl } from '../src/git-file-repository';
import {Request} from "express";

test('Repository url resolved correctly', () => {
  const req: Request = {
    params: {
      userId: 'userId',
      repoId: 'repoId'
    },
    options: {
      gitHost: 'gitHost'
    }
  } as any as Request; // overriding TS type to make it easier to test
  expect(resolveRepositoryUrl(req)).toBe(`gitHost/userId/repoId`);
});
