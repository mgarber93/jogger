import React, { Component } from 'react';
import 'react-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import Nav from 'react-bootstrap/lib/Nav';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import { logout } from '../../redux/modules/auth';
import './Navbar.css';


@connect(({ auth }) => ({ user: auth.user }), { logout })
export default class extends Component {
  static defaultProps = {
  }
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
  }
  render() {
    const { user } = this.props;
    return (
      <Navbar collapseOnSelect style={{ height: '20px', fontSize: '20pt' }}>
        <IndexLinkContainer to="/">
          <Navbar.Header>
            <Navbar.Brand>
              <p style={{ fontSize: '20pt' }}>Jogger</p>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </IndexLinkContainer>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/new">
              <NavItem>New</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            {!!user && (
              <LinkContainer to="/jogs">
                <NavItem>{user.username}</NavItem>
              </LinkContainer>
            )}
            {!!user && (
              <LinkContainer to="/logout">
                <NavItem onClick={this.handleLogout}>
                  Logout
                </NavItem>
              </LinkContainer>
            )}
            {!!user || (
              <LinkContainer to="/login">
                <NavItem>login</NavItem>
              </LinkContainer>
            )}
            {!!user || (
              <LinkContainer to="/register">
                <NavItem>register</NavItem>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
