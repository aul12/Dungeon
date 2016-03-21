setInterval(function(){
    if(running){
        for(var c=0; c<monsters.length; c++) {
            if(Math.abs(player.x - monsters[c].x) < 3 && Math.abs(player.y - monsters[c].y) < 3){
                console.log("XY");
                if(Math.abs(player.x - monsters[c].x)>Math.abs(player.y - monsters[c].y)){
                    if(monsters[c].x > player.x)
                        monsters[c].rotation = 1;
                    else
                        monsters[c].rotation = 3;
                }else{
                    if(monsters[c].y > player.y)
                        monsters[c].rotation = 2;
                    else
                        monsters[c].rotation = 0;
                }
            }else{
                if((Math.random() * 100) > 50)
                    monsters[c].turnLeft();
            }

            monsters[c].forward();
        }
    }

    checkFight();
}, 800);
