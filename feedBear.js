let gameFrame = "🧸🌳🌳\n🌳🌳🌳\n🌳🌳🌳";
let huntersPosition = "";
let bearPosition = 0;

//function to move right ********************************************

function takeRight(index, bearPosi, hasNeedToAddSymbol) {
  if (index > gameFrame.length - 1) {
    bearPosition = bearPosi + 2;
    return "";
  }

  if (index === 6 || index === 13 || index === 20) {
    return "\n" + takeRight(index + 1, bearPosi, true)
  }

  if (hasNeedToAddSymbol) {
    if (index === bearPosi) {
      return "🌳" + takeRight(index + 1, bearPosi, false);
    }

    if (index === bearPosi + 2) {
      return "🧸" + takeRight(index + 1, bearPosi, false);
    }
    return "🌳" + takeRight(index + 1, bearPosi, false);
  }

  return "" + takeRight(index + 1, bearPosi, true);
}

//function to move left ********************************************
function takeLeft(index, bearPosi, hasNeedToAddSymbol) {
  if (index > gameFrame.length - 1) {
    bearPosition = bearPosi - 2;
    return "";
  }

  if (index === 6 || index === 13 || index === 20) {
    return "\n" + takeLeft(index + 1, bearPosi, true)
  }

  if (hasNeedToAddSymbol) {
    if (index === bearPosi) {
      return "🌳" + takeLeft(index + 1, bearPosi, false);
    }

    if (index === bearPosi - 2) {
      return "🧸" + takeLeft(index + 1, bearPosi, false);
    }
    return "🌳" + takeLeft(index + 1, bearPosi, false);
  }

  return "" + takeLeft(index + 1, bearPosi, true);
}

//function to move up
function moveUp(index, bearPosi, hasNeedToAddSymbol) {
  if (index > gameFrame.length - 1) {
    bearPosition = bearPosi - 7;
    return "";
  }

  if (index === 6 || index === 13 || index === 20) {
    return "\n" + moveUp(index + 1, bearPosi, true)
  }

  if (hasNeedToAddSymbol) {
    if (index === bearPosi) {
      return "🌳" + moveUp(index + 1, bearPosi, false);
    }

    if (index === bearPosi - 7) {
      return "🧸" + moveUp(index + 1, bearPosi, false);
    }
    return "🌳" + moveUp(index + 1, bearPosi, false);
  }

  return "" + moveUp(index + 1, bearPosi, true);
}

//function for moveDown 

function moveDown(index, bearPosi, hasNeedToAddSymbol) {
  if (index > gameFrame.length - 1) {
    bearPosition = bearPosi + 7;
    return "";
  }

  if (index === 6 || index === 13 || index === 20) {
    return "\n" + moveDown(index + 1, bearPosi, true)
  }

  if (hasNeedToAddSymbol) {
    if (index === bearPosi) {
      return "🌳" + moveDown(index + 1, bearPosi, false);
    }

    if (index === bearPosi + 7) {
      return "🧸" + moveDown(index + 1, bearPosi, false);
    }
    return "🌳" + moveDown(index + 1, bearPosi, false);
  }

  return "" + moveDown(index + 1, bearPosi, true);
}


function modifyGameFrame(move) {
  if (move === "d") {
    return takeRight(0, bearPosition, true);
  }

  if (move === "a") {
    return takeLeft(0, bearPosition, true);
  }

  if(move === "s") {
    return moveDown(0, bearPosition, true);
  }

  if(move === "w") {
    return moveUp(0, bearPosition, true);
  }
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
  return bearPosition > 6
}

function isValidDownStep() {
  return bearPosition < 13
}

function isValidMove(move) {
  switch(move) {
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
  // if (confirm("Wanna Make Step")) {
    console.log("Up: 'w', Down: 's' , Left: 'a' , Right: 'd'");
    const move = prompt("Make Move: ");
    // if (!isValidRightStep()) {
    //   console.log("Bear Can't step out of forest since there is danger");
    //   return playGame();
    // }

    // if (!isValidLeftStep()) {
    //   console.log("Bear Can't step out of forest since there is danger");
    //   return playGame();
    // }
    // if (!isValidUpStep()) {
    //   console.log("Bear Can't step out of forest since there is danger");
    //   return playGame();
    // }
    // if (!isValidDownStep()) {
    //     console.log("Bear Can't step out of forest since there is danger");
    //     return playGame();
    //   }

    if (!isValidMove(move)) {
      console.log("Bear Can't step out of forest since there is danger");
      return playGame();
    }

    gameFrame = modifyGameFrame(move);
   
    // gameFrame = takeRight(0, bearPosition, true);
    // gameFrame = takeLeft(0, bearPosition, true);
    // gameFrame = moveUp(0, bearPosition, true);
    // gameFrame = moveDown(0, bearPosition, true);
    console.clear();
    console.log(gameFrame);
    return playGame();
  // }

  // return "";
}

console.log(gameFrame);
playGame();