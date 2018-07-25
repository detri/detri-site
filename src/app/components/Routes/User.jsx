import React from 'react';
import Container from '../Styling/Container.jsx';

const User = ({ match }) => {
    return (
        <Container>
            <UserPage user={match} />
        </Container>
    )
};

export default User;
