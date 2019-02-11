import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

export default class Setlist extends Component {
  render() {
    return (
    <Dropdown>
      <DropdownButton id="dropdown-item-button" variant="" title="Sets">
        {this.props.sets.map(set => <Dropdown.Item key={set.id} as="button">{set.setName}</Dropdown.Item>)}
      </DropdownButton>
    </Dropdown>
    )
  }
}