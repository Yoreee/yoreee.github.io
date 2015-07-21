console.log("script file linked!")






//BLACK JACK


// things i learned: how to code while drunk
// things i enjoyed: working with others and talking about their code and mine.
//setbacks: drinking too much





var picSpades = ["./assets/2_of_spades.png", "./assets/3_of_spades.png", "./assets/4_of_spades.png", "./assets/5_of_spades.png", "./assets/6_of_spades.png",
"./assets/7_of_spades.png", "./assets/8_of_spades.png", "./assets/9_of_spades.png", "./assets/10_of_spades.png", "./assets/jack_of_spades2.png", "./assets/queen_of_spades2.png",
"./assets/king_of_spades2.png", "./assets/ace_of_spades.png"];

var picHearts = ["./assets/2_of_hearts.png", "./assets/3_of_hearts.png", "./assets/4_of_hearts.png", "./assets/5_of_hearts.png", "./assets/6_of_hearts.png",
"./assets/7_of_hearts.png","./assets/8_of_hearts.png", "./assets/9_of_hearts.png", "./assets/10_of_hearts.png", "./assets/jack_of_hearts2.png", "./assets/queen_of_hearts2.png",
"./assets/king_of_hearts2.png", "./assets/ace_of_hearts.png"];

var picDiamonds = ["./assets/2_of_diamonds.png", "./assets/3_of_diamonds.png", "./assets/4_of_diamonds.png", "./assets/5_of_diamonds.png", "./assets/6_of_diamonds.png",
"./assets/7_of_diamonds.png","./assets/8_of_diamonds.png", "./assets/9_of_diamonds.png", "./assets/10_of_diamonds.png", "./assets/jack_of_diamonds2.png", "./assets/queen_of_diamonds2.png",
"./assets/king_of_diamonds2.png", "./assets/ace_of_diamonds.png"];

var picClubs = ["./assets/2_of_clubs.png","./assets/3_of_clubs.png", "./assets/4_of_clubs.png", "./assets/5_of_clubs.png", "./assets/6_of_clubs.png", "./assets/7_of_clubs.png", "./assets/8_of_clubs.png",
"./assets/9_of_clubs.png", "./assets/10_of_clubs.png", "./assets/jack_of_clubs2.png", "./assets/queen_of_clubs2.png", "./assets/king_of_clubs2.png", "./assets/ace_of_clubs.png"];

var cardValues = [2,3,4,5,6,7,8,9,10,10,10,10,11];

var createDeck = function () {

	var arrayOfS = [];
	var arrayOfH = [];
	var arrayOfD = [];
	var arrayOfC = [];

	for (var i = 0; i < 13; i++) {
		hearts = {};
		spades = {};
		diamonds = {};
		clubs = {};

		hearts.cardValue = cardValues[i];
		spades.cardValue = cardValues[i];
		diamonds.cardValue = cardValues[i];
		clubs.cardValue = cardValues[i];

		hearts.url = picHearts[i];
		spades.url = picSpades[i];
		diamonds.url = picDiamonds[i];
		clubs.url = picClubs[i];

		arrayOfS.push(spades);
		arrayOfH.push(hearts);
		arrayOfD.push(diamonds);
		arrayOfC.push(clubs);
	}
	
	return arrayOfD.concat(arrayOfC.concat(arrayOfS.concat(arrayOfH)));
}

var cards = [];
var cards = createDeck();






var dealer = {
	name: 'dealer',
	hand: [],
	money: 100000
};




var player = {
	name: 'player',
	hand: [],
	splitHand1: [],
	splitHand2: [],
	money: 1000,
	bet: 0
};




//BUTTON EVENT LISTENERS


	//this function gets the players bet from the input box
var getBet = function () {
	var playerBetString = document.getElementById('bet').value;
	var playerBet = parseInt(playerBetString);
	return playerBet;
}
	//this 




