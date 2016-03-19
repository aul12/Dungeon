function startRender(size){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, (window.innerWidth)/(window.innerHeight), 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1.5);
    scene.add( light );

    renderer.setClearColor( 0xffffff, 1 );

    var geometry = new THREE.BoxGeometry(100, 100, 0);
    var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
    var floor = new THREE.Mesh( geometry, material );
    floor.position.z = 0;
    scene.add(floor);


    var cubes = new Array(size);
    var cubeGeometry= new THREE.BoxGeometry(1, 1, 1);
    var cubeMaterialEmpty = new THREE.MeshLambertMaterial( { color: 0xffffff, wireframe: false } );
    var cubeMaterialWall = new THREE.MeshLambertMaterial( { color: 0x000000} );

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
            }
            cubes[x][y].position.set(x - size/2 +0.5, y - size/2 +0.5, 0.5);

            scene.add(cubes[x][y]);
        }
    }

    camera.position.z = 100;
    camera.rotation.x = Math.PI;



    var geometryMonster = new THREE.CylinderGeometry(0.4, 0.4, 0.6, 16);
    var materialMonster = new THREE.MeshBasicMaterial( {color: 0xff0000} );
    var monsterCylinders = [];
    for(var c=0; c<monsters.length; c++){
        monsterCylinders.push(new THREE.Mesh( geometryMonster, materialMonster ));
        monsterCylinders[c].rotation.x = Math.PI/2;
        monsterCylinders[c].position.set(monsters[c].x - size/2 +0.5, monsters[c].y - size/2 +0.5, 0.3);
        scene.add( monsterCylinders[c] );
    }


    var render = function () {
        requestAnimationFrame( render );

        camera.position.set(player.x - size/2 +0.5, player.y - size/2 +0.5,0.5);

        camera.rotation.x = 0;
        camera.rotation.y = 0;

        camera.rotation.z = player.rotation*Math.PI/2;

        switch(player.rotation){
             case 0:
                camera.rotation.x = 1;
                break;
            case 1:
                camera.rotation.y = 1;
                break;
            case 2:
                camera.rotation.x = -1;
                break;
            case 3:
                camera.rotation.y = -1;
                break;
        }


        for(var c=0; c<monsters.length; c++)
            monsterCylinders[c].position.set(monsters[c].x - size/2 +0.5, monsters[c].y - size/2 +0.5, 0.3);



        renderer.render(scene, camera);
    };

    render();
}

