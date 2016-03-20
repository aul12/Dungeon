function Inventory(){
    var items = [];

    this.add = function(item){
        items.push(item);
    };

    this.get = function (index) {
        return items[index];
    };

    this.show = function(id){
        var text = "<table class=\"table table-striped\">";
        text += "<tr><th>Name</th><th>Stability</th><th>Attack</th><th>Defense</th></tr>";
        for(var c=0; c<items.length; c++){
            text += items[c].getTableLine();
        }
        text += "</table>";

        $(id).html(text);
    }
}