var submit = document.getElementById('submit-bet');
submit.addEventListener('click', function () {

	player.bet = getBet();
	player.money -= getBet();
	console.log("OK you bet $" + player.bet + "! Good luck!");
	var betDisplay = document.getElementsByClassName('bet-display')[0];
	var playerBet = document.getElementById('bet').value = "";
	updateMunny();
	updateBet();
	betDisplay.textContent = player.bet;

	setTimeout(function() {
		deal(player, dealer)
	}, 2000);
})





var dealButton = document.getElementById('deal');
dealButton.addEventListener('click', function() {
	deal(player, dealer);
})

var hitButton = document.getElementById('hit');
hitButton.addEventListener('click', function () {
	hit(player.hand);
})


var standButton = document.getElementById('stand');
standButton.addEventListener('click', function() {
	stand(player.hand);
})





//BUTTON EVEN LISTENERS END

var updateMunny = function () {
	var munnies = document.getElementById('money-display');
	munnies.textContent = player.money;
}

var updateCounter = function() {
	var playerCounter = document.getElementById('player-count');
	playerCounter.textContent = count(player.hand);

	var dealerCounter = document.getElementById('dealer-count');
	dealerCounter.textContent = count(dealer.hand);
}

var updateBet = function() {
	var betDisplay = document.getElementsByClassName('bet-display')[0];
	betDisplay.textContent = player.bet;
}

var doubledown = function () {
	player.money -= getBet();
	player.bet *= 2;
	//betDisplay = document.getElementsByClassName('bet-display')[0];
	//betDisplay.textContent = player.bet;
	updateBet();

	hit(player.hand);
	stand(player.hand)

}

var doubleDown = document.getElementById('doubledown');
doubleDown.addEventListener('click', function() {
	doubledown();
})

var getRandomCard = function(player) {
	if(cards.length === 0) {
		cards = createDeck();
	}
	//gets random number
	var random = Math.floor(Math.random() * cards.length);
	//selects random card and pushes it to 
	player.push(cards[random]);
	cards.splice(random, 1);
	// console.log(player);
	// console.log(cards);

}


var deal = function (toPlayer, toDealer) {
	dealer.hand = [];
	player.hand = [];
	player.splitHand1 = [];
	player.splitHand2 = [];

	var thirdCard = document.getElementsByClassName('playercard3')[0];
	thirdCard.style.backgroundImage = "url(" + ")";

	var dealer2 = document.getElementsByClassName('dealercard2')[0];
	dealer2.style.backgroundImage = "url(" + ")";

	getRandomCard(toPlayer.hand);
	getRandomCard(toPlayer.hand);
	getRandomCard(toDealer.hand);

	//inserts first card to div
	var firstCard = document.getElementsByClassName('playercard1')[0];
	firstCard.style.backgroundImage = "url(" + player.hand[0].url + ")";

	var secondCard = document.getElementsByClassName('playercard2')[0];
	secondCard.style.backgroundImage = "url(" + player.hand[1].url + ")";

	var dealer1 = document.getElementsByClassName('dealercard1')[0];
	dealer1.style.backgroundImage = "url(" + dealer.hand[0].url + ")";

	console.log(player.name + 'count:');
	console.log(count(player.hand));
	console.log(player.hand);

	console.log(dealer.name + 'count:')
	console.log(count(dealer.hand));
	console.log(dealer.hand);

	if (count(player) == 21 && count(dealer) == 21) {
		console.log('Draw!');
	} else if (count(player.hand) == 21) {
		console.log('BLACK JACK! You win!');
	} else if (count(dealer.hand) == 21) {
		console.log('You Lose!');
	} else {
		console.log('hit or stand?');
	}

	updateCounter();
	updateMunny();

}



var hit = function (someHand) {
	getRandomCard(someHand);
	console.log("player hand:");
	console.log(someHand);
	console.log("player count:");
	console.log(count(someHand));

	if(count(someHand) > 21) {
		console.log('bust! you lose');
		//dealer takes players money
		player.money -= player.bet;
		updateMunny()
		player.bet = 0;
		updateBet();

	}

	var thirdCard = document.getElementsByClassName('playercard3')[0];
	thirdCard.style.backgroundImage = "url(" + player.hand[2].url + ")";

	updateCounter();

}



