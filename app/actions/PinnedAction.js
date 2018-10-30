// @flow

import { Pinned } from './ActionTypes';
import { pinnedSchema } from 'app/reducers';
import callAPI from 'app/actions/callAPI';
import type { Thunk } from 'app/types';
import { push } from 'react-router-redux';

export function fetchPinned() {
  return callAPI({
    types: Pinned.FETCH,
    endpoint: `/pinned/`,
    method: 'GET',
    meta: {
      errorMessage: 'Henting av festede oppslag feilet'
    },
    schema: [pinnedSchema],
    propagateError: true
  });
}

export function deletePinned(pinnedId: number) {
  return callAPI({
    types: Pinned.DELETE,
    endpoint: `/pinned/${pinnedId}/`,
    method: 'DELETE',
    meta: {
      pinnedId: Number(pinnedId),
      errorMessage: 'Sletting av festet oppslag feilet'
    }
  });
}

export function addPinned(data: {
  title: string,
  source: string,
  description: string,
  authors: Array<number>
}): Thunk<*> {
  return dispatch =>
    dispatch(
      callAPI({
        types: Pinned.CREATE,
        endpoint: '/pinned/',
        method: 'POST',
        body: data,
        schema: pinnedSchema,
        meta: {
          errorMessage: 'Festing av oppslag feilet',
          successMessage: 'Oppslag festet'
        }
      })
    ).then(() => dispatch(push(`/pinned/`)));
}
