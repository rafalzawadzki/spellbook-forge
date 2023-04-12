export {};

export interface ForgeOptions {
  gitHost: string;
}

declare global {
  namespace Express {
    export interface Request {
      options: ForgeOptions;
    }
  }
}
