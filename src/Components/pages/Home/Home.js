import React from 'react';
import { Link } from 'react-router-dom';

import './Home.scss';

class Home extends React.Component {
  render() {
    const boardId = '12345';
    return (
      <div className="Home">
        <h1>Home Page</h1>
        <Link className="btn btn-success" to="/board/new">Create New Board</Link>
        <Link className="btn btn-warning" to={`/board/${boardId}`}>Single Board Page</Link>
      </div>
    );
  }
}

export default Home;
