import Promise from 'bluebird';
import { REPO } from '../types';

export function addFiles() {}

export function commit() {}

export function getLog() {
  return {
    type: REPO.GET_LOG,
    payload: Promise.resolve()
  }
}

export function pull() {}

export function push() {}
