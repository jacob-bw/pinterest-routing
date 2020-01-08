import React from 'react';
import './SingleBoard.scss';
import boardData from '../../../helpers/data/boardData';
import pinData from '../../../helpers/data/pinData';

import Pin from '../../shared/Pin/Pin';

class SingleBoard extends React.Component {
  state = {
    board: {},
    pins: [],
  }

  getPinData = (boardId) => {
    pinData.getPinsByBoardId(boardId)
      .then((pins) => this.setState({ pins }))
      .catch((error) => console.error('error from getpindata', error));
  }

  componentDidMount() {
    const { boardId } = this.props.match.params;
    boardData.getSingleBoard(boardId)
      .then((response) => {
        this.setState({ board: response.data });
        this.getPinData(boardId);
      })
      .catch((error) => console.error('error from getSingleBoard', error));
  }

  deletePin = (pinId) => {
    const { boardId } = this.props.match.params;
    pinData.deletePin(pinId)
      .then(() => this.getPinData(boardId))
      .catch((error) => console.error(error));
  }

  render() {
    const { boardId } = this.props.match.params;
    return (
      <div className="SingleBoard">
        <h1>Single Board Page</h1>
        <h2>Current Board Id is {boardId}</h2>
        <div className="pins d-flex flex-wrap">
          { this.state.pins.map((pin) => <Pin key={pin.id} pin={pin} deletePin={this.deletePin}/>)}
        </div>
      </div>
    );
  }
}

export default SingleBoard;
