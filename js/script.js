var playing = false;
var score;
var trialsLeft;
var action;//user for interval
var fruits = ['apple','banana','cherries','grapes','mango','orange','peach','pear','watermelon'];

$(function(){
	$("#startreset").click(function(){
		if(playing == true)
			location.reload();//reload page
		else{
//			we are not playing but now starting to play
			playing=true;
			score=0;
			$("#scorevalue").text(score);
			trialsLeft = 3;
			$("#trialsLeft").show();
			addHearts();
			
			//hide gameover of previous time if there
			$("#gameOver").hide();
			
			$("#startreset").text("Reset Game");
			//start sending the fruit
			startAction();
			
		}
	});
	function addHearts(){
		$("#trialsLeft").empty();
		for(i = 0; i<trialsLeft ; i++){
			$("#trialsLeft").append("<img src='images/heart.png' class = 'life'>");
		}		
	}
	function startAction(){
		//generate  the fruit
		$("#fruit1").show();
		chooseFruit();
		$("#fruit1").css({
			'left' : Math.round(550*Math.random()),
			'top':'-50px',
		});
		step = 1 + Math.round(Math.random() * 5);
		
		action = setInterval(function(){
			$("#fruit1").css("top",$("#fruit1").position().top + step);
			if($("#fruit1").position().top >$("#fruitsContainer").height()){
				if(trialsLeft >1){
					//generate a fruit and decrease he life
					$("#fruit1").show();
					chooseFruit();
					
					$("#fruit1").css({
						'left' :Math.round(550*Math.random()),
						'top' : '-50px',
					});
					$("#fruit1").show();
					
					step = 1 + Math.round(Math.random() * 5);
					trialsLeft--;
					addHearts();
				}
				else{
					//game is over just get lost
					playing = false;
					$("#startreset").text("Start Game");
					$("#gameOver").show();
					$("#gameOver").html("<p>Game is over</p> <p> Your score is  : " + score +"</p>");
					
					$("#trialsLeft").hide();
					$("#score").empty();
					$("#fruit1").empty();
					
					stopAction();
				}
			}
		},10);
		
	}
	function chooseFruit(){
		$("#fruit1").attr("src","images/"+ fruits[Math.round((fruits.length-1)*Math.random())]+ ".png");
		
	}
	function stopAction(){
		clearInterval(action);
		
	}
	$("#fruit1").mouseover(function(){
		score++;
		$("#scorevalue").text(score);
		//document.getElementById("#slicesound").play();
		$("#slicesound")[0].play();
		
		//stop moving fruit
		stopAction();
		$("#fruit1").hide("explode",300);
//		startAction()
		setTimeout(startAction,600);
	});
});
