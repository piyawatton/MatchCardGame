import React from 'react'

interface Props {
    text: string;
    score: number;
}

const Score = (props: Props) => {
    return (
        <div>
            <div>{props.text}</div>
            <div>{props.score > 0 ? props.score : '-'}</div>
        </div>
    )
}

export { Score }
