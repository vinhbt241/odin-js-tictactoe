const gameController = (() => {
  const cells = document.querySelectorAll('.cell');
  const board = document.querySelector(".board");
  const popUp = document.querySelector(".pop-up");
  const message = document.querySelector("#message")
  const resetButton = document.querySelector("#reset");
  let currentTurn;

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
    popUp.classList.remove("show");

    cells.forEach(cell => {
      cell.classList.remove("x-mark");
      cell.classList.remove("o-mark");
      cell.addEventListener('click', event => { handleClick(event) }, { once: true });
    })

    currentTurn = "x-turn";
    board.classList.add(currentTurn);

    resetButton.addEventListener('click', startGame);
  }

  const handleClick = (e) => {
    const cell = e.target;
    const currentMark = (currentTurn == "x-turn") ? "x-mark" : "o-mark";
    placeMark(cell, currentMark);

    if(checkWin(currentMark)) {
      endGame(false);
    } else if(isDraw()) {
      endGame(true);
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

  const endGame = (draw) => {
    if(draw) {
      message.innerText = "Draw!";
    } else {
      message.innerText = `${currentTurn == "x-turn" ? "X" : "O"} win!`;
    }

    popUp.classList.add("show");
  }

  return{ startGame };
})();

gameController.startGame();
