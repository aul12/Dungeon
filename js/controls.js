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
        checkFinal();
    }
};

$(function() {
    //Enable swiping...
    $("body").swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            switch(direction){
                case 'left':
                    player.turnRight();
                    playerRotation = 1;
                    break;
                case 'right':
                    player.turnLeft();
                    playerRotation = -1;
                    break;
                case 'up':
                    player.backward();
                    break;
                case 'down':
                    player.forward();
                    break;
            }
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold:75
    });
});
