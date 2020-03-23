import * as userAction from './userProfile'
import * as gameAction from './gameState'
export const actions = {
    userAction: {
        ...userAction,
    },
    gameAction: {
        ...gameAction,
    }
}
