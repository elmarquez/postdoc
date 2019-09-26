import { combineReducers } from "redux";
import application from "./application";
import library from "./library";
import profile from "./profile";
import project from "./project";

export default combineReducers({ application, library, profile, project });
