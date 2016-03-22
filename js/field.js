var fieldType = {
    empty : 0,
    wall : 1,
    final: 2
};

function Field(){
    this._size = 0;
    this.field = new Array(0);

    this.generateField = function(size){
        var beginTime = new Date();

        this._size = size;
        this.field = new Array(this._size);
        for (var x = 0; x < this._size; x++) {
            this.field[x] = new Array(this._size);
            for(var y = 0; y < this._size; y++){

                var fieldRandom = Math.random() * 100;

                //If the number is higher the ways are more straight,
                //is the number lower is lower the walls are only small islands
                if(fieldRandom < 80)
                    this.field[x][y] = fieldType.wall;
                else
                    this.field[x][y] = fieldType.empty;

            }
        }

        this.field[0][0] = fieldType.empty;
        this.field[0][1] = fieldType.empty;
        this.field[1][0] = fieldType.empty;
        this.field[1][1] = fieldType.empty;
        this.field[size-2][size-1] = fieldType.empty;
        this.field[size-1][size-2] = fieldType.empty;
        this.field[size-2][size-2] = fieldType.empty;
        this.field[size-1][size-1] = fieldType.empty;

        var change = true;

        while(change){
            change = false;

            for (var x = 0; x < this._size; x++) {
                for (var y = 0; y < this._size; y++) {
                    if (this.field[x][y] == fieldType.empty) {
                        var blocked = new Array(0);

                        //Count ways which are blocked
                        if (this.get(x - 1, y) == fieldType.wall)
                            blocked.push(0);
                        if (this.get(x + 1, y) == fieldType.wall)
                            blocked.push(1);
                        if (this.get(x, y - 1) == fieldType.wall)
                            blocked.push(2);
                        if (this.get(x, y + 1) == fieldType.wall)
                            blocked.push(3);

                        //Less than two ways are connected
                        if (blocked.length > 2) {

                            change = true;

                            var dist = new Array(blocked.length);

                            //Calculate the distance in every direction
                            for (var c = 0; c < blocked.length; c++) {

                                dist[c] = 1;

                                var xTry, yTry;

                                //Check distance to next empty space
                                for (var i = 0; i < SIZE; i++) {
                                    xTry = x;
                                    yTry = y;

                                    dist[c]++;
                                    switch (blocked[c]) {
                                        case 0:
                                            xTry -= dist[c];
                                            break;
                                        case 1:
                                            xTry += dist[c];
                                            break;
                                        case 2:
                                            yTry -= dist[c];
                                            break;
                                        case 3:
                                            yTry += dist[c];
                                            break;
                                    }
                                    if (this.get(xTry, yTry) != fieldType.wall)
                                        break;
                                }
                            }

                            var minDistIndex = 0;

                            //Find minimum distance
                            for (var c = 0; c < dist.length; c++) {
                                if (dist[c] < dist[minDistIndex])
                                    minDistIndex = c;
                            }

                            var xDelete = x;
                            var yDelete = y;

                            //Delete blocks to next empty space
                            for (var c = 0; c < dist[minDistIndex]; c++) {
                                switch (blocked[minDistIndex]) {
                                    case 0:
                                        xDelete--;
                                        break;
                                    case 1:
                                        xDelete++;
                                        break;
                                    case 2:
                                        yDelete--;
                                        break;
                                    case 3:
                                        yDelete++;
                                        break;
                                }

                                if (xDelete >= 0 && yDelete >= 0 && xDelete < SIZE && yDelete < SIZE)
                                    this.field[xDelete][yDelete] = fieldType.empty;
                            }

                        }
                    }
                }
            }
        }

        //Field should be ready, in some cases you still can't get to the exit
        var tester = new Creature(0,0,0);
        var minX=0, minY=0;
        var minDist = SIZE+SIZE;

        //Do this until we don't have to change anything anymore
        do{
            change = false;

            //Always following the right wall
            //If we get to the exit everything is OK, if we get back to the beginning we can't get to the exit
            while(!(tester.x == SIZE-1 && tester.y == SIZE-1)){
                tester.turnRight();
                while(tester.fieldInFront() == fieldType.wall)
                    tester.turnLeft();
                tester.forward();

                var dx = tester.x - (SIZE-1);
                var dy = tester.y - (SIZE-1);
                var dist = Math.sqrt(dx*dx + dy*dy);

                if(dist < minDist){
                    minX = tester.x;
                    minY = tester.y;
                    minDist = dist;
                }

                //We are at the beginning again
                if(tester.x==0 && tester.y==0){
                    change = true;

                    //Find closest distance to next way in X and Y direction
                    for(var xDist=1; this.get(xDist + minX, minY)==fieldType.wall && xDist < SIZE; xDist++){
                        if(this.get(xDist + minX, minY-1)!=fieldType.wall || this.get(xDist + minX, minY+1)!=fieldType.wall)
                            break;
                    }
                    for(var yDist=1; this.get(minX, yDist + minY)==fieldType.wall && yDist < SIZE; yDist++){
                        if(this.get(minX-1, yDist + minY)!=fieldType.wall || this.get(minX+1, yDist + minY)!=fieldType.wall)
                            break;
                    }

                    console.log("Blocked", minX, minY);
                    console.log(xDist, yDist);

                    if(xDist < yDist){
                        for(;xDist > 0; xDist--){
                            this.field[minX + xDist][minY] = fieldType.empty;
                        }
                    }else{
                        for(;yDist > 0; yDist--){
                            this.field[minY][minY + yDist] = fieldType.empty;
                        }
                    }

                    break;
                }
            }
        }while(change);



        this.field[SIZE-1][SIZE-1] = fieldType.final;
        console.log(SIZE + " * " + SIZE + " Field generated in:" + (new Date() - beginTime));
    };

    this.get = function(x,y){
        /*
         *  There are situations, just after generating a new level where this throws errors,
         *  because SIZE is already larger but the field is still the old size.
         *  This probably is the best solution...
         */
        try {
            if (x >= 0 && y >= 0 && x < SIZE && y < SIZE)
                return this.field[x][y];
            else
                return fieldType.wall;
        } catch (e) {
            return fieldType.wall;
        }

    }
}