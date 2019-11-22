import React from 'react';

import {SERVER_URL, PORT, TRANSACTIONS_API} from '../constants'

const StreamStateContext = React.createContext();
const StreamDispatchContext = React.createContext();

function streamReducer(state, action) {
    switch (action.type) {
        case 'pageIncrement': {
            return {...state, lastRevealedPage: state.lastRevealedPage + 1}
        }
        case 'sortOrderChange': {
            return {...state, sortOrder: action.payload}
        }
        case 'start update': {
            return {...state, dataLoading: true }
        }
        case 'fail update': {
            return {...state, dataLoading: false }
        }
        case 'finish update': {
            return {...state, latestData: [...state.latestData, ...action.payload], dataLoading: false}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function StreamProvider({children}) {
    const [state, dispatch] = React.useReducer(streamReducer, {lastRevealedPage: -1, sortOrder: '', dataLoading: false, latestData: []})
    return (
        <StreamStateContext.Provider value={state}>
            <StreamDispatchContext.Provider value={dispatch}>
                {children}
            </StreamDispatchContext.Provider>
        </StreamStateContext.Provider>
    )
}

function useStreamState() {
    const context = React.useContext(StreamStateContext)
    if (context === undefined) {
        throw new Error('useStreamState must be used within a StreamProvider')
    }
    return context
}

function useStreamDispatch() {
    const context = React.useContext(StreamDispatchContext)
    if (context === undefined) {
        throw new Error('useStreamDispatch must be used within a StreamProvider')
    }
    return context
}

async function getWithPageNumber(dispatch, pageNumber) {
	dispatch({type: 'start update'})
    try {
        const response = await fetch(`${SERVER_URL}:${PORT}/${TRANSACTIONS_API}/${pageNumber}`);
        const status = await response.status
        // return response.status === 200 && json;
        if (response.status >= 400 && response.status < 600) {
            // Promise.reject(`${response.status} - ${response.statusText}`)
            console.log('bad response')
            throw new Error("Bad response from server");
        }
        else {
            console.log('good response')
            const json = await response.json()
            dispatch({type: 'finish update', payload: json})
            dispatch({type: 'pageIncrement'})
            // return json
        }
    } catch(error) {
        console.log('fail response')
        dispatch({type: 'fail update', error})
        // console.warn(error)
        return Promise.reject(error)
    }
}

// async function getWithPageNumber(dispatch, pageNumber) {
//     dispatch({type: 'start update'})
//     return await fetch(`${SERVER_URL}:${PORT}/${API}/${pageNumber}`)
//         .then((response) => {
//             if (response.status >= 400 && response.status < 600) {
//                 throw new Error("Bad response from server");
//             }
//             return response.json()
//         })
//         .then((returnedResponse) => {
//             dispatch({type: 'finish update', payload: returnedResponse})
//             // return returnedResponse
//         })
//         .catch((error) => {
//             console.warn(error)
//             dispatch({type: 'fail update', error})
//             return Promise.reject(error)
//         })
// }

export {StreamProvider, useStreamState, useStreamDispatch, getWithPageNumber}