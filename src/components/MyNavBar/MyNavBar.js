import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import './MyNavBar.scss';
import boozeSmall from './images/booze_small.png';

class MyNavbar extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool,
    logoutClickEvent: PropTypes.func,
  }

  state = {
    isOpen: false,
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { isAuthed, logoutClickEvent } = this.props;
    const buildNavbar = () => {
      if (isAuthed) {
        return (
          <Navbar color="black" dark expand="md">
            <NavbarBrand href="/"><img src={boozeSmall} alt="small_logo" /></NavbarBrand>
            <NavbarToggler onClick={e => this.toggle(e)} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                <NavItem>
                  <NavLink tag={RRNavLink} to='/clues'>
                    <i className="fas fa-glass-whiskey fa-3x"></i>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to='/clues/new'>
                    <i className="fas fa-search-plus fa-3x"></i>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to='/collections'>
                    <i className="fas fa-trophy fa-3x"></i>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to='/locations'>
                    <i className="fas fa-globe-americas fa-3x"></i>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={logoutClickEvent}>
                    <i className="fas fa-sign-out-alt fa-3x"></i>
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        );
      }
      return <div></div>;
    };

    return (
      <div className="my-navbar">
        {/* <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/"><img src={boozeSmall} alt="small_logo" /></NavbarBrand>
          <NavbarToggler onClick={e => this.toggle(e)} />
          <Collapse isOpen={this.state.isOpen} navbar> */}
        {buildNavbar()}
        {/* </Collapse>
        </Navbar> */}
      </div>
    );
  }
}

export default MyNavbar;
