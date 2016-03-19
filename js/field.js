var fieldType = {
    empty : 0,
    wall : 1
};

function Field(){
    this._size = 0;
    this.field = new Array(0);

    this.generateField = function(size){
        this._size = size;
        this.field = new Array(this._size);
        for (var x = 0; x < this._size; x++) {
            this.field[x] = new Array(this._size);
            for(var y = 0; y < this._size; y++){

                var fieldRandom = Math.random() * 100;

                if(fieldRandom < 25)
                    this.field[x][y] = fieldType.wall;
                else
                    this.field[x][y] = fieldType.empty;

            }
        }
    };

    this.get = function(x,y){
        try {
            return this.field[x][y];
        } catch (e) {
            return fieldType.wall;
        }

    }
}