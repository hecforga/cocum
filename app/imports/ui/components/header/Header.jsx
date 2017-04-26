import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <nav className="teal">
        <div className="nav-wrapper">
          <a href="#" className="brand-logo center">Cocum</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="#">¿Qué es Cocum?</a></li>
          </ul>
    </div>
  </nav>
    );
  }
}
