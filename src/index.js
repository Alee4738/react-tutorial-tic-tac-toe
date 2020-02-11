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
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
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
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          nextPlayer: 'X',
        },
      ],
      currentMoveIndex: 0,
    };
  }

  calculateWinner(squares) {
    // 0,1,2
    // 3,4,5
    // 6,7,8
    const winningIndices = [
      // horizontal
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      // vertical
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      // diagonal
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let indexLine of winningIndices) {
      const line = indexLine.map(index => squares[index]);
      if (line.every(value => value !== null && value === line[0])) {
        return line[0];
      }
    }
    return null;
  }

  handleClick(i) {
    const history = this.state.history;
    const currentBoardState = history[this.state.currentMoveIndex];
    const squares = currentBoardState.squares.slice();

    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = currentBoardState.nextPlayer;
    const newBoardState = {
      squares: squares,
      nextPlayer: currentBoardState.nextPlayer === 'X' ? 'O' : 'X',
    };
    const nextMoveIndex = this.state.currentMoveIndex + 1;
    this.setState({
      history: history.slice(0, nextMoveIndex).concat([newBoardState]),
      currentMoveIndex: nextMoveIndex,
    });
  }

  jumpTo(moveIndex) {
    this.setState({
      currentMoveIndex: moveIndex,
    });
  }

  render() {
    console.log(this.state);

    const history = this.state.history;
    const current = history[this.state.currentMoveIndex];
    const squares = current.squares.slice();
    const winner = this.calculateWinner(squares);
    const status = winner
      ? `Winner: ${winner}`
      : `Next player: ${current.nextPlayer}`;

    const moves = history.map((_, moveIndex) => {
      const desc = moveIndex ? `Go to move #${moveIndex}` : 'Go to game start';

      return (
        <li key={moveIndex}>
          <button onClick={() => this.jumpTo(moveIndex)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
