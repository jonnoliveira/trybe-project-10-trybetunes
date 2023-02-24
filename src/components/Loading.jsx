import React, { Component } from 'react';
import '../css/Loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}
