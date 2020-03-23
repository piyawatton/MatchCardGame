import cookies from 'js-cookie'
import * as userProfileAction from '../actions/userProfile'
import { AUTH } from '../../constance/variable'
export interface IUserProfile {
    userName: string;
}

export const initialState: IUserProfile = {
    userName: '',
}

type Action = userProfileAction.setUserAction

// REDUCERS
export const userProfileReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case userProfileAction.SET_USER:
            cookies.set(AUTH, action.user)
            return { ...state, userName: action.user }
        case userProfileAction.REMOVE_USER:
            cookies.remove(AUTH)
            return initialState
        default: return state
    }
}
