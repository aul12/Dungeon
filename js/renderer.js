var itemMesh = [];
var monsterCylinders = [];
var lifeSphere = [];
var scene;

var camera = new THREE.PerspectiveCamera( 75, (window.innerWidth)/(window.innerHeight), 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({antialias: true});

function startRender(size){
    var c = document.getElementById("canvasCompass");
    var ctx = c.getContext("2d");

    scene = null;
    scene = new THREE.Scene();

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1.8);
    scene.add( light );

    renderer.setClearColor( 0x007EC0, 1 );

    camera.position.z = 30;

    var geometry = new THREE.BoxGeometry(SIZE, SIZE, 0);
    var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
    var floor = new THREE.Mesh( geometry, material );
    floor.position.z = 0;
    scene.add(floor);


    var cubes = new Array(SIZE);
    var cubeGeometry= new THREE.BoxGeometry(1, 1, 1);
    var cubeMaterialEmpty = new THREE.MeshLambertMaterial( { color: 0xffffff} );
    var cubeMaterialWall = new THREE.MeshLambertMaterial( { color: 0x2B292E} );
    var cubeMaterialFinal = new THREE.MeshBasicMaterial( { color: 0x00ff00, opacity: 0.5, transparent: true});

    for (var x = 0; x < SIZE; x++) {
        cubes[x] = new Array(SIZE);
        for(var y = 0; y < SIZE; y++){
            switch(dungeon.get(x,y)){
                case fieldType.empty:
                    cubes[x][y] = new THREE.Mesh( cubeGeometry, cubeMaterialEmpty );
                    cubes[x][y].visible = false;
                    break;
                case fieldType.wall:
                    cubes[x][y] = new THREE.Mesh( cubeGeometry, cubeMaterialWall );
                    break;
                case fieldType.final:
                    cubes[x][y] = new THREE.Mesh( cubeGeometry, cubeMaterialFinal );
                    break;
            }
            cubes[x][y].position.set(x - SIZE/2 +0.5, y - SIZE/2 +0.5, 0.5);

            scene.add(cubes[x][y]);
        }
    }





    var geometryMonster = new THREE.CylinderGeometry(0.4, 0.4, 0.6, 16);
    var materialMonster = new THREE.MeshPhongMaterial( {color: 0x6B0CE8} );

    for(var c=0; c<monsters.length; c++){
        monsterCylinders.push(new THREE.Mesh( geometryMonster, materialMonster ));
        monsterCylinders[c].rotation.x = Math.PI/2;
        monsterCylinders[c].position.set(monsters[c].x - SIZE/2 +0.5, monsters[c].y - SIZE/2 +0.5, 0.3);
        scene.add( monsterCylinders[c] );
    }

    var itemGeometry = new THREE.OctahedronGeometry(0.4);
    var itemMaterial = new THREE.MeshPhongMaterial( {color: 0xFDFF0D});

    for(var c=0; c<items.length; c++){
        itemMesh.push(new THREE.Mesh( itemGeometry, itemMaterial ));
        itemMesh[c].position.set(items[c].x - SIZE/2 +0.5, items[c].y - SIZE/2 +0.5, 0.4);
        scene.add(itemMesh[c]);
    }

    var geometryLife = new THREE.SphereGeometry(0.2);
    var materialLife = new THREE.MeshPhongMaterial( {color: 0xff0000} );
    for(var c=0; c<life.length; c++){
        lifeSphere.push(new THREE.Mesh( geometryLife, materialLife ));
        lifeSphere[c].position.set(life[c].x - SIZE/2 +0.5, life[c].y - SIZE/2 +0.5, 0.5);
        scene.add(lifeSphere[c]);
    }


    var render = function () {
        $("#statusLeft").html("Life: " +player.health+"%");

        var alpha = Math.atan2(SIZE-player.x, SIZE-player.y) + camera.rotation.z - Math.PI/2;
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.beginPath();
        ctx.arc(64,64,60,0,2*Math.PI);
        ctx.moveTo(ctx.canvas.width/2, ctx.canvas.height/2);

        ctx.lineTo(Math.cos(alpha)*60 + 64, Math.sin(alpha)*60 + 64);
        ctx.stroke();

        if(running)
            requestAnimationFrame( render );

        camera.position.set(player.x - SIZE/2 +0.5, player.y - SIZE/2 +0.5,0.5);

        camera.rotation.x = 0;
        camera.rotation.y = 0;

        camera.rotation.z %= Math.PI*2;
        if(camera.rotation.z < 0)
            camera.rotation.z += Math.PI*2;

        if(Math.abs(camera.rotation.z - (player.rotation*Math.PI/2))<0.5){
            camera.rotation.z = player.rotation*Math.PI/2;
        }else{
            if(playerRotation < 0)
                camera.rotation.z += 0.5;
            else {
                camera.rotation.z -= 0.5;
            }
        }

        camera.rotation.x = Math.PI/2 * Math.cos(camera.rotation.z);
        camera.rotation.y = Math.PI/2 * Math.sin(camera.rotation.z);

        for(var c=0; c<monsters.length; c++)
            monsterCylinders[c].position.set(monsters[c].x - SIZE/2 +0.5, monsters[c].y - SIZE/2 +0.5, 0.3);



        renderer.render(scene, camera);
    };

    render();
}

