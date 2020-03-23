import { Dispatch } from 'redux'


export const NEW_GAME = 'NEW_GAME'
export const END_GAME = 'END_GAME'
export const FLIP_CARD = 'FLIP_CARD'
export const CHECK_CARD = 'CHECK_CARD'
export const SET_UP_GAME = 'SET_UP_GAME'

export interface newGameAction {
    type: string;
    pairs: number;
}

export const newGame = (pairs: number) => (dispatch: Dispatch): newGameAction => {
    return dispatch({
        pairs,
        type: NEW_GAME,
    })
}

export interface flipCardAction {
    type: string;
    cardId: number;
}

export const filpCard = (cardId: number) => (dispatch: Dispatch): flipCardAction => {
    return dispatch({
        cardId,
        type: FLIP_CARD,
    })
}

export interface checkCardAction {
    type: string;
    isMatched: boolean;
}

export const checkCard = (isMatched: boolean) => (dispatch: Dispatch): checkCardAction => {
    return dispatch({
        isMatched,
        type: CHECK_CARD,
    })
}

export interface endGameAction {
    type: string;
}

export const endGame = () => (dispatch: Dispatch): endGameAction => {
    return dispatch({
        type: END_GAME,
    })
}

export interface setUpGameAction {
    type: string;
}

export const setUpGame = () => (dispatch: Dispatch): setUpGameAction => {
    return dispatch({
        type: SET_UP_GAME,
    })
}
