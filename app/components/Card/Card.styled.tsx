import styled from 'styled-components';

export const StyledCard = styled.div`
    border-radius: 5px;
    width: 150px;
    height: 200px;
    font-size: 85px;
    text-align: center;
    margin: 15px 0;
`;

export const FaceUpCard = styled(StyledCard)`
    background: #eee;
    color: #123;
`;

export const FaceDownCard = styled(StyledCard)`
    background: #123;
    color: #eee;
`;
