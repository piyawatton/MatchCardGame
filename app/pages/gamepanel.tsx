import * as React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Modal } from 'reactstrap'
import { Dispatch, ActionCreator, Action } from 'redux'
import { withRouter } from 'next/router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { WithRouterProps } from 'next/dist/client/with-router'
import cookies from 'js-cookie'
import { AUTH } from '../constance/variable'
import { Card } from '../components/Card/Card'
import { Button } from '../components/Button/Button'
import { Score } from '../components/Score/Score'
import { actions, bindActionCreators } from '../redux/store'
import { ICard } from '../redux/reducers/gameState'
import { ApplicationState } from '../redux/store.d'
import { CARD_PAIRS } from '../constance/variable'
import './gamepanel.scss'

interface DispatchProps {
    setUser: ActionCreator<{}>
    removeUser: ActionCreator<{}>
    newGame: ActionCreator<{}>
    checkCard: ActionCreator<{}>
    endGame: ActionCreator<{}>
    setUpGame: ActionCreator<{}>
}

interface StateProps {
    cards: ICard[]
    openingCards: ICard[]
    counting: number;
    myBestCounting: number;
    globlaBestCounting: number;
    username: string;
}

type Props = StateProps & DispatchProps & WithRouterProps

const AppComponent = (props: Props) => {

    const [modal, setModal] = React.useState(false)

    const doNewGame = () => {
        setModal(false)
        props.newGame(CARD_PAIRS)
    }

    const doLogout = () => {
        props.removeUser()
        props.router.push('/')
    }

    const scoreBoard = (): JSX.Element => {
        return (
            <React.Fragment>
                <Score text={'My move'} score={props.counting} />
                <Score text={'My best move'} score={props.myBestCounting} />
                <Score text={'Global best move'} score={props.globlaBestCounting} />
            </React.Fragment>
        )
    }

    const buttonMenu = (): JSX.Element => {
        return (
            <React.Fragment>
                <Button color="success" className="GamePanel__Button GamePanel__Button--newgame" onClick={doNewGame}>New Game</Button>
                <Button className="GamePanel__Button  GamePanel__Button--logout" onClick={doLogout}>Log out</Button>
            </React.Fragment>
        )
    }

    const renderModal = (): JSX.Element => {
        return (
            <Modal className="GamePanel__ScoreSummary" isOpen={modal}>
                {scoreBoard()}
                {buttonMenu()}
            </Modal>
        )
    }

    React.useEffect(() => {
        props.setUpGame()
        if (cookies.get(AUTH)) {
            props.setUser(cookies.get(AUTH))
        }
    }, [])

    React.useEffect(() => {
        if (props.openingCards.length == 2) {
            const isMatched = props.openingCards.every(card =>
                card.value == props.openingCards[0].value)
            setTimeout(() => {
                props.checkCard(isMatched)
            }, 1000)
        }
        if (props.cards.length > 0 && props.cards.every(card => card.disable && card.isFaceUp)) {
            props.endGame()
            setModal(true)
        }
    }, [props.openingCards])
    return (
        <Container className="GamePanel">
            <Row>
                <Col className="GamePanel__Menu" md={2} sm={12}>
                    <h4>
                        Hello {props.username}
                    </h4>
                    {scoreBoard()}
                    {buttonMenu()}
                </Col>
                <Col md={10} sm={12}>
                    <Row>
                        {props.cards.map((card, i) => <Card key={i} cardIndex={i} {...card} />)}
                    </Row>
                </Col>
            </Row>
            {renderModal()}
        </Container>
    )
};

const mapStateToProps = (state: ApplicationState): StateProps => {
    return {
        cards: state.gameStateReducer.cards,
        openingCards: state.gameStateReducer.openingCard,
        counting: state.gameStateReducer.counting,
        myBestCounting: state.gameStateReducer.myBestMove,
        globlaBestCounting: state.gameStateReducer.globalBestMove,
        username: state.userProfileReducer.userName,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        setUser: bindActionCreators(actions.userAction.setUser, dispatch),
        removeUser: bindActionCreators(actions.userAction.removeUser, dispatch),
        newGame: bindActionCreators(actions.gameAction.newGame, dispatch),
        checkCard: bindActionCreators(actions.gameAction.checkCard, dispatch),
        endGame: bindActionCreators(actions.gameAction.endGame, dispatch),
        setUpGame: bindActionCreators(actions.gameAction.setUpGame, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppComponent));