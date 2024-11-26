function display(gameFrame) {
  console.log(gameFrame);
}

function emptyLines(numberOfEmptyLines) {
  for (let index = 0; index < numberOfEmptyLines; index++) {
    console.log();
  }
}

//animation

function delay(times = 1000000000) {
  for (let index = 0; index < times; index++) {
  }
}

function displayLoadingMessage(string) {
  displayAtCenter("𝙻𝚘𝚊𝚍𝚒𝚗𝚐" + string);
}

function modifySting(string) {
  let modifiedString = "";
  for (let index = 0; index < string.length - 1; index++) {
    if (index === 0) {
      modifiedString = string[string.length - 1] + string[0];
      continue;
    }

    modifiedString = modifiedString + string[index];
  }
  return modifiedString;
}

function getLoadingEmojiVersion(string) {
  let emojiVersion = "";
  for (let index = 0; index < string.length; index++) {
    if (string[index] === "B") {
      emojiVersion = emojiVersion + "🧸";
      continue;
    }

    emojiVersion = emojiVersion + "🌳";
  }
  return emojiVersion;
}

function loadingAnimation() {
  let string = "BTTTTTT";
  for (let index = 0; index < string.length; index++) {
    console.clear();
    string = modifySting(string);
    const emojiVersion = getLoadingEmojiVersion(string);
    displayLoadingMessage(emojiVersion);
    delay();
  }
}

function displayAtCenter(string) {
  for (let index = 0; index < 16; index++) {
    string = "\n\t\t\t\t\t\t\t" + string;
  }

  console.clear();
  display(string);
}


function bloodAnimation() {
  const blood = "🏹🩸 By Hunter";
  console.clear();
  displayAtCenter(blood);
  delay(1000009999);
}

function linearMotion(string, index) {
  if (index === string.length - 1) {
    return "";
  }

  if (index === 0) {
    return string[string.length - 1] + string[0] + linearMotion(string, ++index);
  }

  return string[index] + linearMotion(string, index + 1);
}

function getEmojiVersionOfLoseFrame(bearFrame) {
  let bearEmojiFrame = "";
  for (let index = 0; index < bearFrame.length; index++) {
    if (bearFrame[index] === "M") {
      bearEmojiFrame = bearEmojiFrame + "😥" + "🤕";
      continue;
    }

    bearEmojiFrame = bearEmojiFrame + bearFrame[index];
  }
  return bearEmojiFrame;
}

function loseAnimation(bearImage,index = 0) {
  if (index === 15) {
    return;
  }

  console.clear();
  displayAtCenter(getEmojiVersionOfLoseFrame(bearImage));
  delay();
  bearImage = linearMotion(bearImage, 0);
  
  return loseAnimation(bearImage,index + 1);
}

function winAnimation(index) {
  if (index === 0) {
    return;
  }

  displayAtCenter("you won 🎉" + "🏆 " + "ʕ •ᴥ•ʔ");
  delay();
  displayAtCenter("you won 🎉" + "🏆 " + "ʕᵔᴥᵔʔ");
  delay();
  displayAtCenter("you won 🎉" + "🏆 " + "＼ʕ •ᴥ•ʔ/");
  delay();

  return winAnimation(index - 1);
}

const NEW_LINE = '\n';
let GAME_STATUS = '';

function repeat(char, times) {
  if (times === 0) return "";

  return char + repeat(char, times - 1);
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
      gameFrameInEmoji = gameFrameInEmoji + "💂";
      continue;
    }
    gameFrameInEmoji = gameFrameInEmoji + gameFrameInText[index];
  }

  return gameFrameInEmoji;
}

function displayFrame(gameFrame) {
  console.clear();
  display(upperBorder + gameFrame + bottomBorder);
}

function getBearPosition(gameFrame) {
  for (let index = 0; index < gameFrame.length; index++) {
    if (gameFrame[index] === "B") {
      return index;
    }
  }
}

const huntersPosition = "0720212050161304044";
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
    bloodAnimation();
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
      return makeMove(gameFrame, 13);
    case "w":
      return makeMove(gameFrame, -13);
  }
}

function isValidUpStep(bearPosition) {
  return bearPosition > 14;
}

function isValidDownStep(bearPosition) {
  return bearPosition < 118;
}

