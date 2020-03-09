
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
function median(min, max) {
  return Math.floor((max + min) / 2);
}
//.....Min for Game A..........................................
let minRange = 1
//.....Max & Min for Game B..........................................
let max = 100
let min = 1
//...................................................................
let guessCount = 1
//
let noResponses = ['N', 'No', 'NO', 'no', 'n']
let yesResponses = ['Y', 'Yes', 'YES', 'yes', 'y']
let highResponses = ['Higher', 'higher', 'High', 'high', 'H', 'h', '>', '+']
let lowResponses = ['Lower', 'lower', 'Low', 'low', 'L', 'l', '<', '-']
let aResponses = ['A', 'a']
let bResponses = ['B', 'b']
//
let maxGuess = parseInt()
//Let's player choose which game they would like to play
start()
async function start() {
  console.log("\nNo weapons! No tricks! Just you and me!\n")

  let gameOption = await ask(`Choose option "A" where you try and guess a number I make up or "B" where computer tries to guess the number\n\n`)

  let tries = 0
  while (aResponses.includes(gameOption) || bResponses.includes(gameOption)) {
    if (aResponses.includes(gameOption)) {
      computer();
    }
    else if (bResponses.includes(gameOption)) {
      human();
    }
    tries++
    gameOption = await ask(`Choose option "A" where you try and guess a number I make up or "B" where computer tries to guess the ////number\n\n`)
  }
  console.log(`Goodbye`)
  process.exit()

  //Game option "A"
  async function computer() {

    let minRange = parseInt(await ask("\nGive me a range to guess from.  First give me the low end.\n\n"));
    let maxRange = parseInt(await ask("\nWhat is the high end?\n\n"))
    let i = 1

    //function determines whether a value is NaN or not
    while (isNaN(minRange) || isNaN(maxRange)) {
      if (isNaN(minRange)) {
        minRange = parseInt(await ask("\n\nInvalid for min Range"))

      }
      if (isNaN(maxRange)) {
        maxRange = parseInt(await ask("\n\nInvalid for max Range"))
      }
    }

    let compNum = randomInteger(maxRange, minRange);
    let playerGuess = parseInt(await ask("\nGuess a number.\n\n"))

    while (playerGuess !== compNum) {

      //Cheat Function
      if (playerGuess > maxRange || playerGuess < minRange) {
        console.log("\nDanger Will Robinson.  Beyond the range you gave me.")
        playerGuess = parseFloat(await ask("\nPlease guess again.\n\n"))
      }
      else if (playerGuess < compNum) {
        playerGuess = parseFloat(await ask("\nHigher. Guess again.\n\n"))
      }
      else {
        playerGuess = parseFloat(await ask("\nLower. Guess again.\n\n"))
      } guessCount += 1;
    }

    console.log("\nWinner! Winner! Chicken Dinner! You guessed the correct number in " + guessCount + " tries!  Thanks for playing!")
    process.exit()
  }

  //Game option "B"
  async function human() {
    console.log("\nLet's play a game where you (human) make up a number and I (computer) try to guess it.")
    let start = await ask('\n"Press" Enter To Start, Mwahaha!');
    let secretNumber = await ask('\nWhat is your secret number?' + "\n\nI won't peek, I promise..." + '\n\nEnter a number between 1-100 and "Press" Enter.\n\n');

    while (isNaN(secretNumber)) {
      secretNumber = await ask("\nYou have not entered a number.\n\n" +
        "Please enter a number in the range 1 to 100.\n\n");
    } if (secretNumber > max || secretNumber < min) {
      console.log("\nCheater, goodbye")
      process.exit()
    }

      console.log('\nYou entered: ' + parseInt(secretNumber))



      let guess = randomInteger(min, max)
      let firstGuess = await ask('\nIs it...' + guess + '?' + " Yes, or No: ")


      if (noResponses.includes(firstGuess)) {
        console.log("\nLet me try again")
      } if (yesResponses.includes(firstGuess)) {
        console.log("\nYour number was " + secretNumber + "!" + '\n\n"No matter how dark the night, the morning always comes" - Lulu Final Fantasy X.\n\nI guessed first try')
        process.exit()
      }

      while (firstGuess !== "Yes") {

        let secondGuess = await ask('\nIs it higher (H)?' + ',or lower (L)? ')

        if (highResponses.includes(secondGuess)) {
          min = guess + 1
          guess = randomInteger(min, max)
          firstGuess = await ask('\nIs it...' + guess + '?' + " Yes, or No: ")
          guessCount += 1;
        }
        else if (lowResponses.includes(secondGuess)) {
          max = guess - 1
          guess = randomInteger(min, max)
          firstGuess = await ask('\nIs it...' + guess + '?' + "Yes, or No: ")
          guessCount += 1;
        }
        if (max < min) {
          console.log("Cheater")
        }
        else {
          console.log("\nYour number was " + secretNumber + "!" + "\n\nI guessed it in " + guessCount + " tries")
          process.exit()
        }
      }
    }
  }