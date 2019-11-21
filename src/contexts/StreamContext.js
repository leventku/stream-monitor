import React from 'react';

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
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function StreamProvider({children}) {
    const [state, dispatch] = React.useReducer(streamReducer, {lastRevealedPage: -1, sortOrder: ''})
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

export {StreamProvider, useStreamState, useStreamDispatch}