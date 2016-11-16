$(document).ready(function() {
    //declaration of the char object that holds all characters and attributes
    var char = {
        luke: {
            name: "Luke Skywalker",
            healthPoints: 100,
            attack: 8,
            counterAttack: 2
        },
        obi: {
            name: "Obi Wan",
            healthPoints: 120,
            attack: 6,
            counterAttack: 5
        },
        dmaul: {
            name: "Darth Maul",
            healthPoints: 140,
            attack: 4,
            counterAttack: 3
        },
        dsid: {
            name: "Darth Sidious",
            healthPoints: 160,
            attack: 2,
            counterAttack: 7
        },
    };
   
    var characterChosen = false; //var to prevent character from being picked twice
    var enemyChosen = 0; //keeps the enemy from being chosen more than 3 times
    var playerCharacter; //saves ID from html to match up with char object
    var increaseAttackBy = 0; //saves the attack points for character chosen
    var enemyDead = 0; //counts the enemies that have died
   
    $(".list").on("click", function() {
        //function for character chosen by player
        if (!characterChosen) {
            playerCharacter = $(this).attr('id');
            //adds the healthPlayer class
            $(this).addClass("healthPlayer");
            increaseAttackBy = char[playerCharacter].attack;
            console.log(char[playerCharacter]);
            //appends the character to the your character div
            $(".yourCharacter").append(this);
            //immediately appends the rest to the enemy div        
            $(".enemies").append($('.characters'));
            characterChosen = true;
            //adds a class to the defenders to change background color to red
            $('section').not(this).addClass('defense');
            //function for when enemy is chosen
            $(".defense").on("click", function() {
                //removes defense class as it is no longer needed
                $(this).removeClass('defense');

                
                //adds fighter class to change background color to grey
                $(this).addClass("fighter");
                
                //appends the enemy to the fight div
                if (enemyChosen < 3) {
                    $("#defender").append(this);
                    //adds healthEnemy class after chosen
                    $(this).addClass("healthEnemy");
                    //assigns enemyCharacter to the div id so as to match with the object
                    enemyCharacter = $(this).attr('id');
                    console.log(char[enemyCharacter]);
                    //adds to enemy chosen so more than three can't be chosen
                    enemyChosen++;
                    $(".attack").on("click", function() {
                        console.log(increaseAttackBy);
                        console.log(char[enemyCharacter]);
                        //subtracts the players character health points by the enemy counterattack        
                        char[playerCharacter].healthPoints = char[playerCharacter].healthPoints - char[enemyCharacter].counterAttack;
                        
                        //subtracts the enemy health by the player's character's attack
                        char[enemyCharacter].healthPoints = char[enemyCharacter].healthPoints - char[playerCharacter].attack;
                        
                        //adds the original attack power to the current attack power of the player's character
                        char[playerCharacter].attack = char[playerCharacter].attack + increaseAttackBy;
                        
                        //changes the players health points on screen
                        $(".healthPlayer .health").html(char[playerCharacter].healthPoints);
                        
                        //changes the enemys health points on screen
                        $(".healthEnemy .health").html(char[enemyCharacter].healthPoints);
                        
                        //displays results of the fight
                        $(".fightComm1").html("You attacked " + char[enemyCharacter].name + " for " + char[playerCharacter].attack + " damage.");
                        $(".fightComm2").html(char[enemyCharacter].name + " attacked you back for " + char[enemyCharacter].counterAttack + " damage.");

                        //hides the old enemy allowing new enemy to be chosen
                        if (char[enemyCharacter].healthPoints <= 0) {

                            $(".fightComm1").html("You have defeated " + char[enemyCharacter].name + " Pick someone else.");
                            
                            $(".fightComm2").empty();
                            $(".healthEnemy").hide();
                            //removes classes no longer needed
                            $(this).removeClass(".healthEnemy");
                            $(this).removeClass(".fighter");
                            //adds to the enemy dead
                            enemyDead++;
                            console.log(enemyDead);
                            if (enemyDead === 3) {
                                $(".fightComm1").html("YOU WON YOU WINNER REFRESH PAGE TO PLAY AGAIN BECAUSE THE RESET BUTTON DOESN'T WORK YET"); 
                                $(".fightComm2").empty();
                            }
                        }
                        
                        //ends game (kinda for the moment) when their character dies
                        if (char[playerCharacter].healthPoints <= 0) {
                            $(".fightComm1").html("YOU LOST YOU LOSER REFRESH PAGE TO PLAY AGAIN BECAUSE THE RESET BUTTON DOESN'T WORK YET");
                            $(".fightComm2").empty();
                        }
                        console.log(char[playerCharacter]);
                        console.log(char[enemyCharacter]);
                    });
                }
            });
        }
    });
});