var count = function (someHand) {

	var aceChanger = function (hand) {
		
		for (var i = 0; i < hand.length; i++) {
			if (hand[i].cardValue === 11) {
				hand[i].cardValue = 1;
				console.log('changed the ace value!')
				break;
			}
		}
	}

	var getCount = function () {		
		var counter = 0;
		
		for (var i = 0; i < someHand.length; i++) {
				counter += someHand[i].cardValue;
			}
		return counter;
		}

	if (getCount() > 21) {
		aceChanger(someHand);
	}
	return getCount();
}

var stand = function (somePlayerHand) {
	//dealer turn
	//if dealers count is equal to 

	

	if(count(dealer.hand) < 17) {
		getRandomCard(dealer.hand);
		var dealer2 = document.getElementsByClassName('dealercard2')[0];
		dealer2.style.backgroundImage = "url(" + dealer.hand[1].url + ")";
		updateCounter();
		stand(somePlayerHand);

	} else if (count(dealer.hand) > 21) {
		console.log('player count');
		console.log(count(player.hand));
		console.log('dealer count');
		console.log(count(dealer.hand));
		console.log('dealer bust! you win!');
		//dealer gives player money
		dealer.money -= player.bet;
		player.money += player.bet *2;
		updateMunny()
		updateBet();
		player.bet = 0;
	} else if (count(dealer.hand) < count(somePlayerHand)) {
		console.log('player count');
		console.log(count(player.hand));
		console.log('dealer count');
		console.log(count(dealer.hand));
		console.log('player wins');
		//dealer gives player money
		dealer.money -= player.bet;
		player.money += player.bet *2;
		updateMunny()
		updateBet()
		player.bet = 0;
	} else if (count(dealer.hand) > count(somePlayerHand)) {
		console.log('player count');
		console.log(count(player.hand));
		console.log('dealer count');
		console.log(count(dealer.hand));
		console.log('dealer wins!');
		//dealer takes players money
		dealer.money += player.bet;
		player.money -= player.bet;
		updateMunny();
		updateBet()
		player.bet = 0;
	} else if (count(dealer.hand) === count(somePlayerHand)) {
		console.log('player count');
		console.log(count(player.hand));
		console.log('dealer count');
		console.log(count(dealer.hand));
		console.log('draw!')
	} else {
		console.log('player count');
		console.log(count(player.hand));
		console.log('dealer count');
		console.log(count(dealer.hand));
		console.log(dealer.hand);
		console.log('somethings wrong');
	}


}

var split = function () {
	 player.splitHand1.push(player.hand[0]);
	 player.splitHand2.push(player.hand[1]);
	 console.log(player.splitHand1);
	 console.log(player.splitHand2);
	 
	 var hit1 = document.createElement('button');
	 hit1.textContent = 'hit';
	 hit1.addEventListener('click', function() {
	 	hit(player.splitHand1);
	 });

	 var hit2 = document.createElement('button');
	 hit2.textContent = 'hit';
	 hit2.addEventListener('click', function() {
	 	hit(player.splitHand2);
	 });
	 
	 var splitStand1 = document.createElement('button');
	 splitStand1.textContent = 'stand';
	 
	 var splitStand2 = document.createElement('button');
	 splitStand2.textContent = 'stand';
	 
	 splitStand1.addEventListener('click', function() {
	 	stand(player.splitHand1)
	 });

	 splitStand2.addEventListener('click', function() {
	 	stand(player.splitHand2)
	 });

	 document.body.appendChild(hit1);
	 document.body.appendChild(hit2);
	 document.body.appendChild(splitStand1);
	 document.body.appendChild(splitStand2);
	 
}

updateMunny();






