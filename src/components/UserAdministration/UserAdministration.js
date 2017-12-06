import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from '../../redux/modules/managable';

@connect(({auth})=>({user: auth.user}), { fetchUsers })
class UserAdministration extends Component {
  componentWillMount() {
    if (this.props.user && this.props.user.role !== 'REGULAR') {
      this.props.fetchUsers();
    }
  }
  render() {
    return (
      <div>TEST</div>
    )
  }
}

export default UserAdministration;