function isValidLeftAndRightStep(bearPosition, move) {
  if (bearPosition > 0 && bearPosition < 11) {
    return move === "L" ? bearPosition > 1 : bearPosition < 10;
  }

  if (bearPosition > 13 && bearPosition < 24) {
    return move === "L" ? bearPosition > 14 : bearPosition < 23;
  }

  if (bearPosition > 26 && bearPosition < 37) {
    return move === "L" ? bearPosition > 27 : bearPosition < 36;
  }

  if (bearPosition > 39 && bearPosition < 50) {
    return move === "L" ? bearPosition > 40 : bearPosition < 49;
  }

  if (bearPosition > 52 && bearPosition < 63) {
    return move === "L" ? bearPosition > 53 : bearPosition < 62;
  }

  if (bearPosition > 65 && bearPosition < 76) {
    return move === "L" ? bearPosition > 66 : bearPosition < 75;
  }

  if (bearPosition > 78 && bearPosition < 89) {
    return move === "L" ? bearPosition > 79 : bearPosition < 88;
  }

  if (bearPosition > 91 && bearPosition < 102) {
    return move === "L" ? bearPosition > 92 : bearPosition < 101;
  }

  if (bearPosition > 104 && bearPosition < 115) {
    return move === "L" ? bearPosition > 105 : bearPosition < 114;
  }

  if (bearPosition > 117 && bearPosition < 128) {
    return move === "L" ? bearPosition > 118 : bearPosition < 127;
  }
}

function showHelp(gameFrame) {
  console.clear();
  const HelpMessage ="Story \nA newly born bear lost their parents killed by hunters in forest , now they are finding the bear to catch it while \nbear is starving and  it can’t stay at place without completing its appetite and its job is to eat food in jungle\nprotecting itself from hunters  available in jungle.\n\nRules\n1. To win the game feed the bear all food available in jungle\n2. You have 2 chance to escape bear from danger\n3. 16 food items are in the game that to be eaten by bear\n4. Lives and food remaining are displayed over the gamingScreen\n5. Bear can’t take step out of the jungle since there is danger\n6. Hunters can be anywhere in jungle hiding behind  any tree\n7. But hunter will never be hidden behind the food or at food locations\n "
  display(HelpMessage);

  console.log(gameFrame);

  if (prompt("press ENTER To go back to Game:") === "") {
    return playGame();
  } 

  console.clear();

  return playGame(gameFrame);
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

  if (move === "h") {
    return showHelp(gameFrame);
  }

  emptyLines(1);
  console.log("Invalid Command!");
  emptyLines(1);
  return false;
}

const upperBorder = "╔════════✧═✧═════════╗\n";
const bottomBorder = "╚═════════✧✧═════════╝\n";
let escapeReamining = 3;
let foodRemaining = 5;

function showCurrentStatus() {
  display("");
  display("lives ❤️ : " + escapeReamining);
  display("Food 🍇 : " + foodRemaining);
  display("");
}

function playGame(gameFrame) {
  if (foodRemaining === 0 && escapeReamining > 0) {
    GAME_STATUS = "WON"
    return;
  }

  if (escapeReamining < 1) {
    GAME_STATUS = "Lose";
    return;
  }

  const controlInformation = "Left : 'a'  Right : 'd'  Up : 'w'  Down : 's' Help : 'h'";
  display(controlInformation);
  showCurrentStatus()
  const move = prompt("Make a Move :");

  if (!isValidMove(gameFrame, move)) {
    console.log("Bear can't step out of Forest since there is danger!!");
    return playGame(gameFrame);
  }

  const newGameFrame = generateNewFrame(gameFrame, move);
  const newGameFrameInEmoji = getEmojiVersion(newGameFrame);

  displayFrame(newGameFrameInEmoji);

  return playGame(newGameFrame);
}

function displayResult(GAME_STATUS) {
  if (GAME_STATUS === "WON") {
    winAnimation(10);
    return;
  }

  const bearImage = "You Lose M૮ >ﻌ< ა________________________________________________";
  loseAnimation(bearImage);
}


function gameHome() {
  console.clear();
  loadingAnimation();
  console.clear();

  display("          ╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱");
  display("          ┃            Welcome To Feed The Bear Game           ┃");
  display("          ╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱");
  display("");
//0720212050161304044
  const gameFrameInText = "|BTTTTFTTTF|\n|TTTTTTTTTT|\n|TFTTTTFTTT|\n|TTTTFTTTTT|\n|FTFTTTTTTF|\n|TTFTTTTTTT|\n|FTTTTTFTTT|\n|FTTTTTFTTT|\n|FTFTTTTTTT|\n|TTFTTTTTTT|\n";
  const gameFrameInEmoji = getEmojiVersion(gameFrameInText);
  const gameFrame = upperBorder + gameFrameInEmoji + bottomBorder;

  display(gameFrame);
  playGame(gameFrameInText);
  displayResult(GAME_STATUS);
}

console.clear();

if ("" === prompt("Press ENTER to Start Game:")) {
  gameHome();
}
else {
  displayAtCenter("Play Later 😉");
}

if ("" === prompt("Press ENTER to Play Again")) {
  escapeReamining = 3;
  foodRemaining = 16;
  gameHome();
}
