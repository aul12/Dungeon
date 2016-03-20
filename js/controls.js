var playerRotation = 0;

document.onkeypress = function(event){
    if(running){
        switch(event.code){
            case "KeyW":
                player.forward();
                break;
            case "KeyA":
                player.turnLeft();
                playerRotation = -1;
                break;
            case "KeyS":
                player.backward();
                break;
            case "KeyD":
                player.turnRight();
                playerRotation = 1;
                break;
            case "KeyI":
                inventory.show("#modalInventoryBody");

                $('#modalInventar').modal('toggle');
        }

        checkFight();
        checkItem();
    }
};