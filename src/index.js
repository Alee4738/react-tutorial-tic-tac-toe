import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextPlayer: 'X',
      squares: Array(9).fill(null),
    };
  }

  getWinner() {
    // 0,1,2
    // 3,4,5
    // 6,7,8
    const winningIndices = [
      [0, 1, 2],
      [0, 4, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8],
    ];

    for (let indexLine of winningIndices) {
      const line = indexLine.map(index => this.state.squares[index]);
      if (line.every(value => value !== null && value === line[0])) {
        return line[0];
      }
    }
    return null;
  }

  handleClick(i) {
    if (this.state.squares[i] === null) {
      const squares = this.state.squares.slice();
      squares[i] = this.state.nextPlayer;
      this.setState({
        nextPlayer: this.state.nextPlayer === 'X' ? 'O' : 'X',
        squares: squares,
      });
    }
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    let winner = this.getWinner();
    let status;
    if (winner === null) {
      status = `Next player: ${this.state.nextPlayer}`;
    } else {
      status = `Winner: ${winner}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
