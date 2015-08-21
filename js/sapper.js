(function(){

	var sizeField = $("#select-field").val();
	var bombs = 6;
	var itemWitdh = 30;
	var arrayField = [];
	
	var FIELD =  $('#field');


	function getRandom(min, max) {
    return Math.random() * (max - min) + min;
	}


	function createFiled(size){
		
		$(".bombs-num").html(bombs +"\' bombs");
		FIELD.css("width", (itemWitdh*size+(size*2)) + "px" );//width field
		var countItem = size*size;

		for(var i=1;i<=countItem;i++){

			FIELD.append($('<div class="item empty"></div>'));
		}

	};

	function createBombs(count){

		while(count){
			var randomItem = Math.round(getRandom(0,sizeField*sizeField-1));

			if(!$(".item").eq(randomItem).hasClass("bomb")){

				$(".item").eq(randomItem).addClass("bomb");
				$(".item").eq(randomItem).html("b");
				$(".item").eq(randomItem).removeClass("empty");
				count--;
			}
		}
	};

	function countBombs(fieldSize){

		
		var arr = 0;
		var eqItem = 0;
		var aroundBombs = 0;
		var itDiv = 0;

		while(arr < fieldSize){               //Create array
		 arrayField[arr] = [];
		 arr++;
		}

		
		for(var row=0;row<fieldSize;row++){    //Inizialization array with bombs
			for (var col = 0; col < fieldSize; col++) {

				   arrayField[row][col] = ($(".item").eq(eqItem).hasClass("bomb")) ? "bomb": row +"-"+ col;
				   eqItem++;
			};

		};


		//Count Bombs
		for(var r=0;r<fieldSize;r++){ 

			for (var c = 0; c < fieldSize; c++,itDiv++) {

				aroundBombs = 0;
			

				if(arrayField[r][c] == "bomb"){
					$(".item").eq(itDiv).attr("id",r +"-"+ c);
				 	continue;
				}
				else{	

					 if(r != 0  ){
						 if(arrayField[r-1][c] == "bomb")aroundBombs++;//up
						 if(arrayField[r-1][c+1] == "bomb")aroundBombs++;//up right
						 if(arrayField[r-1][c-1] == "bomb")aroundBombs++;//up left
						}

						if(r+1 != fieldSize  ){
						
				  	 if(arrayField[r+1][c-1] == "bomb")aroundBombs++;//down left
				  	 if(arrayField[r+1][c+1] == "bomb")aroundBombs++;//down right
				  	 if(arrayField[r+1][c] == "bomb")aroundBombs++;//down 
					   }

				     if(arrayField[r][c-1] == "bomb")aroundBombs++;//left
				     if(arrayField[r][c+1] == "bomb")aroundBombs++;//right   
				}

						//arrayField[r][c] = aroundBombs;
						if(!aroundBombs){
							$(".item").eq(itDiv).addClass("count-empty");
						}
						$(".item").eq(itDiv).html(aroundBombs);
						$(".item").eq(itDiv).attr("id",r +"-"+ c);
			};

		};

	};

	function openItem(item){

		if($(item).hasClass("count-empty")){

			var id = $(item).attr("id").split("-");
			var row = id[0];
			var col = id[1];


			function openSiblings(row,col){

				$("#"+arrayField[row][col]).removeClass("count-empty");

				if($("#"+arrayField[row][+col-1]).hasClass("count-empty")){
					openSiblings(row,+col-1);
				}
				if($("#"+arrayField[row][+col+1]).hasClass("count-empty")){
					openSiblings(row,+col+1);
				}

				if(+row-1 > 0 && $("#"+arrayField[+row-1][col]).hasClass("count-empty")){
					openSiblings(+row-1,col);
				}

				if(+row+1 !=sizeField && $("#"+arrayField[+row+1][+col-1]).hasClass("count-empty")){
					openSiblings(+row+1,+col-1);
				}


					$("#"+arrayField[row][+col-1]).addClass("opened");
					$("#"+arrayField[row][+col+1]).addClass("opened");

					if(row > 0){
							$("#"+arrayField[+row-1][col]).addClass("opened");
							$("#"+arrayField[+row-1][+col+1]).addClass("opened");
							$("#"+arrayField[+row-1][+col-1]).addClass("opened");
					}
					 if(+row+1 !=sizeField){
					 		$("#"+arrayField[+row+1][+col-1]).addClass("opened");
					 		$("#"+arrayField[+row+1][+col+1]).addClass("opened");
					 		$("#"+arrayField[+row+1][col]).addClass("opened");
					 }
			}

			openSiblings(row,col);

		}

			$(item).addClass("opened");

	}


function resetGame(){

	$(".item").remove();
	sizeField = $("#select-field").val();
	bombs = sizeField;

	createFiled(sizeField);
	createBombs(bombs);
	countBombs(sizeField);

};


	$(document).ready(function(){

	createFiled(sizeField);
	createBombs(bombs);
	countBombs(sizeField);


	$("#field").on("contextmenu", ".item",  function(e){

		e.preventDefault();

		if(!$(this).hasClass("opened")){
			$(this).toggleClass("flag");
		}			

	});



	$("#field").on("click", ".item",  function(e){


			if($(this).hasClass("bomb")){
				$(".item").addClass("opened");
				alert("You lost!");
				resetGame();
				return;
			}else{
				openItem(this);
				if(sizeField*sizeField - $(".item.opened").length == bombs){
					$(".item").addClass("opened");
					alert("you win!");
					resetGame();
				}

			}
						

	});



	$(".reset-btn").click(function(){
		resetGame();
	});
	$("#select-field").change(function(){
		resetGame();
	});

});


})();

