import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

export default class SetCard extends Component {
selectSet = () => {
  console.log(this.props.set.setName)
}

  render() {
    return (
      <Dropdown.Item as="button" onClick={this.selectSet}>{this.props.set.setName}</Dropdown.Item>
    )
  }
}