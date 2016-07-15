var hangman = {
		word: ["Mario", "Luigi", "Peach", "Bowser", "Blooper", "Bullet Bill", "Buzzy Beetle", "Chain Chomp", "Dry Bones", "Goomba", "Hammer Brothers", "Koopa Troopa", "Lakitu", "Magikoopa", "Piranha Plant", "Spiny", "Thwomp"],
		wins: 0,
		tries: 10, /* Start with 10 tries */
		currentGuess: [], /* Blank array to store curent guesses */
		roundWord: "", /* to store the random word chosen for the round */
		randomWord : function() {
			var x = Math.floor((Math.random() * this.word.length));
			return this.word[x];
		},
		displayWord: function(word) {
			document.getElementById('showWord').innerHTML = word;
		},
		checkLetter: function(letter, word) {
			word = word.toLowerCase();
			letter = letter.toLowerCase();
			// Check if letter that is passed matches a letter in word
			// If found, push index to found array to return to calling
			// function
			var found = [];
			for (var i = 0; i < word.length; i++) {
				if (word[i] === letter) {
					found.push(i);
				}
			}
			// If there were any letters found, return found
			// Otherwise decrement tries and return -1
			if (found.length > 0) {
				return found;
			} else {
				this.tries--;
				return -1;
			}

		},
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
				$("#wins").html("Yay, you guessed the word!");
			} else {
				$("#wins").html("Keep guessing!");
			}

		}
	}

	// function playRound( event ) {
	// 	var letterChoice = String.fromCharCode(event.keyCode);		
	// 	var isMatch = hangman.checkLetter(letterChoice, roundWord);
		
	// 	if (isMatch.length > -1) {
	// 		console.log(isMatch);
	// 		$.each(isMatch, function(i, match) {
	// 			hangman.currentGuess[match] = roundWord[isMatch[i]];
	// 		});
	// 	} 
	// 	$("#gameState").html(hangman.currentGuess);
	// 	$("#triesLeft").html(hangman.tries);


	// 	if (hangman.currentGuess.join("") == roundWord) {
	// 		$("#wins").html("Yay, you guessed the word!");
	// 	} else {
	// 		$("#wins").html("Keep guessing!");
	// 	}

	// }

	
  
	hangman.roundWord = hangman.randomWord();	
	// Fill currentGuess string array with placeholder - for the number
	// of letters in the random word selected
	for (var i = 0; i < hangman.roundWord.length; i++) {
		if(hangman.roundWord[i] == " ") {
			hangman.currentGuess.push(" ");	
		} else {
			hangman.currentGuess.push("-");
		}			
	}	
	//console.log(hangman.currentGuess);
	
//	$(document).on("keyup", hangman.playRound);
$(document).on("keyup", hangman.playRound.bind(hangman));