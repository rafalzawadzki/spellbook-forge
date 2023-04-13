import yaml from 'js-yaml';
import fs from 'fs';

export const readYaml = (path: string) => {
  try {
    return yaml.load(fs.readFileSync(path, 'utf8'));
  } catch (e) {
    console.log(e);
  }
};
