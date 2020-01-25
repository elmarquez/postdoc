import Bibtex from "bibtex";
import cite from 'citation-js';
import '@citation-js/plugin-bibjson';
import '@citation-js/plugin-bibtex';
import '@citation-js/plugin-csl';
import '@citation-js/plugin-doi';
import '@citation-js/plugin-ris';
import '@citation-js/plugin-wikidata';

const TYPES = {
  BIBTEX: 'bibtex',
  BIBJSON: 'bibjson',
  CSLJSON: 'csljson',
  HTML: 'html',
  MARC: 'marc',
  RDF: 'rdf',
  RIS: 'ris',
  UNKNOWN: 'unknown',
  XML: 'XML'
};

// bibtex parser
const parser = new Bibtex();

/**
 * Transform object representation of bibliography to BibTex format string.
 * @param {Object} data - Bibliography
 * @returns {string} Bibtext
 */
function getBibtexFromObject(data) {
  return "";
}

function getObjectFromBibtex(data) {
  return parser.getBibFromObject(data);
}

/**
 * Infer bibliography encoding from data.
 * @param {object|string} data - Bibliography
 * @returns {object}
 */
function inferFormat(data) {
  return TYPES.UNKNOWN;
}

/**
 * Transform bibliography to a target format.
 * @param {object|string} data - Bibliography
 * @param {string} target - Target format identifier
 * @return {object|string} formatted bibliograph
 */
function transform(data, target) {
  const doc = cite(data);
  return doc.format('data', { format: 'object' });
}


export {
  getBibtexFromObject,
  getObjectFromBibtex,
  inferFormat,
  transform
};
