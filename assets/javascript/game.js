$(document).ready(function() {
    //declaration of the char object that holds all characters and attributes
    var char = {
        luke: {
            healthPoints: 100,
            attack: 8,
            counterAttack: 2
        },
        obi: {
            healthPoints: 120,
            attack: 6,
            counterAttack: 5
        },
        dmaul: {
            healthPoints: 140,
            attack: 4,
            counterAttack: 3
        },
        dsid: {
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
                $(this).removeClass('defense');
                
                //appends the enemy to the fight div
                if (enemyChosen < 3) {
                    $("#defender").append(this);
                    //removes chosen class after chosen
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
                        
                        //hides the old enemy allowing new enemy to be chosen
                        if (char[enemyCharacter].healthPoints <= 0) {
                            $(".healthEnemy").hide();
                            $(this).removeClass(".healthEnemy");

                            //adds to the enemy dead
                            enemyDead++;
                            console.log(enemyDead);
                            if (enemyDead === 3) {
                               $("#defender").html("YOU WON YOU WINNER REFRESH PAGE TO PLAY AGAIN BECAUSE THE RESET BUTTON DOESN'T WORK YET"); 
                            }
                        }
                        
                        //ends game (kinda for the moment) when their character dies
                        if (char[playerCharacter].healthPoints <= 0) {
                            $("#defender").html("YOU LOST YOU LOSER REFRESH PAGE TO PLAY AGAIN BECAUSE THE RESET BUTTON DOESN'T WORK YET");
                        }
                        console.log(char[playerCharacter]);
                        console.log(char[enemyCharacter]);
                    });
                }
            });
        }
    });
});