import React, { FunctionComponent } from 'react';
import { Button as BootstrapButton, ButtonProps } from 'reactstrap'

interface Props extends ButtonProps {
    children: React.ReactNode;
}

const Button: FunctionComponent<Props> = (props: Props) => {
    return <BootstrapButton  {...props}>{props.children}</BootstrapButton>
}

export { Button }