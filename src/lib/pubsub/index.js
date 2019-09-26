import path from "path";
import pubsub from "pubsub.js";
import utils from "../utils/index";

const EVENTS = utils.loadJSONSync(
  path.join(__dirname, "..", "constants", "events.json")
);

const EVENTS2 = {
  APPLICATION_QUIT: "APPLICATION_QUIT",
  FILE_LOAD: "FILE_LOAD",
  FILE_LOAD_ERROR: "FILE_LOAD_ERROR",
  PROJECT_LOAD: "PROJECT_LOAD",
  PROJECT_LOAD_ERROR: "PROJECT_LOAD_ERROR",
  PROJECT_OPEN: "PROJECT_OPEN"
};

export default {
  EVENTS,
  pubsub
};
