import { loadFromDir } from '../database';
import { join } from 'path';
import Utils from '../utils';

const PROJECT_SETTINGS_FILE = 'project.json';

function getSettings(fp) {
  const p = join(fp, PROJECT_SETTINGS_FILE);
  return Utils.files.readJSON(p);
}

export function updateIndex(fp) {
  return loadFromDir(fp).updateIndex().write();
}

export default {
  getSettings,
  updateIndex
};
