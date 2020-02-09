
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

//FUNCTIONS..........................................................
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
//...................................................................
function randomInteger(min, max) {
  let range = max - min + 1;
  return min + Math.floor(Math.random() * range);
}
//...................................................................
let max = 100
//...................................................................
let min = 1
//...................................................................
let guessCount = 1


start();
async function start() {
  console.log("\nLet's play a game where you (human) make up a number and I (computer) try to guess it.")
  let start = await ask('\n"Press" Enter To Start, Mwahaha!');
  let secretNumber = await ask('\nWhat is your secret number?' + "\n\nI won't peek, I promise..." + '\n\nEnter a number between 1-100 and "Press" Enter.\n\n');
  console.log('\nYou entered: ' + secretNumber + '');
  let guess = randomInteger(min, max)
  let firstGuess = await ask('\nIs it...' + guess + '?' + " Yes, or No: ")

  if (firstGuess === "N" || firstGuess === "No" || firstGuess === "NO" || firstGuess === "no" || firstGuess === "n") {
    console.log("\nLet me try again")
  } else {
    console.log("\nYour number was " + secretNumber + "!" + '\n\n"No matter how dark the night, the morning always comes" - Lulu Final Fantasy X.\n\nI guessed  first try')
    process.exit()
  }

  while (firstGuess !== "Yes") {

    let secondGuess = await ask('\nIs it higher (H)?' + ',or lower (L)? ')
    if (secondGuess === "Higher" || secondGuess === "higher" || secondGuess === "High" || secondGuess === "high" || secondGuess === "H" || secondGuess === "h" || secondGuess === ">" || secondGuess === "+") {
      min = guess
      guess = randomInteger(min, max)
      firstGuess = await ask('\nIs it...' + guess + '?' + " Yes, or No: ")
      guessCount += 1;
    } else if (secondGuess === "Lower" || secondGuess === "lower" || secondGuess === "Low" || secondGuess === "low" || secondGuess === "L" || secondGuess === "l" || secondGuess === "<" || secondGuess === "-") {
      max = guess
      guess = randomInteger(min, max)
      firstGuess = await ask('\nIs it...' + guess + '?' + "Yes, or No: ")
      guessCount += 1;
    }
    if (firstGuess === "N" || firstGuess === "No" || firstGuess === "NO" || firstGuess === "no" || firstGuess === "n") {
      console.log('\nLet me try again')
    } else {
      console.log("\nYour number was " + secretNumber + "!" + "\n\nI guessed it in " + guessCount + " tries")
      process.exit()
    }
  }


  //Now try and complete the program

  //Guess a random number, and ask if it's correct

  //If the player says "yes" exit the game

  //If the player says no
  //Ask if it's higher or lower
  //If it's higher modify min value
  //If it's lower modify max value

  //Guess a new number

}
