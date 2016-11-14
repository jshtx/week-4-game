
var char = {
	luke: {healthPoints: 100, attack: 5, counterAttack: 10},
	obi: {healthPoints: 120, attack: 10, counterAttack: 15},
	dmaul: {healthPoints: 140, attack: 15, counterAttack: 20},
	dsid: {healthPoints: 160, attack: 20, counterAttack: 25},
};

var characterChosen = false;
var enemyChosen = 0;
var playerCharacter;
var increaseAttackBy = 0;

	$(".list").on("click", function() {
		
		if (!characterChosen) {

			playerCharacter = $ (this).attr('id');
			increaseAttackBy = char[playerCharacter].attack;
			console.log(char[playerCharacter]);

			
        	$ (".yourCharacter").append(this);
        
     	    $ (".enemies").append($('.characters'));

     	    characterChosen = true;
    
     	    $("section").addClass("defense");


     	    $(".defense").on("click", function() {
		
			if (enemyChosen < 3) {

        		$ (".defender").append(this);
        		enemyCharacter = $ (this).attr('id');
        		console.log(char[enemyCharacter]);
     	   		enemyChosen++;
    
     	   
     	   	$(".attack").on("click", function() {

     	   		
     	   		console.log(increaseAttackBy);

     	   		char[playerCharacter].healthPoints = char[playerCharacter].healthPoints - char[enemyCharacter].counterAttack;
     	   		
     	   		
     	   		char[enemyCharacter].healthPoints = char[enemyCharacter].healthPoints - char[playerCharacter].attack;
     	   		char[playerCharacter].attack = char[playerCharacter].attack + increaseAttackBy;



     	   		console.log(char[playerCharacter]);
     	   		console.log(char[enemyCharacter]);


     	   		


     	   	});






     	   }




});

     	   }


});



