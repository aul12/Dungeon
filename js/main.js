const SIZE_BEGIN = 25;
var SIZE = SIZE_BEGIN;
var dungeon = new Field();
var player = new Creature(0, 0, 100);
var inventory = new Inventory();

var monsters = [];
var items = [];
var life = [];

var running = true;
var monsterFighting = 0;



$("#modalIntro").modal();

$("#startButton").click(function(){
    dungeon = new Field();
    player.x = 0;
    player.y = 0;
    player.rotation = 0;
    monsters = [];
    items = [];
    life = [];
    running = true;
    monsterFighting = 0;

    dungeon.generateField(SIZE);
    var firstPart = ["Strong", "Fast", "Weak", "Slow", "Heavy"];
    var secondPart = ["Pistol", "Cannon", "Laser", "Knife", "Grenade"];

    for (var x = 0; x < SIZE; x++) {
        for(var y = 0; y < SIZE; y++){
            var fieldRandom = Math.random() * 1000;

            if(dungeon.get(x,y) == fieldType.empty && !(x<3 && y<3)){
                if(fieldRandom < 25){
                    monsters.push(new Creature(x, y, Math.floor(Math.random()*75)));
                }else if(fieldRandom < 35) {
                    var name = firstPart[Math.floor(Math.random() * 5)] + " " + secondPart[Math.floor(Math.random() * 5)];
                    items.push(new Item(name, 100, Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), x, y));
                }else if(fieldRandom < 40){
                    life.push(new Life(Math.floor(Math.random() * 40), x, y));
                }
            }
        }
    }
    running = true;

    $("#pLevel").html("Level: "+(Math.floor((SIZE-SIZE_BEGIN)/5)+1));

    startRender(SIZE);
});





$("#btnFight").click(function(){
    running = true;
    $('#modalFight').modal('hide');
    player.health -= Math.round(monsters[monsterFighting].health / 2);
    monsters.splice(monsterFighting, 1);
    scene.remove(monsterCylinders[monsterFighting]);
    monsterCylinders.splice(monsterFighting, 1);

    if(player.health <= 0) {
        running = false;
        $("#modalStartTitle").html("You are dead!<br>Restart now?");
        SIZE = SIZE_BEGIN;
        player = new Creature(0, 0, 100);
        $("#modalIntro").modal();
    }
});

function checkFight(){
    for(var c=0; c<monsters.length; c++) {

        if(monsters[c].x == player.x && monsters[c].y == player.y){
            //running = false;
            $('#modalFight').modal();

            $("#tableFightCompare").html("<tr><th>You</th><th>Monster</th></tr>tr><td>"+player.health+"</td><td>"+monsters[c].health+"</td></tr>");
            monsterFighting = c;
        }

    }
}

function checkItem(){
    for(var c=0; c<items.length; c++){
        if(items[c].x == player.x && items[c].y == player.y){
            inventory.add(items[c]);
            items.splice(c, 1);
            scene.remove(itemMesh[c]);
            itemMesh.splice(c, 1);
        }
    }
    for(c=0; c<life.length; c++){
        if(life[c].x == player.x && life[c].y == player.y){
            player.health += life[c].amount;
            if(player.health > 100)
                player.health = 100;
            life.splice(c, 1);
            scene.remove(lifeSphere[c]);
            lifeSphere.splice(c, 1);
        }
    }

}

function  checkFinal(){
    if(player.x == SIZE-1 && player.y == SIZE-1){
        $("#modalStartTitle").html("You have finished Level "+(Math.floor((SIZE-SIZE_BEGIN)/5)+1)+"!");
        SIZE += 5;
        $("#modalIntro").modal();
        running = false;
    }
}