const gameController = (() => {
  const cells = document.querySelectorAll('.cell');
  const board = document.querySelector(".board");
  let currentTurn = "x-turn";
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const startGame = () => {
    cells.forEach(cell => {
      cell.addEventListener('click', event => { handleClick(event) }, { once: true });
    })

    board.classList.add(currentTurn)
  }

  const handleClick = (e) => {
    const cell = e.target;
    const currentMark = (currentTurn == "x-turn") ? "x-mark" : "o-mark";
    placeMark(cell, currentMark);

    if(checkWin(currentMark)) {
      //End game with current mark win
      console.log("somebody won!");
    } else if(isDraw()) {
      //End game with draw
      console.log("DRAW");
    } else {
      switchTurn();
    }
  }

  const placeMark = (cell, currentMark) => {
    cell.classList.add(currentMark);
  }

  const switchTurn = () => {
    if(currentTurn == "x-turn") {
      board.classList.remove("x-turn");      
      currentTurn = "o-turn";
    } else {
      board.classList.remove("o-turn");
      currentTurn = "x-turn";
    }

    board.classList.add(currentTurn);
  }

  const checkWin = (currentMark) => {
    return winConditions.some(condition => {
      return condition.every(index => {
        return cells[index].classList.contains(currentMark);
      })
    })
  }

  const isDraw = () => {
    for(let i = 0; i < cells.length; i++) {
      if(!(cells[i].classList.contains("x-mark") || cells[i].classList.contains("o-mark"))) {
        return false
      }
    }
    return true;
  }

  return{ startGame };
})();

gameController.startGame();
