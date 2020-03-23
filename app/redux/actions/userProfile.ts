import { Dispatch } from 'redux'


export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'

export interface setUserAction {
    type: string;
    user: string;
}

export const setUser = (user: string) => (dispatch: Dispatch): setUserAction => {
    return dispatch({
        type: SET_USER,
        user,
    })
}

export interface removeUserAction {
    type: string;
}

export const removeUser = () => (dispatch: Dispatch) => {
    return dispatch({
        type: REMOVE_USER,
    })
}
