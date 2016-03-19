function Creature(xPos, yPos, healthStart){
    this.x = xPos;
    this.y = yPos;
    this.rotation = 0;

    this.health = healthStart;

    this.forward = function(){
        var last_x = this.x;
        var last_y = this.y;

        switch(this.rotation){
            case 0:
                this.y++;
                break;
            case 1:
                this.x--;
                break;
            case 2:
                this.y--;
                break;
            case 3:
                this.x++;
        }

        if(dungeon.get(this.x,this.y) == fieldType.wall){
            this.x = last_x;
            this.y = last_y;
        }
    };

    this.backward = function(){
        var last_x = this.x;
        var last_y = this.y;

        switch(this.rotation){
            case 0:
                this.y--;
                break;
            case 1:
                this.x++;
                break;
            case 2:
                this.y++;
                break;
            case 3:
                this.x--;
        }

        if(dungeon.get(this.x,this.y) == fieldType.wall){
            this.x = last_x;
            this.y = last_y;
        }
    };

    this.turnRight = function(){
        this.rotation--;

        if(this.rotation < 0)
            this.rotation += 4;
    };

    this.turnLeft = function(){
        this.rotation++;

        if(this.rotation >= 4)
            this.rotation -= 4;
    }

}
