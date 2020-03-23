import _ from 'lodash'
import * as ls from 'local-storage'
import cookies from 'js-cookie'
import { GLOBAL_BEST_MOVE, MY_BEST_MOVE, CARD_PAIRS, AUTH } from '../../constance/variable'
import { ICard, IGameState, Actions } from '../../redux/reducers/gameState'

export const createNewGame = (pairs: number): ICard[] => {
    var numbers = [];

    for (var i = 1; i <= pairs * 2; i++) {
        numbers.push(i);
    }
    const allCard = numbers.map((i) => {
        return {
            value: (i / 2).toFixed().toString(),
            id: i,
            isFaceUp: false,
            disable: false,
        }
    })
    return _.shuffle(allCard)
}

export const flipCard = (card: ICard): ICard => {
    return {
        ...card,
        isFaceUp: !card.isFaceUp,
    }
}

export const disableCard = (card: ICard): ICard => {
    return {
        ...card,
        disable: true,
    }
}

export const doActionCardById = (cards: ICard[], cardId: number, action: Function) => {
    const cardIndex = cards.findIndex(c => c.id == cardId)
    if (cards[cardIndex]) {
        cards[cardIndex] = action(cards[cardIndex])
    }
    return [...cards]
}

export const handleFaceUpCard = (cards: ICard[], openingCard: ICard[], cardId: number): ICard[] => {
    const selectedCard = cards.find(c => c.id == cardId)
    const selectedOpenCardIndex = openingCard.findIndex(c => c.id == cardId)
    if (selectedCard) {
        if (selectedOpenCardIndex < 0) {
            return [...openingCard, selectedCard]
        }
        return _.dropWhile(openingCard, c => c.id == cardId)
    }
    return [...openingCard]
}

export const checkOpeningCard = (state: IGameState, isMatched: boolean): ICard[] => {
    if (isMatched) {
        return state.cards.map((card) => card.isFaceUp ? disableCard(card) : card)
    }
    return state.cards.map((card) => card.isFaceUp && !card.disable ? flipCard(card) : card)
}

export const getBestMove = (): number => {
    let userScoreList = []
    for (var i = 0, len = localStorage.length; i < len; i++) {
        var key: string = localStorage.key(i) || '';
        var value = localStorage[key];
        if (key.indexOf(MY_BEST_MOVE('')) != -1) {
            userScoreList.push(value)
        }
    }
    if (userScoreList.length == 0) return 0
    return _.min(userScoreList);
}

export const setUpGame = (state: IGameState, actions: Actions): IGameState => {
    const username: string = cookies.get(AUTH) || 'anonymous'
    return {
        ...state,
        counting: 0,
        myBestMove: ls.get(MY_BEST_MOVE(username)) ? ls.get(MY_BEST_MOVE(username)) : 0,
        globalBestMove: getBestMove(),
        cards: createNewGame(CARD_PAIRS),
        openingCard: [],
    }
}

export const endGame = (state: IGameState, actions: Actions): IGameState => {
    const myMove = state.counting
    const username: string = cookies.get(AUTH) || 'anonymous'
    let myBestMove = ls.get(MY_BEST_MOVE(username)) ? ls.get<number>(MY_BEST_MOVE(username)) : 0
    let globalBestMove = getBestMove()
    if (myBestMove > myMove || myBestMove == 0) {
        ls.set<number>(MY_BEST_MOVE(username), myMove)
        myBestMove = myMove
    }
    if (globalBestMove > myMove || globalBestMove == 0) {
        globalBestMove = myMove
    }
    return {
        ...state,
        myBestMove,
        globalBestMove,
        shouldShowScore: true,
    }
}
