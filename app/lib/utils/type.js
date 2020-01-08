import { basename } from 'path';
import { has } from 'ramda';
import files from './files';
import MIMETYPES from '../../constants/mimetypes';

/**
 * Get the file type identifier.
 * @param {string} fp - File path
 * @param {object} data - File data
 * @return {string} mimetype identifier
 */
function getFileType(fp, data) {
  const filename = basename(fp);
  if (filename === MIMETYPES.PACKAGE_JSON.filename) {
    return MIMETYPES.PACKAGE_JSON;
  }
  const ext = files.getFileExtension(filename);
  switch (ext) {
    case MIMETYPES.ASCIIDOC.extension:
      return MIMETYPES.ASCIIDOC;
    case MIMETYPES.BASH.extension:
      return MIMETYPES.BASH;
    case MIMETYPES.BIBTEX.extension:
      return MIMETYPES.BIBTEX;
    case MIMETYPES.BMP.extension:
      return MIMETYPES.BMP;
    case MIMETYPES.CSV.extension:
      return MIMETYPES.CSV;
    case MIMETYPES.GIF.extension:
      return MIMETYPES.GIF;
    case MIMETYPES.HTML.extension:
      return MIMETYPES.HTML;
    case MIMETYPES.JAVASCRIPT.extension:
      return MIMETYPES.JAVASCRIPT;
    case MIMETYPES.JPEG.extension:
      return MIMETYPES.JPEG;
    case MIMETYPES.JSON.extension:
      return getJsonType(filename, data);
    case MIMETYPES.JSON_LD.extension:
      return MIMETYPES.JSON_LD;
    case MIMETYPES.MARKDOWN.extension:
      return MIMETYPES.MARKDOWN;
    case MIMETYPES.PDF.extension:
      return MIMETYPES.PDF;
    case MIMETYPES.PYTHON.extension:
      return MIMETYPES.PYTHON;
    case MIMETYPES.RICHTEXT.extension:
      return MIMETYPES.RICHTEXT;
    case MIMETYPES.SVG.extension:
      return MIMETYPES.SVG;
    case MIMETYPES.TEXT.extension:
      return MIMETYPES.TEXT;
    case MIMETYPES.TIFF.extension:
      return MIMETYPES.TIFF;
    case MIMETYPES.WEBP.extension:
      return MIMETYPES.WEBP;
    default:
      return MIMETYPES.TEXT;
      // return MIMETYPES.UNKNOWN;
  }
}

/**
 * Get JSON data type.
 * @param {object} data - Data
 * @returns {object}
 */
function getJsonType(data) {
  if (has(data, '$schema')) {
    const { $schema } = data;
    switch ($schema) {
      case MIMETYPES.BIBJSON.schema:
        return MIMETYPES.BIBJSON;
      case MIMETYPES.POSTDOC_PROJECT.schema:
        return MIMETYPES.POSTDOC_PROJECT;
      default:
        return MIMETYPES.JSON;
    }
  } else {
    return MIMETYPES.JSON;
  }
}

export {
  getFileType,
};
