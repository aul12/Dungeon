var playerRotation = 0;

document.onkeydown = function (event) {
    if (running) {
        switch (event.code) {
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
            case "KeyE":
                inventory.show("#modalInventoryBody");

                $('#modalInventar').modal('toggle');
                break;
        }
        checkFight();
        checkItem();
        checkFinal();
    }
    switch (event.code) {
        case "Space":
            if ($('#startButton').is(':visible')) {
                $('#startButton').click();
            }
            if ($('#btnFight').is(':visible')) {
                $('#btnFight').click();
            }
    }
};

$(function () {
    if (running) {
        //Enable swiping...
        $("body").swipe({
            //Generic swipe handler for all directions
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                switch (direction) {
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
            threshold: 75
        });
    }
});
