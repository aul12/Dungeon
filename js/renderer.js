var itemMesh = [];
var monsterCylinders = [];
var scene = new THREE.Scene();

function startRender(size){

    var camera = new THREE.PerspectiveCamera( 75, (window.innerWidth)/(window.innerHeight), 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1.8);
    scene.add( light );

    renderer.setClearColor( 0x7EC0EE, 1 );

    var geometry = new THREE.BoxGeometry(size, size, 0);
    var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
    var floor = new THREE.Mesh( geometry, material );
    floor.position.z = 0;
    scene.add(floor);


    var cubes = new Array(size);
    var cubeGeometry= new THREE.BoxGeometry(1, 1, 1);
    var cubeMaterialEmpty = new THREE.MeshLambertMaterial( { color: 0xffffff} );
    var cubeMaterialWall = new THREE.MeshLambertMaterial( { color: 0x2B292E} );
    var cubeMaterialFinal = new THREE.MeshLambertMaterial( { color: 0x00ff00, opacity: 0.5, transparent: true});

    for (var x = 0; x < size; x++) {
        cubes[x] = new Array(size);
        for(var y = 0; y < size; y++){
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
            cubes[x][y].position.set(x - size/2 +0.5, y - size/2 +0.5, 0.5);

            scene.add(cubes[x][y]);
        }
    }

    camera.position.z = 30;



    var geometryMonster = new THREE.CylinderGeometry(0.4, 0.4, 0.6, 16);
    var materialMonster = new THREE.MeshPhongMaterial( {color: 0x00ff00, opacity: 0.9, transparent: true} );

    for(var c=0; c<monsters.length; c++){
        monsterCylinders.push(new THREE.Mesh( geometryMonster, materialMonster ));
        monsterCylinders[c].rotation.x = Math.PI/2;
        monsterCylinders[c].position.set(monsters[c].x - size/2 +0.5, monsters[c].y - size/2 +0.5, 0.3);
        scene.add( monsterCylinders[c] );
    }

    var itemGeometry = new THREE.OctahedronGeometry(0.4);
    var itemMaterial = new THREE.MeshPhongMaterial( {color: 0xFFD700});

    for(var c=0; c<items.length; c++){
        itemMesh.push(new THREE.Mesh( itemGeometry, itemMaterial ));
        itemMesh[c].position.set(items[c].x - size/2 +0.5, items[c].y - size/2 +0.5, 0.4);
        scene.add(itemMesh[c]);
    }


    var render = function () {
        requestAnimationFrame( render );

        camera.position.set(player.x - size/2 +0.5, player.y - size/2 +0.5,0.5);

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
            monsterCylinders[c].position.set(monsters[c].x - size/2 +0.5, monsters[c].y - size/2 +0.5, 0.3);



        renderer.render(scene, camera);
    };

    render();
}

