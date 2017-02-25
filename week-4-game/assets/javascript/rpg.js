$(document).ready(function(){

var characters = [
	{name: 'Obi-Wan Kenobi', img: 'assets/img/obiwan.jpg', hp: 120, ap: 50, ca: 50},
	{name: 'Luke Skywalker', img: 'assets/img/luke.png', hp: 100, ap: 20, ca: 20},
	{name: 'Darth Sidious', img: 'assets/img/sideous.jpg', hp: 150, ap: 35, ca: 35},
	{name: 'Darth Maul', img: 'assets/img/maul.jpg', hp: 180, ap: 10, ca: 10}
];
var playerIsChosen = false;
var enemyIsChosen = false;

// characters  
function start() {
	$('.display').hide();
	for (var i = 0; i < characters.length; i++) {
		var b = $('<button>');
		b.addClass('characterButton');
		b.attr('name', characters[i].name);
		b.attr('hp', characters[i].hp);
		b.attr('ap', characters[i].ap);
		b.attr('ca', characters[i].ca);
		b.append("<p>" + characters[i].name + "</p><img src='" + characters[i].img + "' class='characterImage'><br><p class='hpDisplay'>HP: " + characters[i].hp + "</p>");
		$('#allCharacters').append(b);
	}
	var p = $('<p>');
	p.append('Choose your character.');
	$('#gameText').append(p);
}
// player
$(document).on('click', '.characterButton', function() {
	if (!playerIsChosen) {
		$('#gameText').empty();
		$('.display').show();
		var player = $(this);
		player.addClass('player');
		$('#yourCharacter').append(player);
		playerIsChosen = true;
		$('#availableEnemies').append($('#allCharacters').children().addClass('possibleEnemies'));
		var p = $('<p>');
		p.append('Choose your opponent.');
		$('#gameText').append(p);
	}
});

// defender
$(document).on('click', '.possibleEnemies', function() {
	if (!enemyIsChosen) {
		$('#gameText').empty();
		var defender = $(this);
		defender.addClass('defenderButton').removeClass('possibleEnemies');
		$('#defender').append(defender);
		enemyIsChosen = true;
		var p = $('<p>');
		p.append('CHARGE!!! Attack!');
		$('#gameText').append(p);	
	}
});

// Attack 
$(document).on('click', '#attack', function() {
	var playerName = $('#yourCharacter').children().attr('name');
	var playerHP = $('#yourCharacter').children().attr('hp');	
	var playerAP = $('#yourCharacter').children().attr('ap');
	var defenderName = $('#defender').children().attr('name');
	var defenderHP = $('#defender').children().attr('hp');
	var defenderCA = $('#defender').children().attr('ca');

	
	if (playerIsChosen && enemyIsChosen && playerHP > 0) {
		$('#gameText').empty();	
	
		defenderHP -= playerAP;
		$('#defender').children().attr('hp', defenderHP);
		$('#defender .hpDisplay').text("HP: " + defenderHP);
		playerHP -= defenderCA;
		$('#yourCharacter').children().attr('hp', playerHP);
		$('#yourCharacter .hpDisplay').text("HP: " + playerHP);
		var p = $('<p>');
		p.append("You attacked " + defenderName + " for " + playerAP + " damage.<br>" + defenderName + " attacked you back for " + defenderCA + " damage.");
		$('#gameText').append(p);
		if ($('#yourCharacter').children().length > 0 && $('#defender').children().length > 0 && playerHP > 0) {
			for (var i = 0; i < characters.length; i++) {
				if (characters[i].name == playerName) {
					var basePlayerAP = characters[i].ap;
				}				 
			}
			playerAP = parseInt(playerAP) + parseInt(basePlayerAP);
			$('#yourCharacter').children().attr('ap', playerAP);
			console.log(playerAP);
		}
	
		if (defenderHP <= 0) {
			$('#gameText').empty();
			$('#defender').empty();
			enemyIsChosen = false;
			var p = $('<p>');
			p.append('You have defeated ' + defenderName + '. Who will you challenge next?');
			$('#gameText').append(p);
		}
	
		if ($('#availableEnemies').children().length == 0 && $('#defender').children().length == 0 && playerIsChosen ) {
			$('#gameText').empty();
			$('#attack').hide();
			var p = $('<p>');
			p.append('Good job, you won!');
			// restart button
			var br = $('<br>');
			p.append(br);
			var b = $('<button>Restart</button>');
			b.addClass('btn btn-danger raised restart');
			p.append(b);
			$('#gameText').append(p);
		}
	
		if (playerHP <= 0) {
			$('#gameText').empty();
			$('#attack').hide();
			var p = $('<p>');
			p.append('You have been defeated...GAME OVER!');


			var br = $('<br>');
			p.append(br);
			var b = $('<button>Restart</button>');
			b.addClass('btn btn-danger raised restart');
			p.append(b);
			$('#gameText').append(p);
		}

	} else if (playerIsChosen && !enemyIsChosen && $('#availableEnemies').children().length > 0) {
		$('#gameText').empty();
		var p = $('<p>');
		p.append('Please choose an enemy to fight!');
		$('#gameText').append(p);
	} else if (!playerIsChosen) {
		$('#gameText').empty();
		var p = $('<p>');
		p.append('Please choose your character!');
		$('#gameText').append(p);
	}
});

// Restart
$(document).on('click', '.restart', function() {
	playerIsChosen = false;
	enemyIsChosen = false;
	$('#allCharacters').empty();
	$('#yourCharacter').empty();
	$('#defender').empty();
	$('#availableEnemies').empty();
	$('#gameText').empty();
	start();
});


start();
});