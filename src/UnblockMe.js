import React, { useState } from "react";
import "./UnblockMe.scss";
import Draggable from "react-draggable";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ReplayIcon from "@material-ui/icons/Replay";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import FirstLevel from "./Levels/FirstLevel.js";
import SecondLevel from "./Levels/SecondLevel.js";
import ThirdLevel from "./Levels/ThirdLevel.js";
import FourthLevel from "./Levels/FourthLevel.js";
import FifthLevel from "./Levels/FifthLevel.js";
let minMoves;

function UnblockMe() {
  const [moveCounter, setMoveCounter] = useState(0);
  const [solverMoves, setSolverMoves] = useState(0);
  const [puzzleCounter, setPuzzleCounter] = useState(1);
  const [bounds, setBounds] = useState({});
  const [completed, setCompleted] = useState(false);
  const [activated, setActivated] = useState(false);
  const [finished, setFinished] = useState(false);
  const [blockCords, setBlockCords] = useState(FirstLevel);
  function handleStart(event, data) {
    event.preventDefault();
    event.stopPropagation();
    console.log(data.x);
    console.log(data.y);
    let lessThan = [];
    let moreThan = [];
    let upMore = [];
    let downMore = [];
    let leftBounds;
    let rightBounds;
    let upBounds;
    let downBounds;

    blockCords.map((item) => {
      if (event.target.classList.contains("horizontal")) {
        if (item.direction === "vertical") {
          if (data.y === item.y1 || data.y + 75 === item.y3) {
            if (item.x1 < data.x) {
              lessThan.push(item.x1 + 75);
              leftBounds = Math.max.apply(Math, lessThan);
              upBounds = data.y;
              downBounds = data.y;
              return leftBounds;
            } else if (item.x1 > data.x) {
              moreThan.push(item.x1 - 150);
              rightBounds = Math.min.apply(Math, moreThan);
              upBounds = data.y;
              downBounds = data.y;
              return rightBounds;
            }
          }
        } else if (item.direction === "horizontal") {
          if (data.y === item.y1) {
            if (item.x1 < data.x) {
              lessThan.push(item.x1 + 150);
              leftBounds = Math.max.apply(Math, lessThan);
              upBounds = data.y;
              downBounds = data.y;
              return leftBounds;
            } else if (item.x1 > data.x) {
              moreThan.push(item.x1 - 150);
              rightBounds = Math.min.apply(Math, moreThan);
              upBounds = data.y;
              downBounds = data.y;
              return rightBounds;
            }
          }
        }
        if (lessThan.length === 0 && leftBounds === undefined) {
          leftBounds = 0;
        }
        if (moreThan.length === 0 && rightBounds === undefined) {
          rightBounds = 225;
        }
        if (upMore.length === 0 && upBounds === undefined) {
          upBounds = data.y;
        }
        if (downMore.length === 0 && downBounds === undefined) {
          downBounds = data.y;
        }
      } else if (event.target.classList.contains("vertical")) {
        if (item.direction === "vertical") {
          if (data.x === item.x1) {
            if (item.y1 < data.y) {
              upMore.push(item.y1 + 150);
              upBounds = Math.max.apply(Math, upMore);
              rightBounds = data.x;
              leftBounds = data.x;
              return upBounds;
            } else if (item.y1 > data.y) {
              downMore.push(item.y1 - 150);
              downBounds = Math.min.apply(Math, downMore);
              rightBounds = data.x;
              leftBounds = data.x;
              return downBounds;
            }
          }
        } else if (item.direction === "horizontal") {
          if (data.x === item.x1 || data.x + 75 === item.x2) {
            if (item.y1 < data.y) {
              upMore.push(item.y1 + 75);
              upBounds = Math.max.apply(Math, upMore);
              rightBounds = data.x;
              leftBounds = data.x;
              return upBounds;
            } else if (item.y1 > data.y) {
              console.log("yay");
              downMore.push(item.y1 - 150);
              downBounds = Math.min.apply(Math, downMore);
              rightBounds = data.x;
              leftBounds = data.x;
              return downBounds;
            }
          }
        }
      }
      if (lessThan.length === 0 && leftBounds === undefined) {
        leftBounds = data.x;
      }
      if (moreThan.length === 0 && rightBounds === undefined) {
        rightBounds = data.x;
      }
      if (upMore.length === 0 && upBounds === undefined) {
        upBounds = 0;
      }
      if (downMore.length === 0 && downBounds === undefined) {
        downBounds = 225;
      }
    });

    setBounds({
      left: leftBounds,
      right: rightBounds,
      top: upBounds,
      bottom: downBounds,
    });
  }

  function handleStop(event, position) {
    setMoveCounter(moveCounter + 1);
  }

  function handleDrag(event, position) {
    event.preventDefault();
    event.stopPropagation();
    console.log(position.x);
    console.log(position.y);
    const id = event.target.id;

    const { x, y } = position;
    if (id == 1 && position.x === 225) {
      setCompleted(true);
    }
    const updatedList = blockCords.map((item) => {
      if (item.id == id) {
        console.log(id);
        if (item.direction === "vertical") {
          return {
            ...item,
            x1: x,

            y1: y,
            get y3() {
              return this.y1 + 150;
            },
          };
        } else if (item.direction === "horizontal") {
          return {
            ...item,
            x1: x,
            get x2() {
              return this.x1 + 150;
            },
            y1: y,
          };
        }
      }
      return item;
    });

    setBlockCords(updatedList);
    return false;
  }
  function canMove(block, orientation, direction, cb) {
    //check to see if it is out the grid for horizontals
    let moveable;
    if (
      orientation === "horizontal" &&
      block.x1 === 0 &&
      direction === "left"
    ) {
      return false;
    }
    if (
      orientation === "horizontal" &&
      block.x1 === 225 &&
      direction === "right"
    ) {
      return false;
    }
    //check to see if it is out the grid for verticals
    if (orientation === "vertical" && block.y1 === 0 && direction === "up") {
      return false;
    }
    if (
      orientation === "vertical" &&
      block.y1 === 225 &&
      direction === "down"
    ) {
      return false;
    }

    if (orientation === "horizontal" && direction === "right") {
      moveable = cb.map((blockItem) => {
        if (block.id === blockItem.id) {
          //skip over the same item
          //console.log("same Item");
        } else if (
          (block.y1 + 75 === blockItem.y3 && block.x2 === blockItem.x1) ||
          (block.y1 === blockItem.y1 && block.x2 === blockItem.x1)
        ) {
          return false;
        }
      });
    }
    if (orientation === "horizontal" && direction === "left") {
      moveable = cb.map((blockItem) => {
        if (block.id === blockItem.id) {
          //skip over the same item
          //console.log("same Item");
        } else if (
          (block.y1 + 75 === blockItem.y3 && block.x1 === blockItem.x1 + 75) ||
          (block.y1 === blockItem.y1 && block.x1 === blockItem.x1 + 75) ||
          (block.y1 === blockItem.y1 && block.x1 === blockItem.x2)
        ) {
          return false;
        }
      });
    }
    if (orientation === "vertical" && direction === "up") {
      moveable = cb.map((blockItem) => {
        if (block.id === blockItem.id) {
          //skip over the same item
          //console.log("same Item");
        } else if (
          (block.x1 + 75 === blockItem.x2 && block.y1 === blockItem.y1 + 75) ||
          (block.x1 === blockItem.x1 && block.y1 === blockItem.y1 + 75) ||
          (block.x1 === blockItem.x1 && block.y1 === blockItem.y3)
        ) {
          return false;
        }
      });
    }
    if (orientation === "vertical" && direction === "down") {
      moveable = cb.map((blockItem) => {
        if (block.id === blockItem.id) {
          //skip over the same item
          // console.log("same Item");
        } else if (
          (block.x1 + 75 === blockItem.x2 && block.y3 === blockItem.y1) ||
          (block.x1 === blockItem.x1 && block.y3 === blockItem.y1)
        ) {
          return false;
        }
      });
    }
    //console.log(moveable.includes(false));
    if (moveable.includes(false)) return false;
    else return true;
  }
  function boardContains(array, obj) {
    for (var i = 0; i < array.length; i++) {
      if (JSON.stringify(array[i]) === JSON.stringify(obj)) {
        return true;
      }
    }
    return false;
  }

  function isEscapable(possibleBoard) {
    let prisoner;
    let canEscape = possibleBoard.map((item) => {
      if (item.id == 1) {
        prisoner = item;
      } else if (
        (prisoner.y1 === item.y1 && prisoner.x1 < item.x1) ||
        (prisoner.y1 + 75 === item.y3 && prisoner.x1 < item.x1)
      ) {
        return false;
      }
    });

    if (canEscape.includes(false)) return false;
    else return true;
  }

  function handleWinningMoves(event) {
    event.preventDefault();
    if (minMoves.length == 0) {
      console.log("it should work for min moves: ");
      setCompleted(true);
      return;
    }
    setBlockCords(minMoves.pop());
    setSolverMoves(solverMoves + 1);
  }

  function handleSolve(event) {
    event.preventDefault();
    setActivated(true);
    var queue = [];
    var visited = [];
    var graph = new Map();
    var initial = blockCords;

    let count = 0;
    queue.push(blockCords);
    while (queue.length !== 0) {
      let currentBoard = queue.shift();

      let tempBoard = currentBoard;
      if (boardContains(visited, currentBoard)) {
        continue;
      }
      visited.push(currentBoard);

      //check to see if the current potision of the prison block is clear to the final end
      if (isEscapable(currentBoard)) {
        let found = false;
        let breakCount = 0;
        let winningSteps = [];
        let current = currentBoard;
        let finishBoard = currentBoard;
        let breakCounter = 0;
        while (finishBoard[0].x1 !== 225 && breakCounter < 10) {
          breakCounter = breakCounter + 1;
          finishBoard = finishBoard.map((innerItem) => {
            if (innerItem.id == 1) {
              let temp = finishBoard[0].x1;
              return {
                ...innerItem,
                x1: temp + 75,
                get x2() {
                  return this.x1 + 150;
                },
              };
            }
            return innerItem;
          });
          console.log(JSON.stringify(finishBoard));

          winningSteps.push(finishBoard);
        }
        winningSteps.reverse();
        winningSteps.push(current);

        while (JSON.stringify(current) !== JSON.stringify(initial)) {
          if (JSON.stringify(current) == JSON.stringify(initial)) {
          }
          breakCount = breakCount + 1;
          found = false;
          for (let [k, v] of graph) {
            for (let i = 0; i < v.length; i++) {
              if (JSON.stringify(v[i]) === JSON.stringify(current)) {
                current = k;
                winningSteps.push(current);

                found = true;
                break;
              }
            }

            if (found) break;
          }
        }

        winningSteps.pop();
        minMoves = winningSteps;
        setFinished(true);
        console.log("DONEEEEEEEEEEEEEEE");

        break;
      }
      count = 0;

      //else
      let children = [];
      for (let m = 0; m < currentBoard.length; m++) {
        let item = currentBoard[m];
        if (item.direction === "horizontal") {
          if (canMove(item, item.direction, "left", tempBoard)) {
            let objIndex = tempBoard.findIndex((obj) => obj.id == item.id);
            let tempX = tempBoard[objIndex].x1;

            const updatedBoard = tempBoard.map((innerItem) => {
              if (innerItem.id == item.id) {
                return {
                  ...innerItem,
                  x1: tempX - 75,

                  get x2() {
                    return this.x1 + 150;
                  },
                };
              }

              return innerItem;
            });

            queue.push(updatedBoard);
            children.push(updatedBoard);
          }

          if (canMove(item, item.direction, "right", tempBoard)) {
            let objIndex = tempBoard.findIndex((obj) => obj.id == item.id);
            let tempX = tempBoard[objIndex].x1;

            const updatedBoard = tempBoard.map((innerItem) => {
              if (innerItem.id == item.id) {
                return {
                  ...innerItem,
                  x1: tempX + 75,

                  get x2() {
                    return this.x1 + 150;
                  },
                };
              }

              return innerItem;
            });
            count = count + 1;

            queue.push(updatedBoard);
            children.push(updatedBoard);
          }
        }
        if (item.direction === "vertical") {
          if (canMove(item, item.direction, "up", currentBoard)) {
            let objIndex = tempBoard.findIndex((obj) => obj.id == item.id);
            let tempY = tempBoard[objIndex].y1;

            const updatedBoard = tempBoard.map((innerItem) => {
              if (innerItem.id == item.id) {
                return {
                  ...innerItem,
                  y1: tempY - 75,
                  get y3() {
                    return this.y1 + 150;
                  },
                };
              }
              return innerItem;
            });
            count = count + 1;

            queue.push(updatedBoard);
            children.push(updatedBoard);
          }
          if (canMove(item, item.direction, "down", currentBoard)) {
            let objIndex = tempBoard.findIndex((obj) => obj.id == item.id);
            let tempY = tempBoard[objIndex].y1;
            const updatedBoard = tempBoard.map((innerItem) => {
              if (innerItem.id == item.id) {
                return {
                  ...innerItem,
                  y1: tempY + 75,
                  get y3() {
                    return this.y1 + 150;
                  },
                };
              }
              return innerItem;
            });
            count = count + 1;

            queue.push(updatedBoard);
            children.push(updatedBoard);
          }
        }
      }

      graph.set(currentBoard, children);
    }
    if (queue.length === 0) console.log("Not solvable ");
  }

  function resetBoard() {
    if (puzzleCounter === 1) setBlockCords(FirstLevel);
    else if (puzzleCounter === 2) setBlockCords(SecondLevel);
    else if (puzzleCounter === 3) setBlockCords(ThirdLevel);
    else if (puzzleCounter === 4) setBlockCords(FourthLevel);
    else if (puzzleCounter === 5) setBlockCords(FifthLevel);

    setActivated(false);
    setFinished(false);
    setMoveCounter(0);
    setSolverMoves(0);
    setCompleted(false);
  }

  function nextPuzzle() {
    setPuzzleCounter(puzzleCounter + 1);
    let byPassCounter = puzzleCounter + 1;
    if (byPassCounter === 1) setBlockCords(FirstLevel);
    else if (byPassCounter === 2) setBlockCords(SecondLevel);
    else if (byPassCounter === 3) setBlockCords(ThirdLevel);
    else if (byPassCounter === 4) setBlockCords(FourthLevel);
    else if (byPassCounter === 5) setBlockCords(FifthLevel);

    setActivated(false);
    setFinished(false);
    setMoveCounter(0);
    setSolverMoves(0);
    setCompleted(false);
  }

  return (
    <div>
      {!completed
        ? [
            <div className="container">
              <h1>Puzzle {puzzleCounter}</h1>
              <h3>Your Moves: {moveCounter}</h3>
              <h3>Solver Moves: {solverMoves}</h3>
              <button onClick={handleSolve} disabled={activated}>
                Start Solver
                <PlayArrowIcon className="play-icon" />
              </button>
              <button onClick={handleWinningMoves} disabled={!finished}>
                Next Move
                <NavigateNextIcon className="play-icon" />
              </button>
              <div
                className="board"
                style={{ display: completed ? "none" : "block" }}
              >
                <div className="winbox" disabled={activated}></div>
                {blockCords.map((blockItem) => {
                  if (blockItem.type === "keyBlock") {
                    return (
                      <Draggable
                        position={{ x: blockItem.x1, y: blockItem.y1 }}
                        grid={[75, 75]}
                        onStart={handleStart}
                        onDrag={handleDrag}
                        onStop={handleStop}
                        bounds={bounds}
                      >
                        <div
                          className="keyBlock-horizontal horizontal"
                          id={blockItem.id}
                        >
                          {blockItem.id}
                        </div>
                      </Draggable>
                    );
                  } else if (blockItem.direction === "horizontal") {
                    return (
                      <Draggable
                        position={{ x: blockItem.x1, y: blockItem.y1 }}
                        grid={[75, 75]}
                        onStart={handleStart}
                        onDrag={handleDrag}
                        onStop={handleStop}
                        bounds={bounds}
                      >
                        <div
                          className="blockers-double-horizontal horizontal"
                          id={blockItem.id}
                        >
                          {blockItem.id}
                        </div>
                      </Draggable>
                    );
                  } else if (blockItem.direction === "vertical") {
                    return (
                      <Draggable
                        position={{ x: blockItem.x1, y: blockItem.y1 }}
                        grid={[75, 75]}
                        onStart={handleStart}
                        onDrag={handleDrag}
                        onStop={handleStop}
                        bounds={bounds}
                      >
                        <div
                          className="blockers-double-vertical vertical"
                          id={blockItem.id}
                        >
                          {blockItem.id}
                        </div>
                      </Draggable>
                    );
                  }
                })}
              </div>
            </div>,
          ]
        : [
            <div className="winning-display">
              <h1>Puzzle {puzzleCounter} Completed!</h1>
              <h3>Your Moves: {moveCounter}</h3>
              <h3>Solver Moves: {solverMoves}</h3>
              <button onClick={resetBoard}>
                Try Again
                <ReplayIcon className="play-icon" />
              </button>
              <button onClick={nextPuzzle}>
                Next Level
                <SkipNextIcon className="play-icon" />
              </button>
            </div>,
          ]}
    </div>
  );
}

export default UnblockMe;
