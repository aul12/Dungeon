var dungeon = new Field();
var player = new Creature(0, 0, 100);
var inventory = new Inventory();
var monsters = [];
var items = [];

var running = true;
var monsterFighting = 0;

dungeon.generateField(100);

for (var x = 0; x < 100; x++) {
    for(var y = 0; y < 100; y++){
        var fieldRandom = Math.random() * 100;

        if(dungeon.get(x,y) == fieldType.empty){
            if(fieldRandom < 5)
                monsters.push(new Creature(x, y, Math.floor(Math.random()*80)));
            else if(fieldRandom < 8)
                items.push(new Item("Test", 100, 100, 100, x, y));
        }
    }
}

startRender(100);

function moveMonsters(){
    if(running){
        for(var c=0; c<monsters.length; c++) {
            if((Math.random() * 100) > 30)
                monsters[c].turnLeft();
            monsters[c].forward();
        }
    }

    checkFight();
}

setInterval(moveMonsters, 800);



$("#btnFight").click(function(){
    running = true;
    $('#modalFight').modal('hide');
    player.health -= 10;
    monsters.splice(monsterFighting, 1);
    scene.remove(monsterCylinders[monsterFighting]);
    monsterCylinders.splice(monsterFighting, 1);

    if(player.health <= 0) {
        alert("You are dead!\nRestart now?");
        location.reload();
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