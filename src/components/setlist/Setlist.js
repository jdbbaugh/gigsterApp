import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import SetCard from "./SetCard"

export default class Setlist extends Component {
  render() {
    return (
    <Dropdown>
      <DropdownButton id="dropdown-item-button" variant="" title="Choose SetList">
        {this.props.sets.map(set => <SetCard key={set.id} set={set} setChosenSetToState={this.props.setChosenSetToState} />)}
      </DropdownButton>
    </Dropdown>
    )
  }
}