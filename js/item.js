function Item(name, stability, attack, defense, x, y){
    this.name = name;
    this.stability = stability;
    this.attack = attack;
    this.defense = defense;
    this.x = x;
    this.y = y;

    this.getTableLine = function(){
        return "<tr><td>"+name+"</td><td>"+stability+"%</td><td>"+attack+"</td><td>"+defense+"</td></tr>";
    }
}