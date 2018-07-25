import React from 'react';
import Container from '../Styling/Container.jsx';
import UserPage from '../Containers/UserPage.jsx';

const User = ({ match }) => {
    return (
        <Container>
            <UserPage match={match} />
        </Container>
    )
};

export default User;
