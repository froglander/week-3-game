var hangman = {
		word: ["Mario", "Luigi", "Peach", "Bowser", "Blooper", "Bullet Bill", "Buzzy Beetle", "Chain Chomp", "Dry Bones", "Goomba", "Hammer Brothers", "Koopa Troopa", "Lakitu", "Magikoopa", "Piranha Plant", "Spiny", "Thwomp", "Yoshi"],
		wins: 0,
		losses: 0,
		tries: 10, /* Start with 10 tries */
		currentGuess: [], /* Blank array to store current guesses */
		lettersGuessed: [], /* Blank array to store all guessed letters */
		roundWord: "", /* to store the random word chosen for the round */
		randomWord : function() {
			var x = Math.floor((Math.random() * this.word.length));
			return this.word[x];
		},		
		/* **************************************************************** */
		/*	Fill the currentGuess string array with a placeholder character	*/
		/*	for the number of letters in the random word selected including	*/
		/*	spaces															*/
		/* **************************************************************** */
		blankCurrentGuess: function() {
			for (var i = 0; i < this.roundWord.length; i++) {
				if(this.roundWord[i] == " ") {
					this.currentGuess.push(" ");	
				} else {
					this.currentGuess.push("-");
				}			
			}
			$("#currentWord").html(this.currentGuess);	
		},		
		/* **************************************************************** */
		/*	Check if letter that is passed matches a letter in word 		*/
		/*	If found, push index to found array to return to calling		*/
		/*	function, otherwise return -1 and decrement tries				*/
		/* **************************************************************** */
		checkLetter: function(letter, word) {
			word = word.toLowerCase();
			letter = letter.toLowerCase();
			
			var found = [];
			for (var i = 0; i < word.length; i++) {
				if (word[i] === letter) {
					found.push(i);
				}
			}
			if (found.length > 0) {
				return found;
			} else {
				this.tries--;
				return -1;
			}
		},
		/* **************************************************************** */
		/*	Play a single round 											*/
		/*	Capture user's keypress and call isMatch function to see if the	*/
		/* 	key pressed is in the word.  If so, update the currentGuess 	*/
		/* 	string, the number of tries remaining and check if they have 	*/
		/*	won or lost the game 											*/
		/* **************************************************************** */
		playRound: function( event ) {
			$(".showLastWord").hide();
			var letterChoice = String.fromCharCode(event.keyCode);	

			// If letter has already been guessed, skip it			
			if (this.lettersGuessed.indexOf(letterChoice) > -1 ) return; 
			
			var that = 	this;
			var isMatch = that.checkLetter(letterChoice, this.roundWord);

			this.lettersGuessed.push(letterChoice);

			if (isMatch.length > -1) {				
				$.each(isMatch, function(i, match) {
					that.currentGuess[match] = that.roundWord[isMatch[i]];
				});
			} 
			$("#currentWord").html(this.currentGuess);
			$("#triesLeft").html(this.tries);
			$("#lettersGuessed").html(this.lettersGuessed.toString());

			if (this.currentGuess.join("") == this.roundWord) {
				$("#gameState").html("Yay, you guessed the word!");
				this.wins++;
				$("#wins").html(this.wins);
				$("#lastWord").html(this.roundWord);
				$(".showLastWord").show();
				this.gameReset();
			} else if (this.tries == 0){
				//Oh no, you lost!
				$("#gameState").html("Oh no, you lost! <br/> The word was: " + this.roundWord);
				this.losses++;
				$("#losses").html(this.losses);
				$("#lastWord").html(this.roundWord);
				$(".showLastWord").show();
				this.gameReset();
			} else {
				$("#gameState").html("Keep guessing!");
			}
		},
		/* **************************************************************** */
		/* Reset function to get a new word and reset to blank guesses		*/
		/* **************************************************************** */
		gameReset: function() {
			this.roundWord = this.randomWord();
			this.currentGuess = [];
			this.blankCurrentGuess();	
			this.tries = 10;			
			this.lettersGuessed = [];
			$("#gameState").html("");
			$("#triesLeft").html(this.tries);
			$("#lettersGuessed").html(this.lettersGuessed.toString());			
		}
	}

	hangman.roundWord = hangman.randomWord();	
	hangman.blankCurrentGuess();
	$("#triesLeft").html(hangman.tries);
	$("#wins").html(hangman.wins);
	$("#losses").html(hangman.losses);


	// Courtesy of Dwight so it would work after I moved playRound into my object
	$(document).on("keyup", hangman.playRound.bind(hangman));