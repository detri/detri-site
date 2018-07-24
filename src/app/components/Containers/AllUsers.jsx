import React from 'react';
import UserBox from '../Styling/UserBox.jsx';
import Title from '../Styling/Title.jsx';
import ScrollBox from '../Styling/ScrollBox.jsx';
import { connect } from 'react-redux';
import { tryAllUsers } from '../../ducks/allUsers';

class AllUsers extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.users.length) {
      this.props.tryAllUsers();
    }
  }

  render() {
    return (
      <React.Fragment>
        <Title>users</Title>
        <ScrollBox width={"45%"} height={"calc(100% - 3.32em)"} margin={"2.5%"}>
          {!this.props.users ?
          <p>Loading users...</p>
          : this.props.users.map(user => <UserBox key={user.number} user={user} />)}
        </ScrollBox>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  ...state.allUsers
}), {
  tryAllUsers
})(AllUsers);
