import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

export default class SetCard extends Component {
selectSet = () => {
  this.props.setChosenSetToState(this.props.set)
}

  render() {
    return (
      <Dropdown.Item as="button" onClick={this.selectSet}>{this.props.set.setName}</Dropdown.Item>
    )
  }
}