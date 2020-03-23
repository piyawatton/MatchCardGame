import * as React from 'react'
import { Store, AnyAction } from 'redux'
import { Provider, connect } from 'react-redux'
import { withRouter } from 'next/router'
import { WithRouterProps } from 'next/dist/client/with-router';
import withRedux from 'next-redux-wrapper'
import Head from 'next/head'
import cookies from 'js-cookie'
import App, { Container, AppProps } from 'next/app'
import { NextComponentType } from 'next'
import { makeStore } from '../redux/store'
import { ApplicationState } from '../redux/store.d'
import { AUTH } from '../constance/variable'
import '../stylesheet/bootstrap.min.css'
import './index.scss'

interface OwnProps {
    Component: NextComponentType;
    store: Store<ApplicationState, AnyAction>;
}

type Props = OwnProps & WithRouterProps & AppProps

const AppComponent = (props: Props) => {
    const { Component, pageProps, store } = props;

    React.useEffect(() => {
        if (!cookies.get(AUTH)) {
            props.router.push('/')
        }
    }, [])

    return (
        <Provider store={store}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Next.js TypeScript Quickstart</title>
            </Head>
            <Component {...pageProps} />
        </Provider>
    )
};

interface pageParams {
    Component: NextComponentType;
    ctx: any;
}

AppComponent.getInitialProps = async (pageParams: pageParams) => {
    const { Component, ctx } = pageParams

    return {
        pageProps: {
            // Call page-level getInitialProps
            ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        }
    }
}


export default withRedux(makeStore)(withRouter(AppComponent));