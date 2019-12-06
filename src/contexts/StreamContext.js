import React, { useReducer, useContext, createContext } from 'react';

import { SERVER_URL, PORT, TRANSACTIONS_API, statusHash } from '../constants';

const StreamStateContext = createContext();
const StreamDispatchContext = createContext();

function sortList (array, sortOrder) {
  let compareFunction;

  if (sortOrder === 'date') {
    compareFunction = (a, b) => new Date(a.fromDate) - new Date(b.fromDate);
  }
  if (sortOrder === 'status') {
    compareFunction = (a, b) => {
      return statusHash[a.status].order - statusHash[b.status].order;
    };
  }
  if (!sortOrder) {
    return array;
  }

  return array.sort(compareFunction);
}

function streamReducer (state, action) {
  switch (action.type) {
    case 'pageIncrement': {
      return { ...state, lastRevealedPage: state.lastRevealedPage + 1 };
    }
    case 'sortOrderChange': {
      const sortOrder = action.payload;

      return { ...state, sortOrder, latestData: sortList([...state.latestData], sortOrder) };
    }
    case 'start update': {
      return { ...state, dataLoading: true };
    }
    case 'fail update': {
      return { ...state, dataLoading: false };
    }
    case 'finish update': {
      return {
        ...state,
        latestData: sortList([...state.latestData, ...action.payload], state.sortOrder),
        dataLoading: false };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function StreamProvider ({ children }) {
  const [state, dispatch] = useReducer(streamReducer, { lastRevealedPage: -1, sortOrder: '', dataLoading: false, latestData: [] });

  return (
    <StreamStateContext.Provider value={state}>
      <StreamDispatchContext.Provider value={dispatch}>
        {children}
      </StreamDispatchContext.Provider>
    </StreamStateContext.Provider>
  );
}

function useStreamState () {
  const context = useContext(StreamStateContext);

  if (typeof context === 'undefined') {
    throw new Error('useStreamState must be used within a StreamProvider');
  }

  return context;
}

function useStreamDispatch () {
  const context = useContext(StreamDispatchContext);

  if (typeof context === 'undefined') {
    throw new Error('useStreamDispatch must be used within a StreamProvider');
  }

  return context;
}

async function getWithPageNumber (dispatch, pageNumber) {
  dispatch({ type: 'start update' });
  try {
    const response = await fetch(`${SERVER_URL}:${PORT}/${TRANSACTIONS_API}/${pageNumber}`);

    if (response.status >= 400 && response.status < 600) {
      console.log('bad response');
      throw new Error('Bad response from server');
    } else {
      console.log('good response');

      const json = await response.json();

      dispatch({ type: 'finish update', payload: json });
      dispatch({ type: 'pageIncrement' });
    }
  } catch (error) {
    console.log('fail response', error);
    dispatch({ type: 'fail update', error });
  }
}

export { StreamProvider, useStreamState, useStreamDispatch, getWithPageNumber };
