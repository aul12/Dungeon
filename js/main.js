var SIZE = 10;
var dungeon = new Field();
var player = new Creature(0, 0, 100);
var inventory = new Inventory();
var monsters = [];
var items = [];

var running = true;
var monsterFighting = 0;



$("#modalIntro").modal();

$("#startButton").click(function(){
    dungeon = new Field();
    player = new Creature(0, 0, 100);
    monsters = [];
    items = [];
    running = true;
    monsterFighting = 0;

    dungeon.generateField(SIZE);
    var firstPart = ["Strong", "Fast", "Weak", "Slow", "Heavy"];
    var secondPart = ["Pistol", "Cannon", "Laser", "Knife", "Grenade"];

    for (var x = 0; x < SIZE; x++) {
        for(var y = 0; y < SIZE; y++){
            var fieldRandom = Math.random() * 100;

            if(dungeon.get(x,y) == fieldType.empty && !(x<3 && y<3)){
                if(fieldRandom < 3){
                    monsters.push(new Creature(x, y, Math.floor(Math.random()*80)));
                }else if(fieldRandom < 6) {
                    var name = firstPart[Math.floor(Math.random() * 5)] + " " + secondPart[Math.floor(Math.random() * 5)];
                    items.push(new Item(name, 100, Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), x, y));
                }
            }
        }
    }
    startRender(SIZE);
});





$("#btnFight").click(function(){
    running = true;
    $('#modalFight').modal('hide');
    player.health -= 10;
    monsters.splice(monsterFighting, 1);
    scene.remove(monsterCylinders[monsterFighting]);
    monsterCylinders.splice(monsterFighting, 1);

    if(player.health <= 0) {
        $("#modalStartTitle").html("You are dead!<br>Restart now?");
        $("#modalIntro").modal();
    }
});

function checkFight(){
    for(var c=0; c<monsters.length; c++) {

        if(monsters[c].x == player.x && monsters[c].y == player.y){
            running = false;
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
}

function  checkFinal(){
    if(player.x == SIZE-1 && player.y == SIZE-1){
        $("#modalStartTitle").html("You have won!");
        $("#modalIntro").modal();
    }
}