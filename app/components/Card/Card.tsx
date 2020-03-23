import React from 'react'
import { connect } from 'react-redux'
import { Col } from 'reactstrap'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { ICard } from '../../redux/reducers/gameState'
import { Dispatch, ActionCreator } from 'redux'
import { actions, bindActionCreators } from '../../redux/store'
import './index.scss'
import { ApplicationState } from '../../redux/store.d'

interface DispatchProps {
    flipCard: ActionCreator<{}>
}

interface StateProps {
    openingCard: ICard[]
}

interface OwnProps {
    cardIndex: number
}

type Props = ICard & DispatchProps & OwnProps & StateProps

const CardComponent = (props: Props) => {
    const { isFaceUp, flipCard, disable } = props
    const stateCard = isFaceUp ? 'FaceUp' : 'FaceDown'
    const handleFlipCard = () => {
        const selectOpeningCard = props.openingCard.some(card => card.id == props.id)
        !disable && flipCard(props.id)
    }
    let dots = []
    const dot = <div className="Card__Dot"/>
    for (let i = 0; i < parseInt(props.value); i++) {
        dots.push(dot)
    }
    return (
        <Col md={3} sm={4} xs={4}>
            <CSSTransition
                in={true}
                key={props.id}
                timeout={300}
                classNames={`Card Card${stateCard}`}
            >
                <div className={`Card Card${stateCard}`} onClick={handleFlipCard}>
                    <div className="Card__Value">
                        {isFaceUp && props.value}
                    </div>
                    <div>
                        {dots.map(dot => dot)}
                    </div>
                </div>
            </CSSTransition>
        </Col>
    )
}

const mapStateToProps = (state: ApplicationState): StateProps => {
    return {
        openingCard: state.gameStateReducer.openingCard,
    }
}

const dispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        flipCard: bindActionCreators(actions.gameAction.filpCard, dispatch),
    }
}
const Card = connect(mapStateToProps, dispatchToProps)(CardComponent)
export { Card }