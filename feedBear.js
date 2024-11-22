function diplay(gameFrame) {
  console.log(gameFrame);
}

function emptyLines(numberOfEmptyLines) {
  for (let index = 0; index < numberOfEmptyLines; index++) {
    console.log();
  }
}

function getEmojiVersion(gameFrameInText) {
  let gameFrameInEmoji = "";

  for (let index = 0; index < gameFrameInText.length; index++) {
    if (gameFrameInText[index] === "B") {
      gameFrameInEmoji = gameFrameInEmoji + "🧸";
      continue;
    }

    if (gameFrameInText[index] === "F") {
      gameFrameInEmoji = gameFrameInEmoji + "🍇";
      continue;
    }

    if (gameFrameInText[index] === "T") {
      gameFrameInEmoji = gameFrameInEmoji + "🌳"
      continue;
    }

    if (gameFrameInText[index] === "H") {
      gameFrameInEmoji = gameFrameInEmoji + "👹";
      continue;
    }
    gameFrameInEmoji = gameFrameInEmoji + gameFrameInText[index];
  }

  return gameFrameInEmoji;
}

function diplayFrame(gameFrame) {
  console.clear();
  diplay(upperBorder + gameFrame + bottomBorder);
}

function getBearPosition(gameFrame) {
  for (let index = 0; index < gameFrame.length; index++) {
    if (gameFrame[index] === "B") {
      return index;
    }
  }
}

const huntersPosition = "052025";
function doesHunterSeeBear(bearNextPosition) {
  let numberOfDigits = 0;
  let huntersLocation = "";
  for (let index = 0; index < huntersPosition.length; index++) {
    if (numberOfDigits === 1) {
      huntersLocation = huntersLocation + huntersPosition[index];
      if (+huntersLocation === bearNextPosition) {
        return true;
      }
      numberOfDigits = 0;
      huntersLocation = "";
      continue;
    }
    huntersLocation = huntersLocation + huntersPosition[index];
    numberOfDigits = numberOfDigits + 1;
  }
  return false;
}


function makeMove(gameFrame, movementConst) {
  const bearPosition = getBearPosition(gameFrame);
  let newGameFrame = "";
  const wasBearSeen = doesHunterSeeBear(bearPosition + movementConst);

  if (wasBearSeen) {
    escapeReamining = escapeReamining - 1;
  }  

  if (gameFrame[bearPosition + movementConst] === "F") {
    foodRemaining = foodRemaining - 1;
  }


  for (let index = 0; index < gameFrame.length; index++) {
    if (index === bearPosition + movementConst) {
      newGameFrame = newGameFrame + (wasBearSeen ? "H" : "B");
      continue;
    }

    if (gameFrame[index] === "B") {
      newGameFrame = newGameFrame + (wasBearSeen ? "B" : "T");
      continue;
    }

    newGameFrame = newGameFrame + gameFrame[index];
  }

  return newGameFrame;
}

function generateNewFrame(gameFrame, move) {
  switch (move) {
    case "a":
      return makeMove(gameFrame, -1);
    case "d":
      return makeMove(gameFrame, 1);
    case "s":
      return makeMove(gameFrame, 8);
    case "w":
      return makeMove(gameFrame, -8);
  }
}

function isValidUpStep(bearPosition) {
  return bearPosition > 8;
}

function isValidDownStep(bearPosition) {
  return bearPosition < 22;
}

function isValidLeftAndRightStep(bearPosition, move) {
  if (bearPosition > 0 && bearPosition < 6) {
    return move === "L" ? bearPosition > 1 : bearPosition < 5;
  }

  if (bearPosition > 8 && bearPosition < 14) {
    return move === "L" ? bearPosition > 9 : bearPosition < 13;
  }

  if (bearPosition > 16 && bearPosition < 22) {
    return move === "L" ? bearPosition > 17 : bearPosition < 21;
  }

  if (bearPosition > 24 && bearPosition < 30) {
    return move === "L" ? bearPosition > 25 : bearPosition < 29;
  }
}

function isValidMove(gameFrame, move) {
  const bearPosition = getBearPosition(gameFrame);

  switch (move) {
    case "a":
      return isValidLeftAndRightStep(bearPosition, "L");
    case "d":
      return isValidLeftAndRightStep(bearPosition, "R");
    case "w":
      return isValidUpStep(bearPosition);
    case "s":
      return isValidDownStep(bearPosition);
  }

  emptyLines(1);
  console.log("Invalid Command!");
  emptyLines(1);
  return false;
}

const upperBorder = "╔═══✧═✧════╗\n";
const bottomBorder = "╚════✧✧════╝\n";
let escapeReamining = 2;
let foodRemaining = 4;

function playGame(gameFrame) {
  if (foodRemaining === 0 && escapeReamining > 0) {
    return "WON"
  }

  if (escapeReamining < 1) {
    return "Lose";
  }

  const controlInformation = "Left : 'a'  Right : 'd'  Up : 'w'  Down : s";
  diplay(controlInformation);
  console.log()

  const move = prompt("Make Move :");

  if (!isValidMove(gameFrame, move)) {
    console.log("Bear can't step out of Forest since there is danger!!");
    return playGame(gameFrame);
  }

  const newGameFrame = generateNewFrame(gameFrame, move);
  const newGameFrameInEmoji = getEmojiVersion(newGameFrame);

  diplayFrame(newGameFrameInEmoji);

  return playGame(newGameFrame);
}

function gameHome() {
  const gameFrameInText = "|BTTTT|\n|FTFTT|\n|TTFTT|\n|FTTTT|\n";
  const gameFrameInEmoji = getEmojiVersion(gameFrameInText);
  const gameFrame = upperBorder + gameFrameInEmoji + bottomBorder;

  diplay(gameFrame);
  return playGame(gameFrameInText);
}

console.log(gameHome());
