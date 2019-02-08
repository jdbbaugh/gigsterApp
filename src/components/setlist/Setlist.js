import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

export default class Setlist extends Component {
  render() {
    return (
    <Dropdown>
      <DropdownButton id="dropdown-item-button" variant="" title="Sets">
        <Dropdown.Item as="button">Action</Dropdown.Item>
        <Dropdown.Item as="button">Another action</Dropdown.Item>
        <Dropdown.Item as="button">Something else</Dropdown.Item>
      </DropdownButton>
    </Dropdown>
    )
  }
}