var fieldType = {
    empty : 0,
    wall : 1,
    final: 2
};

function Field(){
    this._size = 0;
    this.field = new Array(0);

    this.generateField = function(size){
        console.log(new Date(), new Date().getMilliseconds());

        this._size = size;
        this.field = new Array(this._size);
        for (var x = 0; x < this._size; x++) {
            this.field[x] = new Array(this._size);
            for(var y = 0; y < this._size; y++){

                var fieldRandom = Math.random() * 100;

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

                                try {
                                    this.field[xDelete][yDelete] = fieldType.empty;
                                } catch (e) {
                                }
                            }

                        }
                    }
                }
            }
        }


        this.field[SIZE-1][SIZE-1] = fieldType.final;
        console.log(new Date(), new Date().getMilliseconds());
    };

    this.get = function(x,y){
        if(x>=0 && y>=0 && x<SIZE && y<SIZE)
            return this.field[x][y];
        else
            return fieldType.wall;

    }
}