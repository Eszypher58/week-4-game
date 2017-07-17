$(document).ready(function() {

	//setting up the necessary variables
	var fightImgUrlArray = ["assets/images/blastoise.jpg", "assets/images/charizard.jpg", "assets/images/pidgeot.jpg", "assets/images/venusaur.jpg"];
	var fighterNameArray = ["blastoise", "charizard", "pidgeot", "venusaur"];
	var opponentNameArray = [];
	var isPlaying = false;
	var isDefeated = false;
	var player = null;
	var opponent = null;
	var originalPage = $("body").html(); //might have better wy to do this

	//hide some elements
	$("#attack").hide();
	$("#restart").hide();
	$("#yourFighter").hide();
	$("#currFighting").hide();
	$("#opponentList").hide();

	//this function resets the entire game to the initial state
	function reset() {

		$("body").html(originalPage);

		fightImgUrlArray = ["assets/images/blastoise.jpg", "assets/images/charizard.jpg", "assets/images/pidgeot.jpg", "assets/images/venusaur.jpg"];
		fighterNameArray = ["blastoise", "charizard", "pidgeot", "venusaur"];
		opponentNameArray = [];
		isPlaying = false;
		isDefeated = false;
		player = null;
		opponent = null;
		//playerAttack = 0;

		blastoiseObj = new Fighter("Blastoise", 170, 8, 5, fightImgUrlArray[0]);
		charizardObj = new Fighter("Charizard", 100, 6, 5, fightImgUrlArray[1]);
		pidgeotObj = new Fighter("Pidgeot", 150, 7, 20, fightImgUrlArray[2]);
		venusaurObj = new Fighter("Venusaur", 180, 8, 25, fightImgUrlArray[3]);

		fighterObj = {

			blastoise: blastoiseObj,
			charizard: charizardObj,
			pidgeot: pidgeotObj,
			venusaur: venusaurObj,

		};

		//setup fighter's name display
		$("#charOneName").html(fighterObj.blastoise.name);
		$("#charTwoName").html(fighterObj.charizard.name);
		$("#charThreeName").html(fighterObj.pidgeot.name);
		$("#charFourName").html(fighterObj.venusaur.name);

		//setup fighter's HP display
		$("#charOneHP").html("HP: " + fighterObj.blastoise.hp);
		$("#charTwoHP").html("HP: " + fighterObj.charizard.hp);
		$("#charThreeHP").html("HP: " + fighterObj.pidgeot.hp);
		$("#charFourHP").html("HP: " + fighterObj.venusaur.hp);

		//hide elements not used in initial state
		$("#attack").hide();
		$("#restart").hide();
		$("#yourFighter").hide();
		$("#currFighting").hide();
		$("#opponentList").hide();

	}


	//create object prototype for char
	function Fighter(charName, charHp, attackPoint, counterAttackPoint, imgUrl) {

		this.name = charName;
		this.hp = charHp;
		this.attack = attackPoint;
		this.baseAttack = attackPoint;
		this.counter = counterAttackPoint;
		this.imageUrl = imgUrl;

	}

	//instantiate char1,2,3,4
	var blastoiseObj = new Fighter("Blastoise", 170, 8, 5, fightImgUrlArray[0]);
	var charizardObj = new Fighter("Charizard", 100, 6, 5, fightImgUrlArray[1]);
	var pidgeotObj = new Fighter("Pidgeot", 150, 7, 20, fightImgUrlArray[2]);
	var venusaurObj = new Fighter("Venusaur", 180, 8, 25, fightImgUrlArray[3]);

	//place fighter object in another object for retrieval/processing
	fighterObj = {

		blastoise: blastoiseObj,
		charizard: charizardObj,
		pidgeot: pidgeotObj,
		venusaur: venusaurObj,

	};

	//setup fighter's name display
	$("#charOneName").html(fighterObj.blastoise.name);
	$("#charTwoName").html(fighterObj.charizard.name);
	$("#charThreeName").html(fighterObj.pidgeot.name);
	$("#charFourName").html(fighterObj.venusaur.name);

	//setup fighter's HP display
	$("#charOneHP").html("HP: " + fighterObj.blastoise.hp);
	$("#charTwoHP").html("HP: " + fighterObj.charizard.hp);
	$("#charThreeHP").html("HP: " + fighterObj.pidgeot.hp);
	$("#charFourHP").html("HP: " + fighterObj.venusaur.hp);

	//when a fighter is selected, move the selected fighter to #yourFighter section and the remainder to #opponetList section
	$(".fighter").click(function(){

		var selectedName = $(this).attr("id");

		movePlayer(selectedName, "#yourFighter");
		displayNameHP(selectedName, "#yourFighter");

		//set player to be th object that was selected
		player = fighterObj[selectedName];
		//playerAttack = player.attack;

		console.log("player is: " + player);

		moveOpponet(selectedName);

		//remove the selection screen/instruction
		eraseRow("#fighterRow1");
		eraseRow("#fighterRow2");

		//show the necessary elements for the game to run
		$("#yourFighter").show();
		$("#currFighting").show();
		$("#opponentList").show();

	});

	//create the iamge and append it to the parameter named id
	function movePlayer(charId, id) {

			var img = $("<img>");
			img.attr("src", fighterObj[charId].imageUrl);
			img.attr("class", "fighter");
			img.attr("id", charId);
			$(id).first().append(img);

	}

	//create name and HP right underneath fighter img
	function displayNameHP(stringName, appendTo) {

		var p = $("<p>");
		p.html(fighterObj[stringName].name);
		p.attr("id", "charName" + stringName);
		$(appendTo).first().append(p);
		p = $("<p>");
		p.html("HP: " + fighterObj[stringName].hp);
		p.attr("id", "charHP" + stringName);
		$(appendTo).first().append(p);
		//player = fighterObj[stringName];

	} 

	//move the unselected fighters to #opponentList
	function moveOpponet(objName) {
		
		//make copy of fighterNameArray, find the element to be removed
		var tempArray = fighterNameArray.slice();
		var index = tempArray.indexOf(objName);

		//reove the element
		if (index > -1) {

			tempArray.splice(index, 1);

		}

		//create a list of oponent names
		opponentNameArray = tempArray;

		//move the fighters to the correct place inside #opponentList
		var element = $("#opponentList div");
		
		for (var i = 0; i < tempArray.length; i++) {

			if (tempArray[i] !== objName) {

				movePlayer(tempArray[i], element);

				displayNameHP(tempArray[i], element);			

			};

			element = element.next();
	
		};

		$("#attack").show();

	};

	//Used to remove the fighter selection rows
	function eraseRow(idRow) {

		$(idRow).html("");

	}

	//When opponent inside #opponentList is clicked, move that fighter to #currFighting
	$(".opponent").click(function(){

		//if a round is already underway, dont do anything, otherwise, move fighter and start round by setting isPlayng to true
		if (!isPlaying) {

			var selectedName = $(this).children().attr("id");
			
			
			movePlayer(selectedName, "#currFighting");
			displayNameHP(selectedName, "#currFighting");
			updateDefender(selectedName);

			//remove the fighter from #opponentList
			$(this).html("");

		}

		isPlaying = true;

	});

	//remove a fighter from opponentNameArray and set opponent to the removed fighter
	function updateDefender(objName){

		var index = opponentNameArray.indexOf(objName);

		if (index > -1) {

			opponentNameArray.splice(index, 1);
			
		};

		opponent = fighterObj[objName];

	};

	//main meat of the program. Handle logic of the game when attack button is clicked
	$("#attack").click(function(){

		// When attack button is clicked, check if the game is playing and the player is still alive
		if (isPlaying && !isDefeated) {
			
			//update HP to reflect the attack
			updateHP(player, opponent);
			
			//display fighter action
			displayResultText(player, opponent);

			//update player attack power as per requirement
			updateAttack(player);

			//check if a round has ended
			if (checkRoundEnd(player,opponent)) {

				//if opponent is still alive at game end, player is defeated, and this case is handled by displayTextResult
				if (opponent.hp >= 0) {

				} else {
					
					//remove the currFIghter, so user can select a new one.
					removeOpponent();

					//When all opponent are removed, declare win and show reset button. This case handles when user defeats all opponents for the frist time.
					if (opponentNameArray.length === 0) {

						$("#resultOne").html("You have vanquished all foes!");
						$("#resultTwo").html("Press reset to start over...");

						$("#restart").show();

					}

				}

			}


		}  else {

			//This case handles if user click on attack button at the end of the game. When user isnt playing (isPlaying = false), but is not deeated, and user keeps on clicking attack button
			if (opponentNameArray.length === 0) {

				$("#resultOne").html("You have vanquished all foes!");
				$("#resultTwo").html("Press reset to start over...");
				$("#restart").show();

			} else if (isDefeated) {
				//if defeated, dont do anything, this case is taken care of by displayResultText
			} else {
				//tell the player to select an opponent
				$("#resultOne").html("There is no one to fight!");
				$("#resultTwo").html("Pick an opponent");

			}
		}

	});

	//display text of three kind. 
	//1st: player defeated.
	//2nd: player win, but has more opponent to fight
	//3rd: attack process
	function displayResultText(playerObj, opponentObj) {

		var lineOne;
		var lineTwo;

		console.log("player HP:" + playerObj.hp);
		console.log("opp HP:" + opponentObj.hp);

		if(playerObj.hp <= 0) {

			lineOne = "You have been defeated!!!"
			lineTwo = "select reset to start over..."
			isDefeated = true;
			$("#restart").show();

		} else if (opponentObj.hp <= 0 ) {

			lineOne = "Congratulation! You have defeated your enemy!!!"
			lineTwo = "Choose the next opponent."
			isPlaying = false;

		} else {

			lineOne = playerObj.name + " attacks " + opponentObj.name + " for " + playerObj.attack + " damage.";

			lineTwo = opponentObj.name + " counter attacks " + playerObj.name + " for " + opponentObj.counter + " damage.";

		}

		$("#resultOne").html(lineOne);
		$("#resultTwo").html(lineTwo);

	}

	//update player and opponent HP
	function updateHP(playerObj, opponentObj) {

		var playerHPSelector = "#charHP" + playerObj.name.toLowerCase();
		var opponentHPSelector = "#charHP" + opponentObj.name.toLowerCase();

		opponentObj.hp = opponentObj.hp - playerObj.attack;
		playerObj.hp = playerObj.hp - opponentObj.counter;

		$(playerHPSelector).html(playerObj.hp);
		$(opponentHPSelector).html(opponentObj.hp);

	}

	//update Player's attack power
	function updateAttack(playerObj) {

		playerObj.attack = playerObj.attack + playerObj.baseAttack;

	}

	//check if the round has ended
	function checkRoundEnd(playerObj, opponentObj) {

		if(playerObj.hp <= 0 || opponentObj.hp <=0) {

			return true;

		} else {

			return false;

		}

	}

	//remove opponent from #currFghting section
	function removeOpponent() {

		$("#currFighting").html("");
		$("#currFighting").html("<p>Defender</p>");

	}

	//restarts the entire game
	$("#restart").click(function(){

		console.log("clicked on reset");
		reset();


	})

});