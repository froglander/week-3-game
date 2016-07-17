var hangman = {
		words: [ ["Mario", "mario.png"],
				["Luigi", "luigi.png"],
				["Peach", "peach.png"],
				["Bowser", "bowser.png"],
				["Blooper", "blooper.png"], 
				["Bullet Bill", "bullet_bill.png"], 
				["Buzzy Beetle", "buzzy_beetle.png"],
				["Chain Chomp", "chain_chomp.png"],
				["Dry Bones", "dry_bones.png"],
				["Goomba", "goomba.png"],
				["Hammer Brothers", "hammer_brothers.png"],
				["Koopa Troopa", "koopa_troopa.png"],
				["Magikoopa", "magikoopa.png"],
				["Piranha Plant", "piranha_plant.png"],
				["Spiny", "spiny.png"],
				["Thwomp", "thwomp.png"],
				["Yoshi", "yoshi.png"],
				["Larry Koopa", "larry_koopa.png"],
				["Iggy Koopa", "iggy_koopa.png"],
				["Lemmy Koopa", "lemmy_koopa.png"],
				["Ludwig von Koopa", "ludwig_von_koopa.png"],
				["Morton Koopa", "morton_koopa.png"],
				["Roy Koopa", "roy_koopa.png"],
				["Wendy O Koopa", "wendy_o_koopa.png"]
			],
		wins: 0,
		losses: 0,
		tries: 10, /* Start with 10 tries */
		currentGuess: [], /* Blank array to store current guesses */
		lettersGuessed: [], /* Blank array to store all guessed letters */
		roundArray: [], /* to store word and img src */
		roundWord: "", /* to store the random word chosen for the round */
		roundPic: "", /* to store image src */
		letterRightSound: new Audio("assets/audio/smw_coin.wav"),
		letterWrongSound: new Audio("assets/audio/smw_thud.wav"),
		winSound: new Audio("assets/audio/smw_course_clear.wav"),
		loseSound: new Audio("assets/audio/smw_lost_a_life.wav"),
		randomWord : function() {
			var x = Math.floor((Math.random() * this.words.length));
			return this.words[x];
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

			// Only process keypress if the key pressed was a letter from a to z aka keyCode 65-90
			if (event.keyCode >= 65 && event.keyCode <= 90) {
				var letterChoice = String.fromCharCode(event.keyCode);	
			} else {
				return;
			}
			
			// If letter has already been guessed, skip it			
			if (this.lettersGuessed.indexOf(letterChoice) > -1 ) return; 
			
			var that = 	this;
			var isMatch = that.checkLetter(letterChoice, this.roundWord);

			this.lettersGuessed.push(letterChoice);

			if (isMatch.length > -1) {				
				$.each(isMatch, function(i, match) {
					that.currentGuess[match] = that.roundWord[isMatch[i]];
				});				
				this.letterRightSound.play();
			} else { this.letterWrongSound.play(); }

			$("#currentWord").html(this.currentGuess);
			$("#triesLeft").html(this.tries);
			$("#lettersGuessed").html(this.lettersGuessed.toString());

			if (this.currentGuess.join("") == this.roundWord) {
				$("#gameState").html("Yay, you guessed the word!");
				this.wins++;
				$("#wins").html(this.wins);
				this.winSound.play();
				$("#lastWord").html("Good job! It was " + this.roundWord);
				$("#lastWordPic").html("<img src='assets/images/" + this.roundPic + "'/>");
				$(".showLastWord").show();
				this.gameReset();
			} else if (this.tries == 0){
				//Oh no, you lost!
				$("#gameState").html("Oh no, you lost! <br/> The word was: " + this.roundWord);
				this.losses++;
				$("#losses").html(this.losses);
				this.loseSound.play();
				$("#lastWord").html("Too bad, the word was: " + this.roundWord);
				$("#lastWordPic").html("<img src='assets/images/" + this.roundPic + "'/>");
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
			this.roundArray = this.randomWord(); 
			this.roundWord = this.roundArray[0];
			this.roundPic = this.roundArray[1];

			this.currentGuess = [];
			this.blankCurrentGuess();	
			this.tries = 10;			
			this.lettersGuessed = [];
			$("#gameState").html("");
			$("#triesLeft").html(this.tries);
			$("#lettersGuessed").html(this.lettersGuessed.toString());			
		}
	}
	hangman.roundArray = hangman.randomWord(); 
	hangman.roundWord = hangman.roundArray[0];
	hangman.roundPic = hangman.roundArray[1];
	hangman.blankCurrentGuess();
	$("#triesLeft").html(hangman.tries);
	$("#wins").html(hangman.wins);
	$("#losses").html(hangman.losses);


	// Courtesy of Dwight so it would work after I moved playRound into my object
	$(document).on("keyup", hangman.playRound.bind(hangman));