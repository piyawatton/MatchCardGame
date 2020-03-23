import { combineReducers } from 'redux'
import { userProfileReducer } from './userProfile'
import { gameStateReducer } from './gameState'

export const reducers = combineReducers({
    userProfileReducer,
    gameStateReducer,
})
