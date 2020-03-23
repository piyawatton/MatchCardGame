import * as userProfileReducer from './reducers/userProfile'
import * as gameStateReducer from './reducers/gameState'
export interface ApplicationState {
    userProfileReducer: userProfileReducer.IUserProfile;
    gameStateReducer: gameStateReducer.IGameState;
}

export const defaultInitialState: ApplicationState = {
    userProfileReducer: userProfileReducer.initialState,
    gameStateReducer: gameStateReducer.initialState,
}
