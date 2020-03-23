import { createStore, applyMiddleware, bindActionCreators } from 'redux'
import thunkMiddleware from 'redux-thunk'
import getConfig from 'next/config'
import { MakeStore } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducers } from './reducers'
import { actions } from './actions'
import { ApplicationState, defaultInitialState } from './store.d'


const { publicRuntimeConfig } = getConfig()
const { nodeEnv } = publicRuntimeConfig

let middleWare = [
    thunkMiddleware,
]
if (nodeEnv.trim() != 'production') {
    middleWare = [
        ...middleWare,
    ]
}

const makeStore: MakeStore = (initialState: ApplicationState = defaultInitialState) =>
    createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(
            ...middleWare,
        ))
    )

export {
    bindActionCreators,
    makeStore,
    actions,
}
