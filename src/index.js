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
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = current.nextPlayer;
    const newBoardState = {
      squares: newSquares,
      nextPlayer: current.nextPlayer === 'X' ? 'O' : 'X',
    };
    this.setState({
      history: history.concat([newBoardState]),
    });
  }

  jumpTo(moveNumber) {
    const history = this.state.history;
    const newHistory = history.slice(0, moveNumber + 1);
    this.setState({
      history: newHistory,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = this.calculateWinner(squares);
    const status = winner
      ? `Winner: ${winner}`
      : `Next player: ${current.nextPlayer}`;

    console.log(history);

    const moves = history.map((boardState, moveNumber) => {
      const desc = moveNumber
        ? `Go to move #${moveNumber}`
        : 'Go to game start';

      return (
        <li key={moveNumber}>
          <button onClick={() => this.jumpTo(moveNumber)}>{desc}</button>
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
