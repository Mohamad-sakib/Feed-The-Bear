// //Maps  *****************************************
// const gameMap1 = 
// const gameMap2 =
// const gameMap3 =
// const gameMap4 =
// const gameMap5 =
// const gameMap6 =

// //huntersPositions in maps  *****************************************
// const huntersPosition1 =
// const huntersPosition2 =
// const huntersPosition3 =
// const huntersPosition4 =
// const huntersPosition5 =
// const huntersPosition6 =

// //bearPositons in maps *********************************
// const bearPositionInMap1 =
// const bearPositionInMap2 =
// const bearPositionInMap3 =
// const bearPositionInMap4 =
// const bearPositionInMap5 =
// const bearPositionInMap6 =

// //foodPositions in maps  *****************************************
// const foodPositionsInMap1 = 
// const foodPositionsInMap2 = 
// const foodPositionsInMap3 = 
// const foodPositionsInMap4 = 
// const foodPositionsInMap5 = 
// const foodPositionsInMap6 = 

//gameFrame and object postions *****************************************
let gameFrame = "🧸🌳🌳\n🌳🌳🌳\n🌳🌳🍇";
let huntersPosition = "";
let bearPosition = 0;
let foodPostion = 18;
let isWon = false;

function getMovementConst(move) {
  switch (move) {
    case "a":
      return -2;
    case "d":
      return 2;
    case "s":
      return 7;
    case "w":
      return -7;
  }
}

function addSymbol(movementConst, index, bearLocation) {
  if (index === bearLocation + movementConst) {
    if (bearLocation + movementConst === foodPostion) {
      isWon = true;
      return "🐻" + makeMove(movementConst, index + 1, bearLocation, false);
    }

    return "🧸" + makeMove(movementConst, index + 1, bearLocation, false);
  }

  if (index === foodPostion) {
    return "🍇" + makeMove(movementConst, index + 1, bearLocation, false);
  }

  return "🌳" + makeMove(movementConst, index + 1, bearLocation, false);
}

function makeMove(movementConst, index, bearLocation, hasNeedToAddSymbol) {
  const bearNewLocation = bearLocation + movementConst;

  if (index > gameFrame.length - 1) {
    bearPosition = bearNewLocation;
    return "";
  }

  if (index === 6 || index === 13 || index === 21) {
    return "\n" + makeMove(movementConst, index + 1, bearLocation, true)
  }

  if (hasNeedToAddSymbol) {
    return addSymbol(movementConst, index, bearLocation, hasNeedToAddSymbol);
  }

  return "" + makeMove(movementConst, index + 1, bearLocation, true);
}

function modifyGameFrame(move) {
  const movementConst = getMovementConst(move);
  return makeMove(movementConst, 0, bearPosition, true);
}

//validationPart*****************************

function isValidLeftStep() {
  if (bearPosition < 6) {
    return bearPosition > 1;
  }

  if (bearPosition > 6 && bearPosition < 13) {
    return bearPosition > 8;
  }

  if (bearPosition > 13 && bearPosition < 20) {
    return bearPosition > 15;
  }
}

function isValidRightStep() {
  if (bearPosition < 6) {
    return bearPosition < 4;
  }

  if (bearPosition > 6 && bearPosition < 13) {
    return bearPosition < 11;
  }

  if (bearPosition > 13 && bearPosition < 20) {
    return bearPosition < 18;
  }
}

function isValidUpStep() {
  return bearPosition > 6;
}

function isValidDownStep() {
  return bearPosition < 13;
}

function isValidMove(move) {
  switch (move) {
    case "a":
      return isValidLeftStep();
    case "d":
      return isValidRightStep();
    case "s":
      return isValidDownStep();
    case "w":
      return isValidUpStep();
  }
}

function playGame() {
  console.log("Up: 'w', Down: 's' , Left: 'a' , Right: 'd'");
  const move = prompt("Make Move: ");

  if (!isValidMove(move)) {
    console.log("Bear Can't step out of forest since there is danger");
    return playGame();
  }

  gameFrame = modifyGameFrame(move);
  console.clear();
  console.log(gameFrame);

  if (isWon) {
    console.log();
    console.log();
    console.log("      ╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱");
    console.log("      ┃                     You won 🏅                     ┃");
    console.log("      ╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱");
    console.log()
    console.log();
    return "Thanks For playing ,please pin us  to feed Bear again 😉";
  }

  return playGame();
}

console.log(gameFrame);
const result = playGame();
console.log(result);
console.log();

// function selectMap() {
//   const selectedMap = Math.ceil(Math.random() * 10)
//   return 
// }

// function gameHome() {
//   const mapNumber = selectMap();
//   gameFrame =  getMap(mapNumber);
//   foodPostion = getFoodPosition(mapNumber);
//   bearPosition = getBearPosition(mapNumber);
//   huntersPosition = getHunterPosition(mapNumber);
//   console.log(gameFrame);
//   const result = playGame();
//   console.log(result);
//   console.log();
// }
