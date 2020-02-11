import Bibtex from "bibtex";
import Promise from 'bluebird';
import Utils from '../utils';
import {getJsonType} from "../utils/type";

// bibtex parser
const parser = new Bibtex();

/**
 * Load bibtex file.
 * @param {string} p - Path to file
 * @returns {Promise}
 */
function loadBibtex(p) {
  return loadText(p).then(parser.getBibFromObject);
}

/**
 * Load file into memory. Returns a byte array.
 * @param {string} p - File path
 * @return {Promise}
 */
function loadFile(p) {
  return Utils.files.loadFile(p);
}

/**
 * Load image file into memory. Returns a byte array.
 * @param {string} p - File path
 * @return {Promise}
 */
function loadImage(p) {
  return Utils.files.readFile(p);
}

/**
 * Load JSON.
 * @param {string} p - Path to file
 * @returns {Promise}
 */
function loadJSON(p) {
  return Utils.files.readJSON(p);
}

/**
 * Load PDF document.
 * @param {string} p - Path to file
 * @returns {Promise}
 */
function loadPDF(p) {
  return Utils.files.readFile(p).then(function (data) {
    return data.toString('base64');
  });
}

/**
 * Load text file into memory.
 * @param {string} p - File path
 * @return {Promise}
 */
function loadText(p) {
  return Utils.files.readFile(p, 'utf8');
}

export default {
  loadBibtex,
  loadFile,
  loadImage,
  loadJSON,
  loadPDF,
  loadText
};
