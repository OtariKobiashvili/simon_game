var gameState = false;
var strict = false;
var gameStart = false;
var turn , count, simonMove, playerMove;
var i = 0;
var moves = [];
var playerMoves = [];

function simonPattern(){
	simonMove = Math.floor((Math.random() * 4) + 1);
	moves.push(simonMove);
	count++;
	if(count === 21){
		$("#audio1")[0].play();
		$("#audio3")[0].play();
		$("#audio2")[0].play();
		$("#audio4")[0].play();
		$("#current-count").html("WIN!");
		gameReset();
		gameStart = true;
		count = 0;
		i = 0;
		turn = "simon";
		$(".start-text").html("RESET");
		setTimeout(simonPattern(),2000);
	}else{
		patternLoop();
	}
}

function patternLoop() {
	setTimeout(function(){
		$("#current-count").html(function(){
			if(count === 0){
				return "- -"
			} else return count;
		});
		switch	(moves[i]) {
			case 1:
				$("#" + moves[i]).css("background-color","rgb(61,215,75)");
				$("#audio1")[0].play();
				setTimeout(buttonReset,1000);
				break;
			case 2:
				$("#"+ moves[i]).css("background-color","rgb(245,20,2)");
				$("#audio2")[0].play();
				setTimeout(buttonReset,1000);
				break;
			case 3:
				$("#"+ moves[i]).css("background-color","rgb(255,252,0)");
				$("#audio3")[0].play();
				setTimeout(buttonReset,1000);
				break;
			case 4:
				$("#"+ moves[i]).css("background-color","rgb(0,125,245)");
				$("#audio4")[0].play();
				setTimeout(buttonReset,1000);
				break;
		}
		i++
		if(i < moves.length){
			patternLoop();
		}
	}, 1500)
}

function gameReset(){
	clearTimeout();
	gameStart = false;
	strict = false;
	turn = undefined;
	moves = [];
	i = 0;
	count = 0;
	turn = "simon";
	playerMoves = [];
	$(".circle").css("cursor", "");
	$(".circle").css("background-color", "");
	$(".strict").css("background-color", "grey");
}

function buttonReset(clickedButton){

	if(turn === "simon"){
		$(".circle").css("background-color", "");
		if(moves.length === i){
			turn = "player";
			$(".circle").css("cursor", "pointer");
			i = 0;
		}
	} else if (turn === "player"){
		playerMoves.push(Number(playerMove));
		$("#" + playerMove).css("background-color", "");
		if(playerMoves[i-1] != moves [i-1]){
			if(!strict){
				i = 0;
				turn = "simon";
				playerMoves = [];
				setTimeout(function(){
					$("#current-count").html("! ! !")
					$("#audio1")[0].play();
					$("#audio3")[0].play();
				},500)
				setTimeout(patternLoop(), 3000);
			} else if (strict === true){
				setTimeout(function(){
					$("#current-count").html("! ! !")
					$("#audio1")[0].play();
					$("#audio3")[0].play();
				},500)
				gameReset();
				strict = true;
				$(".strict").css("background-color","darkred")
				gameStart = true;
				count = 0;
				i = 0;
				turn = "simon";
				$(".start-text").html("RESET");
				simonPattern();
			}
		}
		if(playerMoves.length === moves.length){
			turn = "simon";
			$(".circle").css("cursor", "");
			playerMoves = [];
			i = 0;
			setTimeout(simonPattern,1000);
		}
	}
}

$(document).ready(function(){
	$(".power-btn").click(function(){
		if(gameState === false){
			gameState = true;
			turn = "simon";
			$(".power-btn").addClass("power-on");
			$("#current-count").css("color", "#f3172d");
		} else if (gameState === true){
			gameState = false;
			$(".power-btn").removeClass("power-on");
			$("#current-count").css("color","rgba(255,255,255,.1)");
			$("#current-count").html("- -");
			$(".start-text").html("START");
			gameReset();
		}
	});

	$(".strict").click(function(){
		if(gameState){
			if(strict === false){
				strict = true
				$(".strict").css("background-color","darkred")
			} else if(strict === true){
				strict = false
				$(".strict").css("background-color","grey")
			}
		}
	});

	$(".start").click(function(){
		if(!gameStart){
			if(gameState === true){
				gameStart = true;
				count = 0;
				i = 0;
				turn = "simon";
				$(".start-text").html("RESET");
				simonPattern();
			} 
		} else if (gameStart === true){
			$("#current-count").html("- -");
			$(".start-text").html("START");
			gameReset();
		}
	});

	$(".circle")
		.mousedown(function(){
			if(turn === "player"){
				playerMove = $(this).attr("id");
				if($(this).hasClass("first-circle")){
					$("#1").css("background-color","rgb(61,215,75)");
					$("#audio1")[0].play();
				} else if($(this).hasClass("second-circle")){
					$("#2").css("background-color","rgb(245,20,2)");
					$("#audio2")[0].play();
				} else if($(this).hasClass("third-circle")){
					$("#3").css("background-color","rgb(255,252,0)");
					$("#audio3")[0].play();
				} else if($(this).hasClass("fourth-circle")){
					$("#4").css("background-color","rgb(0,125,245)");
					$("#audio4")[0].play();
				}
			}
	})
		.mouseup(function(){
			if(turn === "player"){	
				i++
				if ($(window).width() < 520){
					setTimeout(buttonReset, 1000);
				} else {
					setTimeout(buttonReset,1);
				}
			}
		})
});