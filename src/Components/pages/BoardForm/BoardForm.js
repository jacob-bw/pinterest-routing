import React from 'react';
import './BoardForm.scss';
import authData from '../../../helpers/data/authData';
import boardData from '../../../helpers/data/boardData';

class BoardForm extends React.Component {
  state = {
    boardName: '',
    boardDescription: '',
  }

  componentDidMount() {
    const { boardId } = this.props.match.params;
    if (boardId) {
      boardData.getSingleBoard(boardId)
        .then((response) => {
          this.setState({ boardName: response.data.name, boardDescription: response.data.description });
        })
        .catch((err) => console.error('error from getboard', err));
    }
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ boardName: e.target.value });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ boardDescription: e.target.value });
  }

  editBoardEvent = (e) => {
    e.preventDefault();
    const { boardId } = this.props.match.params;
    const editBoard = {
      name: this.state.boardName,
      description: this.state.boardDescription,
      uid: authData.getUid(),
    };
    boardData.updateBoard(boardId, editBoard)
      .then(() => this.props.history.push('/'))
      .catch((error) => console.error('error from edit board', error));
  }

  saveBoardEvent = (e) => {
    e.preventDefault();
    const newBoard = {
      name: this.state.boardName,
      description: this.state.boardDescription,
      uid: authData.getUid(),
    };
    boardData.saveBoard(newBoard)
      .then(() => this.props.history.push('/'))
      .catch((error) => console.error('error from save board', error));
  }

  render() {
    const { boardName, boardDescription } = this.state;
    const { boardId } = this.props.match.params;
    return (
      <form className="BoardForm">
        <div className="form-group">
        <label htmlFor="board-name">Board Name</label>
        <input
        type="text"
        className="form-control"
        id="board-name"
        placeholder="Enter Board Name"
        value={boardName}
        onChange={this.nameChange}
        />
        </div>
        <div className="form-group">
          <label htmlFor="board-description">Board Description</label>
          <input
          type="text"
          className="form-control"
          id="board-description"
          placeholder="Enter Board Description"
          value={boardDescription}
          onChange={this.descriptionChange}
          />
        </div>
        { boardId
          ? <button className="btn btn-success" onClick={this.editBoardEvent}>Save Changes</button>
          : <button className="btn btn-success" onClick={this.saveBoardEvent}>Save Board</button>
        }
        </form>
    );
  }
}

export default BoardForm;
