import * as React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Input } from 'reactstrap'
import { Dispatch, ActionCreator } from 'redux'
import { withRouter } from 'next/router'
import { WithRouterProps } from 'next/dist/client/with-router'
import { actions, bindActionCreators } from '../redux/store'
import { Button } from '../components/Button/Button'

interface DispatchProps {
    setUser: ActionCreator<{}>;
}

type Props = DispatchProps & WithRouterProps

interface userBestMove {
    username: string;
    move: number;
}

const AppComponent = (props: Props) => {

    const [user, setUser] = React.useState('')
    const [userBestMoveList, setUserBestMoveList] = React.useState<userBestMove[]>([])

    const doLogin = (user: string) => {
        props.setUser(user.trim())
        props.router.push('/gamepanel')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value)
    }

    const handleClick = (e: React.MouseEvent<Element>) => {
        user.trim() != '' && doLogin(user)
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter' && user.trim() != '') {
            doLogin(user)
        }
    }

    return (
        <Container className="Login">
            <Row>
                <Col md={{ size: 6, offset: 3 }} sm={12}>
                    <div>
                        <h2>Match card game</h2>
                        <p>
                            Flip the card one by one matching pairs card.
                            Try to flip card as less as posible.
                            Have fun!
                        </p>
                    </div>
                    <div>Enter your name</div>
                    <Row className="Login__Form">
                        <Col md={10} sm={8} xs={8}>
                            <Input className="Login__UserName"
                                value={user}
                                onChange={handleChange} onKeyPress={handleKeyPress} />
                        </Col>
                        <Col md={2} sm={4} xs={4}>
                            <Button color="info" onClick={handleClick} >Login</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setUser: bindActionCreators(actions.userAction.setUser, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(withRouter(AppComponent));