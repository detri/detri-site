import React from 'react';
import styled from 'styled-components';

const UserInfoText = styled.p`
  text-align: center;
  line-height: 1em;
`;

const UserInfo = styled.div`
  height: 5em;
  padding-top: 10px;
  font-size: 1em;
  display: inline-block;
  vertical-align: top;
`;

const UserBox = ({ user, className }) => {
  return (
    <div className={className}>
      <UserInfo>
        <UserInfoText><strong>{user.username}</strong></UserInfoText>
        <UserInfoText style={{paddingLeft: '10px'}}>user number: {user.number}</UserInfoText>
      </UserInfo>
    </div>
  );
};

export default styled(UserBox)`
  width: 7.5em;
  margin: 0.5em;
  text-shadow: 1px 1px 2px ${props => props.theme.primary};
  background-color: ${props => props.theme.secondary};
  border-radius: 5px;
`;
