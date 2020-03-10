
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

//FUNCTIONS..........................................................
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
//Random Number Integer
function randomInteger(min, max) {
  let range = max - min + 1;
  return min + Math.floor(Math.random() * range);
}
//.....Min for Game A..........................................
let minRange = 1
//.....Max & Min for Game B..........................................
let max = 100
let min = 1
//...................................................................
let guessCount = 1
//Arrays
let noResponses = ['N', 'No', 'NO', 'no', 'n']
let yesResponses = ['Y', 'Yes', 'YES', 'yes', 'y']
let highResponses = ['Higher', 'higher', 'High', 'high', 'H', 'h', '>', '+']
let lowResponses = ['Lower', 'lower', 'Low', 'low', 'L', 'l', '<', '-']
let aResponses = ['A', 'a']
let bResponses = ['B', 'b']
//Let's player choose which game they would like to play
start()
async function start() {
  console.log("\nNo weapons! No tricks! Just you and me!\n")

  let gameOption = await ask(`Choose option "A" where you try and guess a number I make up or "B" where computer tries to guess the number\n\n`)

  while (aResponses.includes(gameOption) || bResponses.includes(gameOption)) {
    //Takes player to game A
    if (aResponses.includes(gameOption)) {
      computer();
    }
    //Takes player to game B
    else if (bResponses.includes(gameOption)) {
      human();
    }
    //If the player does not choose option A or B the game will exit
    gameOption = await ask(`Choose option "A" where you try and guess a number I make up or "B" where computer tries to guess the ////number\n\n`)
  }
  console.log(`Goodbye`)
  process.exit()

  //Game option "A", you are playing an AI.  The AI asks a set of question to set a range for a "guess the number" game.
  async function computer() {
    //Sets the min and max range for guess, parseInst function takes the enter value which is a string and turns it into a integer
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

      //Cheat Function - if the player tries to trick the computer it checks to make sure it is within the range set by the player and then sends a message
      if (playerGuess > maxRange || playerGuess < minRange) {
        console.log("\nDanger Will Robinson.  Beyond the range you gave me.")
        playerGuess = parseFloat(await ask("\nPlease guess again.\n\n"))
      }//If players guess is less then the random number generates the computer gives the player a message.  parseFloat function here takes the number entered and returns a number.
      else if (playerGuess < compNum) {
        playerGuess = parseFloat(await ask("\nHigher. Guess again.\n\n"))
      }//If players guess is greater then the random number generates the computer gives the player a message.  parseFloat function here takes the number entered and returns a number.
      else {
        //parseFloat function here takes the number entered and returns a number.  guessCount here adds a value to a variable.
        playerGuess = parseFloat(await ask("\nLower. Guess again.\n\n"))
      } guessCount += 1;
    }
    //End of game, the number is guessed and a message is delivered.
    console.log("\nWinner! Winner! Chicken Dinner! You guessed the correct number in " + guessCount + " tries!  Thanks for playing!")
    process.exit()
  }

  //Game option "B", you are playing where the computer tries to guess a number you entered.
  async function human() {
    console.log("\nLet's play a game where you (human) make up a number and I (computer) try to guess it.")
    let start = await ask('\n"Press" Enter To Start, Mwahaha!');
    let secretNumber = await ask('\nWhat is your secret number?' + "\n\nI won't peek, I promise..." + '\n\nEnter a number between 1-100 and "Press" Enter.\n\n');

    //
    while (isNaN(secretNumber)) {
      secretNumber = await ask("\nYou have not entered a number.\n\n" +
        "Please enter a number in the range 1 to 100.\n\n");
      //if number entered if greater then max or less then min the program will exit because the player entered a number outside the range of 1-100 (min and max range).  I could have looped this to return and ask the question over again.
    } if (secretNumber > max || secretNumber < min) {
      console.log("\nCheater, goodbye")
      process.exit()
    }

    console.log('\nYou entered: ' + parseInt(secretNumber))



    let guess = randomInteger(min, max)
    let firstGuess = await ask('\nIs it...' + guess + '?' + " Yes, or No: ")

//Took all possible responses to no and made an array called noResponses, if player enters no on first guess a message will appear
    if (noResponses.includes(firstGuess)) {
      console.log("\nLet me try again")
      //Took all possible responses to yes and made an array called yesResponses, if player enters yes on a first guess a message will appear that there number was ?
    } if (yesResponses.includes(firstGuess)) {
      console.log("\nYour number was " + secretNumber + "!" + '\n\n"No matter how dark the night, the morning always comes" - Lulu Final Fantasy X.\n\nI guessed first try')
      process.exit()
    }

    while (firstGuess !== "Yes") {

      let secondGuess = await ask('\nIs it higher (H)?' + ',or lower (L)? ')
//Took all possible responses to 'higher' and built an array similar to above.  guess + 1 will increment there minimum number, which in return makes the pool of possible out comes smaller. guessCount here adds a value to a variable.
      if (highResponses.includes(secondGuess)) {
        min = guess + 1
        guess = randomInteger(min, max)
        firstGuess = await ask('\nIs it...' + guess + '?' + " Yes, or No: ")
        guessCount += 1;
      }
      //Took all possible responses to 'low' and built an array similar to above.  guess - 1 will decrease there max number, which in return makes the pool of possible out comes smaller. guessCount here adds a value to a variable.
      else if (lowResponses.includes(secondGuess)) {
        max = guess - 1
        guess = randomInteger(min, max)
        firstGuess = await ask('\nIs it...' + guess + '?' + "Yes, or No: ")
        guessCount += 1;
      }
      //if max is less then min, the player is trying to cheat
      if (max < min) {
        console.log("Cheater")
      }
      else {
        //winner, a message appears that there number was ? and then exits
        console.log("\nYour number was " + secretNumber + "!" + "\n\nI guessed it in " + guessCount + " tries")
        process.exit()
      }
    }
  }
}