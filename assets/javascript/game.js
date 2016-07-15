var hangman = {
		word: ["Mario", "Luigi", "Peach", "Bowser", "Blooper", "Bullet Bill", "Buzzy Beetle", "Chain Chomp", "Dry Bones", "Goomba", "Hammer Brothers", "Koopa Troopa", "Lakitu", "Magikoopa", "Piranha Plant", "Spiny", "Thwomp"],
		wins: 0,
		losses: 0,
		tries: 10, /* Start with 10 tries */
		currentGuess: [], /* Blank array to store current guesses */
		roundWord: "", /* to store the random word chosen for the round */
		randomWord : function() {
			var x = Math.floor((Math.random() * this.word.length));
			return this.word[x];
		},
		displayWord: function(word) {
			document.getElementById('showWord').innerHTML = word;
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
			var letterChoice = String.fromCharCode(event.keyCode);	
			var that = 	this;
			var isMatch = that.checkLetter(letterChoice, this.roundWord);
			
			if (isMatch.length > -1) {				
				$.each(isMatch, function(i, match) {
					that.currentGuess[match] = that.roundWord[isMatch[i]];
				});
			} 
			$("#gameState").html(this.currentGuess);
			$("#triesLeft").html(this.tries);


			if (this.currentGuess.join("") == this.roundWord) {
				$("#currentStatus").html("Yay, you guessed the word!");
				this.wins++;
				$("#wins").html("You have won " + this.wins + " games");
				// call reset
			} else if (this.tries == 0){
				//Oh no, you lost!
				$("#currentStatus").html("Oh no, you lost!");
				this.losses++;
				// call reset
			} else {
				$("#currentStatus").html("Keep guessing!");
			}
		}
	}

	hangman.roundWord = hangman.randomWord();	
	hangman.blankCurrentGuess();

	// Courtesy of Dwight so it would work after I moved playRound into my object
	$(document).on("keyup", hangman.playRound.bind(hangman));