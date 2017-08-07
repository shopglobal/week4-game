
// 4. add the 'No enemy here' text when attack button is clicked
// 6. figure out how to implement the  'wounded' piece
// -Look at changing the font to more readable
// Add bootstrap class to change the hover state of characters
// makeimg bigger to strecth entire character and make text white





// Improvements to make
// Update the images to not show the background colors and spread across entire div
// change text color to white and bold and then overlay over the image
// change the positioning so that it flows better


// Overall game is stored in object
// game play object houses all functions  and additional variables of the game
function reset() {
	window.gameObj = {
		// intializing the attack button to false. will set it to true later on
		attackOccurred: false,
		winOccurred: false,
		lossOccurred: false,
		wounded: false,
		gameOver: false,
		MatrixMaster: false,
		characterArrayList: [
	    // 1.  An array or object of possible characters properties would incldue 
	    // name, picture, Health Points, Attack Power and counter attack power

	    {
	        name: 'Neo',
	        visual: 'assets/images/neo.jpg',
	        healthPoints: 190, 
	        attackPower: 28,
	        counterAttackPower: 26,
	    },
	    {
	        name: 'Morpheus',
	        visual: 'assets/images/morpheus.jpg', 
	        healthPoints: 170,
	        attackPower: 20,
	        counterAttackPower: 30,
	    },
	    {
	        name: 'Trinity',
	        visual: 'assets/images/trinity.jpg',
	        healthPoints: 190, 
	        attackPower: 15,
	        counterAttackPower: 18,
	    },
	    {
	        name: 'Agent Smith',
	        visual: 'assets/images/smith.jpg',
	        healthPoints: 190,
	        attackPower: 20,
	        counterAttackPower: 25,
	    },
	    {
	        name: 'The Oracle',
	        visual: 'assets/images/oracle.jpg',
	        healthPoints: 110,
	        attackPower: 15,
	        counterAttackPower: 20,
	    },
	   	{
	        name: 'Keymaker',
	        visual: 'assets/images/keymaker.jpg',
	        healthPoints: 100,
	        attackPower: 15,
	        counterAttackPower: 24,
	    }
	    //    {
	    //     name: 'Make another character',
	    //     visual: 'assets/images/photo.jpg',
	    //     healthPoints: 120, 
	    //     attackPower: 10, 
	    //     counterAttackPower: 24,
	    // 	},
	    //  {
	    //     name: 'Next character',
	    //     visual: 'assets/images/photo.jpg',
	    //     healthPoints: 90,
	    //     attackPower: 25,
	    //     counterAttackPower: 26,
	    // }
		],
		// Initializes game start true
		gameStart: true,
		// initializes your character to nothing
		yourFighter: null,
		// initializes enemy selection to nothing
		currentEnemy: null,
		// initializs your blank array of previously fought enemies. might just remove all together
		previouslyFought: [],
		// sets current attack power to null
		yourCurrentAttackPower: null,
		winOccurred: false,

	// // create an array of battle sounds
	// 	battleSoundsArray: ['assets/audio/sounds.mp3', 'assets/audio/sounds2.mp3', 'assets/audio/sounds3.mp3', 'assets/audio/sounds4.mp3', 'assets/audio/sounds5.mp3', 'assets/audio/sounds6.mp3', 'assets/audio/sounds7.mp3', 'assets/audio/external.mp3', 'assets/audio/external2.mp3','assets/audio/external3.mp3','assets/audio/external4.mp3','assets/audio/external5.mp3','assets/audio/external6.mp3', 'assets/audio/moves.mp3','assets/audio/moves2.mp3', ],
	// 	characherSelectSound: 'assets/audio/noise.mp3',

	// // picks at random battle sound when the attack button is pressed
	// 	battleSoundPick: function() {
	//         return this.battleSoundsArray[Math.floor(Math.random() * this.battleSoundsArray.length)];
	//     },

	}
};


