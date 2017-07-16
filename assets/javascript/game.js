$(document).ready(function() {

	var fightImgUrlArray = ["assets/images/blastoise.jpg", "assets/images/charizard.jpg", "assets/images/pidgeot.jpg", "assets/images/venusaur.jpg"];
	var fighterNameArray = ["blastoise", "charizard", "pidgeot", "venusaur"];
	var opponentNameArray = [];
	var isPlaying = false;
	var player = null;
	var opponent = null;
	var playerAttack = 0;
	var originalPage = $("body").html();
	//console.log(originalPage);

	//$(".opponent").hide();
	//$(".defender").hide();


	function reset() {

		$("body").html(originalPage);

		fightImgUrlArray = ["assets/images/blastoise.jpg", "assets/images/charizard.jpg", "assets/images/pidgeot.jpg", "assets/images/venusaur.jpg"];
		fighterNameArray = ["blastoise", "charizard", "pidgeot", "venusaur"];
		opponentNameArray = [];
		isPlaying = false;
		player = null;
		opponent = null;
		playerAttack = 0;

		blastoiseObj = new Fighter("Blastoise", 100, 5, 5, fightImgUrlArray[0]);
		charizardObj = new Fighter("Charizard", 110, 6, 6, fightImgUrlArray[1]);
		pidgeotObj = new Fighter("Pidgeot", 120, 7, 7, fightImgUrlArray[2]);
		venusaurObj = new Fighter("Venusaur", 130, 8, 8, fightImgUrlArray[3]);

	//testing
	//console.log(blastoiseObj.hp);
	//console.log(charizardObj.hp);
	//console.log(pidgeotObj.hp);
	//console.log(venusaurObj.hp);

		fighterObj = {

			blastoise: blastoiseObj,
			charizard: charizardObj,
			pidgeot: pidgeotObj,
			venusaur: venusaurObj,

		};

		$("#charOneName").html(fighterObj.blastoise.name);
		$("#charTwoName").html(fighterObj.charizard.name);
		$("#charThreeName").html(fighterObj.pidgeot.name);
		$("#charFourName").html(fighterObj.venusaur.name);

		$("#charOneHP").html("HP: " + fighterObj.blastoise.hp);
		$("#charTwoHP").html("HP: " + fighterObj.charizard.hp);
		$("#charThreeHP").html("HP: " + fighterObj.pidgeot.hp);
		$("#charFourHP").html("HP: " + fighterObj.venusaur.hp);

	}


	//create object prototype for char
	function Fighter(charName, charHp, attackPoint, counterAttackPoint, imgUrl) {

		this.name = charName;
		this.hp = charHp;
		this.attack = attackPoint;
		this.baseAttack = attackPoint;
		this.counter = counterAttackPoint;
		this.imageUrl = imgUrl;
		//this.player = false;

	}

	//instantiate char1,2,3,4
	var blastoiseObj = new Fighter("Blastoise", 100, 5, 5, fightImgUrlArray[0]);
	var charizardObj = new Fighter("Charizard", 110, 6, 6, fightImgUrlArray[1]);
	var pidgeotObj = new Fighter("Pidgeot", 120, 7, 7, fightImgUrlArray[2]);
	var venusaurObj = new Fighter("Venusaur", 130, 8, 8, fightImgUrlArray[3]);

	//testing
	//console.log(blastoiseObj.hp);
	//console.log(charizardObj.hp);
	//console.log(pidgeotObj.hp);
	//console.log(venusaurObj.hp);

	fighterObj = {

		blastoise: blastoiseObj,
		charizard: charizardObj,
		pidgeot: pidgeotObj,
		venusaur: venusaurObj,

	};

	$("#charOneName").html(fighterObj.blastoise.name);
	$("#charTwoName").html(fighterObj.charizard.name);
	$("#charThreeName").html(fighterObj.pidgeot.name);
	$("#charFourName").html(fighterObj.venusaur.name);

	$("#charOneHP").html("HP: " + fighterObj.blastoise.hp);
	$("#charTwoHP").html("HP: " + fighterObj.charizard.hp);
	$("#charThreeHP").html("HP: " + fighterObj.pidgeot.hp);
	$("#charFourHP").html("HP: " + fighterObj.venusaur.hp);

	$(".fighter").click(function(){

		//console.log($(this).attr("id"));
		var selectedName = $(this).attr("id");
		//console.log(temp);
		//console.log(fighterObj[temp].imageUrl);

		//moved elected pokemon to your fighter
		/*
		var img = $("<img>");
		img.attr("src", fighterObj[selectedName].imageUrl);
		img.attr("class", "fighter");
		$("#yourFighter").append(img);
		*/

		movePlayer(selectedName, "#yourFighter");

		displayNameHP(selectedName, "#yourFighter");

		player = fighterObj[selectedName];
		playerAttack = player.attack;
		console.log("player is: " + player);

		//console.log(fight)
		moveOpponet(selectedName);

		eraseRow("#fighterRow1");
		eraseRow("#fighterRow2");

	});

	function movePlayer(charId, id) {

			var img = $("<img>");
			img.attr("src", fighterObj[charId].imageUrl);
			img.attr("class", "fighter");
			img.attr("id", charId);
			$(id).first().append(img);

	}


	function displayNameHP(stringName, appendTo) {

		var p = $("<p>");
		p.html(stringName);
		p.attr("id", "charName" + stringName);
		$(appendTo).first().append(p);
		p = $("<p>");
		p.html("HP: " + fighterObj[stringName].hp);
		p.attr("id", "charHP" + stringName);
		$(appendTo).first().append(p);
		//player = fighterObj[stringName];

	} 

	function moveOpponet(objName) {
		
		//make copy of fighterNameArray, find htee element to be removed
		var tempArray = fighterNameArray.slice();
		var index = tempArray.indexOf(objName);

		//reove the element
		if (index > -1) {

			tempArray.splice(index, 1);

		}

		//create a list of oponent names
		opponentNameArray = tempArray;
		//place the remaining array, which is a list of opponents, and move them into the img tag of OpponentList column
		
		//var element = $("#opponentList").children().next();
		console.log(tempArray);
		var element = $("#opponentList div");
		//var counter = 0;
		for (var i = 0; i < tempArray.length; i++) {

			//var child = ".next()";
			//var tempElement = element.next();

			if (tempArray[i] !== objName) {

				
				//console.log(tempArray[i]);
				//console.log(fighterObj[tempArray[i]].imageUrl);


				movePlayer(tempArray[i], element);

				displayNameHP(tempArray[i], element);			

			};
			element = element.next();
	
		};

		$(".opponent").show();

	};

	function eraseRow(idRow) {

		$(idRow).html("");

	}

	$(".opponent").click(function(){

		if (!isPlaying) {

		var selectedName = $(this).children().attr("id");
		//$("#defender").attr("id", selectedName);
		console.log(selectedName);
		//moveDefender(selectedName);
		movePlayer(selectedName, "#currFighting");
		displayNameHP(selectedName, "#currFighting");
		updateDefender(selectedName);
		$(this).html("");

		}

		isPlaying = true;

	});

	function updateDefender(objName){

		var index = opponentNameArray.indexOf(objName);

		if (index > -1) {

			opponentNameArray.splice(index, 1);
			
		};

		console.log(opponentNameArray);


		
		opponent = fighterObj[objName];
		//console.log(opponent);
		//isPlaying = true;

	};

	$("#attack").click(function(){

		if (isPlaying) {
		//$("#result").html("hi");

		attack(player,opponent);
		displayResultText(player, opponent);
		if (checkRoundEnd(player,opponent)) {

			removeOpponent();

			console.log(opponentNameArray.length);

			if (opponentNameArray.length === 0) {

				$("#resultOne").html("You have vanquished all foes!");
				$("#resultTwo").html("Press reset to start over...");

			}

		}


		} 

		//else {

			console.log("round should end");
			//remove opponent from defender...
			//removeOpponent();
		//}

	});

	function attack(playerObj, opponentObj) {
		//console.log(playerObj);
		//console.log(opponentObj);
		//console.log(opponentObj.name);
		//console.log(opponentObj.hp);

		//console.log(playerObj.hp);

		//displayResultText(playerObj, opponentObj);

		//console.log(playerAttack);

		updateHP(playerObj, opponentObj);
		updateAttack(playerObj);

	}

	function displayResultText(playerObj, opponentObj) {

		var lineOne;

		var lineTwo;

		console.log("player HP:" + playerObj.hp);
		console.log("opp HP:" + opponentObj.hp);

		if(playerObj.hp <= 0) {

			lineOne = "You have been defeated!!!"
			lineTwo = "select reset to start over..."
			isPlaying = false;

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

	function updateHP(playerObj, opponentObj) {

		var playerHPSelector = "#charHP" + playerObj.name.toLowerCase();
		var opponentHPSelector = "#charHP" + opponentObj.name.toLowerCase();

		opponentObj.hp = opponentObj.hp - playerObj.attack;
		//console.log(opponentObj.hp);

		//console.log(playerObj.name);
		//console.log(playerObj.hp);
		playerObj.hp = playerObj.hp - opponentObj.counter;

		$(playerHPSelector).html(playerObj.hp);
		$(opponentHPSelector).html(opponentObj.hp);

	}

	function updateAttack(playerObj) {

		playerObj.attack = playerObj.attack + playerObj.baseAttack;

	}

	function checkRoundEnd(playerObj, opponentObj) {

		if(playerObj.hp <= 0 || opponentObj.hp <=0) {

			return true;

		} else {

			return false;

		}


	}

	function removeOpponent() {

		$("#currFighting").html("");
		$("#currFighting").html("<p>Defender</p>");

	}

	$("#restart").click(function(){

		console.log("clicked on reset");
		reset();


	})

});