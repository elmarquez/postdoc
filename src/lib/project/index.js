import Database from "../database";
import path from "path";
import Utils from "../utils";

const PROJECT_SETTINGS_FILE = "project.json";

function getSettings(fp) {
  const p = path.join(fp, PROJECT_SETTINGS_FILE);
  return Utils.files.readJSON(p);
}

function updateIndex(fp) {
  return Database.loadFromDir(fp)
    .updateIndex()
    .write();
}

export default {
  getSettings,
  updateIndex
};
