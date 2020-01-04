import React from 'react';
import './SingleBoard.scss';
// the function is finding the id correctly, but it's not printing. swing back around on it.
class SingleBoard extends React.Component {
  render() {
    const { boardId } = this.props.match.params.boardId;
    return (
      <div className="SingleBoard">
        <h1>Single Board Page</h1>
        <h2>Current Board Id is {boardId}</h2>
      </div>
    );
  }
}

export default SingleBoard;
