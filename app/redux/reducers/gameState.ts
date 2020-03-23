import * as gameStateAction from '../actions/gameState'
import * as userAction from '../actions/userProfile'
import {
    createNewGame,
    doActionCardById,
    flipCard,
    handleFaceUpCard,
    checkOpeningCard,
    setUpGame,
    endGame,
} from '../../services/gamestate/gamestate'

export interface ICard {
    value: string;
    id: number;
    isFaceUp: boolean;
    disable: boolean;
}

export interface IGameState {
    cards: ICard[];
    openingCard: ICard[];
    counting: number;
    myBestMove: number;
    globalBestMove: number;
    shouldShowScore: boolean;
}

export const initialState: IGameState = {
    cards: [],
    openingCard: [],
    counting: 0,
    myBestMove: 0,
    globalBestMove: 0,
    shouldShowScore: false,
}

export type Actions = gameStateAction.newGameAction &
    gameStateAction.flipCardAction &
    gameStateAction.checkCardAction &
    gameStateAction.endGameAction &
    gameStateAction.setUpGameAction &
    userAction.removeUserAction

export const gameStateReducer = (state: IGameState = initialState, action: Actions) => {
    switch (action.type) {
        case gameStateAction.FLIP_CARD:
            if (state.openingCard.length < 2) {
                return {
                    ...state,
                    counting: state.counting + 1,
                    cards: doActionCardById(state.cards, action.cardId, flipCard),
                    openingCard: handleFaceUpCard(state.cards, state.openingCard, action.cardId),
                }
            }
            return state
        case gameStateAction.CHECK_CARD:
            return {
                ...state,
                cards: checkOpeningCard(state, action.isMatched),
                openingCard: [],
            }
        case userAction.REMOVE_USER:
        case gameStateAction.NEW_GAME:
        case gameStateAction.SET_UP_GAME:
            return setUpGame(state, action)
        case gameStateAction.END_GAME:
            return endGame(state, action)
        default: return state
    }
}