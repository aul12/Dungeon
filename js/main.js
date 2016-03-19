var dungeon = new Field();
var player = new Creature(0, 0, 100);
var monsters = [];

var running = true;
var monsterFighting = 0;

dungeon.generateField(100);

for (var x = 0; x < 100; x++) {
    for(var y = 0; y < 100; y++){
        var fieldRandom = Math.random() * 100;

        if(dungeon.get(x,y) == fieldType.empty && fieldRandom < 5){
            monsters.push(new Creature(x, y, Math.floor(Math.random()*80)));
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

document.onkeypress = function(event){
    if(running){
        switch(event.code){
            case "KeyW":
                player.forward();
                break;
            case "KeyA":
                player.turnLeft();
                break;
            case "KeyS":
                player.backward();
                break;
            case "KeyD":
                player.turnRight();
                break;
            case "KeyI":
                $('#modalInventar').modal();
        }

        checkFight();
    }

};

$("#btnFight").click(function(){
    running = true;
    $('#modalFight').modal('hide');
    player.health -= 10;
    monsters.splice(monsterFighting, 1);
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