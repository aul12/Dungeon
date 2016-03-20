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
        checkItem();
    }
};