// STAGE 1: Initial Setup/ Display
$(document).ready(function() {
	reset();
	// gets the link for the theme song to be played in the background
	 var musicElement = document.createElement('audio');
	 musicElement.autoplay = true;
	 musicElement.loop = true;
     musicElement.setAttribute('src', 'assets/audio/matrix.mp3');

     // displays the modal
  	$('#myModal').modal('show');

	function render() {
		// setting variables set to id tags with html elements for easy reference later
		// using the $ before variables indicates that they are jQuery objects, it doesn't affect perfermance of the variables
		var $playerList = $('#fighterList');
		var $enemyList = $('#enemyList');
		var $yourFighter = $('#yourFighter');
		var $attackText = $('#attackText');
		var $yourEnemy = $('#yourEnemy');
		var $winText = $('#attackText');
		var $lossText = $('#attackText');
		// var $wounded = $('#attackText');
		var $gameOver = $('#gameOver');
		var $MatrixText = $('#attackText');
		
		// using underscore.js to create templates that are dynamically updated
		var $charTemplate = _.template($('#characterTmpl').html());
		var $attackTemplate = _.template($('#attackTmpl').html());
		var $winTemplate = _.template($('#winTmpl').html());
		var $lossTemplate = _.template($('#lossTmpl').html());
		var $MatrixTemplate = _.template($('#MatrixTmpl').html());
		// var $woundTemplate = 

		// Haven't selected Character
		var charHtml = "";
		$yourFighter.html("");
		$yourEnemy.html("");
		$attackText.html("");
		$gameOver.html("");

		// using a ternary operator to give true or false to the background color choice
		var listBg = gameObj.yourFighter ? "bg-black" : "bg-white";
		// Sets the initial screen with characters to select from
		gameObj.characterArrayList.forEach(function(character, index) {
			charHtml = charHtml + $charTemplate({index: index, background: listBg, character: character});
		});
		if (gameObj.yourFighter) {
			$yourFighter.html($charTemplate({index: 0, background: 'bg-white', character: gameObj.yourFighter}));
			// re-write in jQuery
			$enemyList.html(charHtml);
			$playerList.html("");

		} else {
			$playerList.html(charHtml);
			$enemyList.html("");
		}
		if (gameObj.currentEnemy) {
			$yourEnemy.html($charTemplate({index: 0, background: 'bg-red', character: gameObj.currentEnemy}));
		}
		if (gameObj.attackOccurred) {
			$attackText.html($attackTemplate({gameObj: gameObj}));
		}
		// added
		if (gameObj.winOccurred) {
			
		   	// Displays the win text 
			$winText.html($winTemplate({lastOpponent: gameObj.lastOpponent}));
			// Removes the enemy character after you win.
			$('#yourEnemy').empty(gameObj.currentEnemy);
		}

		if (gameObj.lossOccurred) {
			// Displays loss text
			$lossText.html($lossTemplate({gameObj: gameObj}));
		}
		// This runs when the enemy is wounded (hp less than zero)
		if (gameObj.wounded){
			$('#attackText').html("You are seriously wounded. GAME OVER!");
		}
		// This runs if the user losses
		if (gameObj.gameOver) {
			// creates the reset button to start the game over
			var b = $('<button>');
			b.addClass('btn-primary waves-effect waves-light btn-lg');
			b.html('Battle Again!');
			reset();

			b.click(render);
			$('#gameOver').append(b);

		}
		if (gameObj.MatrixMaster) {
			// Displays final text 
			$MatrixText.html($MatrixTemplate({lastOpponent: gameObj.lastOpponent}));
			$('#yourEnemy').empty(gameObj.currentEnemy);
			// creates the reset button to start the game over
			var b = $('<button>');
			b.addClass('btn-primary waves-effect waves-light btn-lg');
			b.html('Battle Again!');
			reset();

			b.click(render);
			$('#gameOver').append(b);
			
		}

    }

    //STAGE 2: Selecting your character 
    $('#fighterList').on('click', '.characterContainer', function(e) {
    	// pause current audio to allow for battle sounds
    	// musicElement.pause();
		// TODO: set the AUDIO to saberon.mp3

    	// references the fighterList
    	var element = $(this);
    	var charIndex = element.data('character-index');
    	// your character was initially set as null so when your character != null this if runs
    	if (!gameObj.yourFighter) {
    		// pushes your object selection into yourFighter array
    		gameObj.yourFighter = gameObj.characterArrayList.splice(charIndex, 1)[0];
    		// setting initial attack power to the value within the master object
    		gameObj.yourCurrentAttackPower = gameObj.yourFighter.attackPower;
    	}   
    	// This renders and updates all of the html elements 
    	render();
    	// adds a sound to selecting character
    	var $audioCharacter = document.createElement('audio');
                    $audioCharacter.setAttribute('src', gameObj.characherSelectSound);
                    $audioCharacter.play();
    });

    // STAGE 3: select your enemy
    $('#enemyList').on('click', '.characterContainer', function(e) {
    	var element = $(this);
    	var charIndex = element.data('character-index');
    	// current enemy was initially set as null so when your enemy != this if runs 
		if (!gameObj.currentEnemy) {
			// creates an array that houses the enemy character
			gameObj.winOccurred = false;
			// sets the attack button to false ensuring the attack text is not displayed when selecting a new character and only after 
			// ...click attack
			gameObj.attackOccurred = false;
    		gameObj.currentEnemy = gameObj.characterArrayList.splice(charIndex, 1)[0];
    	}
    	// This renders and updates all of the html elements 
    	render();
    	// adds a sound to selecting character
    	var $audioCharacter = document.createElement('audio');
                    $audioCharacter.setAttribute('src', gameObj.characherSelectSound);
                    $audioCharacter.play();
    });

    // STAGE 4: GAME PLAY. Click on ATTACK

    $('#attackBtn').on('click', function(e) {
    	// this ensure you cannot click any other characters again
    	if (!gameObj.yourFighter || !gameObj.currentEnemy) {
    		$('#attackText').html('No enemy here, select an emeny to fight.')
    		return;
    	}
    	
    	gameObj.attackOccurred = true;
    	
    	// declaring new variables
    	var yourFighter = gameObj.yourFighter;
    	var currentEnemy = gameObj.currentEnemy;
    	//increment yourAttackPower by yourFighter.attackPower
    	gameObj.yourCurrentAttackPower  = gameObj.yourCurrentAttackPower + yourFighter.attackPower;
		//decrease enemy health points by yourAttackPower state
    	currentEnemy.healthPoints = currentEnemy.healthPoints - gameObj.yourCurrentAttackPower; 
    	//decrease your health points by enemy's counterAttackPower
    	yourFighter.healthPoints = yourFighter.healthPoints - currentEnemy.counterAttackPower;
    	console.log ("enenemy health points: " + currentEnemy.healthPoints + ' your health: ' + yourFighter.healthPoints);

    	// var $audioBattle = document.createElement('audio');
     //                $audioBattle.setAttribute('src', gameObj.battleSoundPick());
     //                $audioBattle.play();
                    


    	
    	// Win scenario
    	// set win variable  and loss in order to consolidate win ifs. 
    	var win = (currentEnemy.healthPoints < 1 && yourFighter.healthPoints > 1 || 
    				((yourFighter.healthPoints < 1 && currentEnemy.healthPoints < 1) && 
    				(yourFighter.healthPoints > currentEnemy.healthPoints))
    			  ) ? true : false;

    	var loss = (yourFighter.healthPoints < 1 && currentEnemy.healthPoints > 1 || 
    				((yourFighter.healthPoints < 1 && currentEnemy.healthPoints < 1) && 
    					(yourFighter.healthPoints < currentEnemy.healthPoints))
    			   ) ? true: false;


    
    	// First if is only if user has defeated all of the enemies    	
    	if (win) { 
    		
    		console.log('healthPoints of enemy should be equal great than or eqaul to 0: ' + currentEnemy.healthPoints);
			if (gameObj.characterArrayList.length > 0){
				console.log(gameObj.characterArrayList.length);
				gameObj.winOccurred = true;

				// need to be able to select another enemy
				gameObj.lastOpponent = gameObj.currentEnemy;
				gameObj.currentEnemy = null;
				// need to figure out how to show another error when your character points are less 0. Show error "you are seriously wounded. GAME OVER"
					// if (yourFighter.healthPoints =< 0) {
					// 	gameObj.wounded = true;
					// 	// gameObj.winOccurred = false;

					// }
	 		
			}  
			// scenario when you have defeated all characters
			else if (gameObj.characterArrayList.length == 0){

				console.log('Final Matrix Portion ' + gameObj.characterArrayList.length);
				gameObj.lastOpponent = gameObj.currentEnemy;
				gameObj.attackOccurred = false; 
				gameObj.MatrixMaster = true;

			}  
				
	    	
    	}
    	 // Loss Scenario

    	else if (loss) {
    		gameObj.lossOccurred = true;
    		console.log('Entered the loss occurred section');
    		gameObj.attackOccurred = false; 
    		gameObj.gameOver = true; 
    		
    	}
    	render();

    });

			

    render();

});




