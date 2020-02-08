
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


start();

async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber + '');

  let guess = randomInteger(min, max)
  let firstGuess = await ask('Is it...' + guess + ' ?' + " Yes, or No:")

  if (firstGuess === "N" || firstGuess === "No" || firstGuess === "NO" || firstGuess === "no" || firstGuess === "n") {
    console.log("Let me try again")
  } else {
    console.log("Your number was " + secretNumber + "!")
  }

  while (firstGuess !== "Yes") {

    let secondGuess = await ask('Is it higher (H)?' + ',or lower (L)?')
    if (secondGuess === "Higher" || secondGuess === "higher" || secondGuess === "H" || secondGuess === "h" || secondGuess === ">" || secondGuess === "+") {
      min = guess
      guess = randomInteger(min, max)
      firstGuess = await ask('Is it...' + guess + ' ?' + " Yes, or No:")
    } else if (secondGuess === "Lower" || secondGuess === "lower" || secondGuess === "L" || secondGuess === "l"  || secondGuess === "<" || secondGuess === "-") {
      max = guess
      guess = randomInteger(min, max)
      firstGuess = await ask('Is it...' + guess + ' ?' + "Yes, or No:")
    }
    if (firstGuess === "N" || firstGuess === "No" || firstGuess === "NO" || firstGuess === "no" || firstGuess === "n") {
      console.log('Let me try again')
    } else {
      console.log("Your number was " + secretNumber + "!")
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
