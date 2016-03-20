function Inventory(){
    var items = [];

    this.add = function(item){
        items.push(item);
    };

    this.get = function (index) {
        return items[index];
    }
}