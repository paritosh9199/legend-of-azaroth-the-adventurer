var world = {
    RADIUS: 35,
    MAP_X: 19,  //Radius -1
    MAP_Y: 19,
    TERRAIN: {
        TREE: "<div class='tree-tile'>T</div>",
        BUSH: "<div class='bush-tile'>r</div>",
        SWAMP: "<div class='swamp-tile'>~</div>",
        BARRENLAND: "<div class='barren-tile'>.</div>",
        GRASSLAND: "<div class='grass-tile'>,</div>"
    },
    PLAYER: {
        PLAYER_TILE: "@"
    },
    LANDMARK: [],
    map: [],
    CACHE: [],
    NORTH: [0, -1],
    SOUTH: [0, 1],
    WEST: [-1, 0],
    EAST: [1, 0],

    init: function () {
        world.map = new Array(world.RADIUS);
        world.generateMap();
        world.printWorld();
        world.CACHE = world.map;
    },

    getMap: function (x, y) {
        return world.map[x + y * world.RADIUS];
    },

    setMap: function (x, y, data) {

        world.map[x + y * world.RADIUS] = data;
    },

    TERRAIN_POINTS: (Math.floor((Math.random() * 6) + 1)),

    generateMap: function () {
        var i = 0, j = 0;


        world.placeLandmark();


        for (j = 0; j < world.RADIUS; j++) {
            for (i = 0; i < world.RADIUS; i++) {
                //algo for generating the map
                // console.log(!world.isTerrain(i, j));
                if (!world.isTerrain(i, j)) {
                    var rand = Math.floor((Math.random() * world.objLength(world.TERRAIN)))
                    var thumbnail = Object.values(world.TERRAIN)[rand]
                    var tile = Object.keys(world.TERRAIN)[rand]
                    // console.log("tile", tile, thumbnail)
                    // thumbnail = ".";
                    world.setMap(i, j, thumbnail);
                }
            }
        }

    },

    isTerrain: function (x, y) {
        var tile = world.getMap(x, y)
        return tile == "." ||
            tile == "," ||
            tile == "r" ||
            tile == "~" ||
            tile == "T"
    },

    placeLandmark: function () {
        var terrain = [world.TERRAIN.BARRENLAND,world.TERRAIN.BUSH,world.TERRAIN.GRASSLAND,world.TERRAIN.SWAMP,world.TERRAIN.TREE];

        // world.LANDMARK = new Array(world.TERRAIN_POINTS);

        // console.log("Terrain", world.TERRAIN_POINTS)
        for (i = 0; i < world.TERRAIN_POINTS; i++) {
            var x = Math.floor(Math.random() * world.RADIUS)
            var y = Math.floor(Math.random() * world.RADIUS)
            var landmark = {
                x,
                y
            }
            world.LANDMARK[i] = landmark;
        }

        // console.log(world.LANDMARK)
        shuffle(terrain);
        for (i = 0; i < world.TERRAIN_POINTS; i++) {
            var x = world.LANDMARK[i].x;
            var y = world.LANDMARK[i].y;
            var thumbnail = terrain[(i + 1) % terrain.length]
            // console.log("terrain", thumbnail)

            world.setMap(x, y, thumbnail)

            var xRad, yRad, xnRad, ynRad;
            xRad = Math.floor((Math.random() * (world.RADIUS / 4)) + 1)
            yRad = Math.floor((Math.random() * (world.RADIUS / 4)) + 1)
            xnRad = Math.floor((Math.random() * (world.RADIUS / 4)) + 1)
            ynRad = Math.floor((Math.random() * (world.RADIUS / 4)) + 1)

            // console.log(xRad, yRad, xnRad, ynRad)

            var j = 0

            // north
            for (j = 1; j <= yRad; j++) {
                var xc = x;
                var yc = y - j;
                if (xc < 0 || xc >= world.MAP_X || yc < 0 || yc >= world.MAP_X) {
                    // console.log('continued n')
                    continue;
                }
                world.setMap(xc, yc, thumbnail)
                world.setMap(xc, yc + 1, thumbnail)
                world.setMap(xc, yc + 2, thumbnail)
                world.setMap(xc, yc + 3, thumbnail)
                world.setMap(xc, yc - 1, thumbnail)
                world.setMap(xc, yc - 2, thumbnail)
                world.setMap(xc, yc - 3, thumbnail)
            }

            // south
            for (j = 1; j <= ynRad; j++) {
                var xc = x;
                var yc = y + j;
                if (xc < 0 || xc >= world.MAP_X || yc < 0 || yc >= world.MAP_X) {
                    // console.log('continued s')
                    continue;
                }
                world.setMap(xc, yc, thumbnail)
                world.setMap(xc, yc + 1, thumbnail)
                world.setMap(xc, yc + 2, thumbnail)
                world.setMap(xc, yc + 3, thumbnail)
                world.setMap(xc, yc - 1, thumbnail)
                world.setMap(xc, yc - 2, thumbnail)
                world.setMap(xc, yc - 3, thumbnail)
            }

            // east
            for (j = 1; j <= xRad; j++) {
                var xc = x - j;
                var yc = y;
                if (xc < 0 || xc >= world.MAP_X || yc < 0 || yc >= world.MAP_X) {
                    // console.log('continued e')
                    continue;
                }
                world.setMap(xc, yc, thumbnail)
                world.setMap(xc + 1, yc, thumbnail)
                world.setMap(xc + 2, yc, thumbnail)
                world.setMap(xc + 3, yc, thumbnail)
                world.setMap(xc - 1, yc, thumbnail)
                world.setMap(xc - 2, yc, thumbnail)
                world.setMap(xc - 3, yc, thumbnail)
            }

            // west
            for (j = 1; j <= xnRad; j++) {
                var xc = x + j;
                var yc = y;
                if (xc < 0 || xc >= world.MAP_X || yc < 0 || yc >= world.MAP_X) {
                    // console.log('continued w')
                    continue;
                }

                world.setMap(xc, yc, thumbnail)
                world.setMap(xc + 1, yc, thumbnail)
                world.setMap(xc + 2, yc, thumbnail)
                world.setMap(xc + 3, yc, thumbnail)
                world.setMap(xc - 1, yc, thumbnail)
                world.setMap(xc - 2, yc, thumbnail)
                world.setMap(xc - 3, yc, thumbnail)
            }


        }
        // for (i = 0; i < world.TERRAIN_POINTS; i++) {
        //     var x = world.LANDMARK[i].x;
        //     console.log(world.LANDMARK)
        //     var y = world.LANDMARK[i].y;
        //     var rand = Math.floor((Math.random() * world.objLength(world.TILE)))
        //     var thumbnail = Object.values(world.TILE)[rand]
        //     var tile = Object.keys(world.TILE)[rand]
        //     world.setMap(x, y, thumbnail);




        //     for (i = 0; i < yRad; i++) {
        //         //south
        //         var xcoord = 0
        //         var ycoord = y + i + 1;
        // if (xcoord < 0 || xcoord > world.MAP_X || ycoord < 0 || ycoord > world.MAP_X) {
        //     console.log('continued')
        //     break;
        // }
        //         // if (!world.isTerrain(xcoord, ycoord)) {
        //         world.setMap(xcoord, ycoord, thumbnail)
        //         // }
        //     }

        //     for (i = 0; i < ynRad; i++) {
        //         //north
        //         var xcoord = 0
        //         var ycoord = y - (i + 1);
        //         if (xcoord < 0 || xcoord > world.MAP_X || ycoord < 0 || ycoord > world.MAP_X) {
        //             console.log('continued')

        //             break;
        //         }
        //         // if (!world.isTerrain(xcoord, ycoord)) {
        //         console.log(xcoord, ycoord, thumbnail)
        //         world.setMap(xcoord, ycoord, thumbnail)
        //         // }
        //     }

        //     for (i = 0; i < xRad; i++) {
        //         //east
        //         var xcoord = x + (i + 1);
        //         var ycoord = 0;
        //         if (xcoord < 0 || xcoord > world.MAP_X || ycoord < 0 || ycoord > world.MAP_X) {
        //             console.log('continued')

        //             break;
        //         }
        //         // if (!world.isTerrain(xcoord, ycoord)) {
        //         console.log(xcoord, ycoord, thumbnail)

        //         world.setMap(xcoord, ycoord, thumbnail)
        //         // }
        //     }

        //     for (i = 0; i < xnRad; i++) {
        //         //west
        //         var xcoord = x - (i + 1);
        //         var ycoord = y + i + 1;
        //         if (xcoord < 0 || xcoord > world.MAP_X || ycoord < 0 || ycoord > world.MAP_X) {
        //             console.log('continued')

        //             break;
        //         }
        //         // if (!world.isTerrain(xcoord, ycoord)) {
        //         console.log(xcoord, ycoord, thumbnail)

        //         world.setMap(xcoord, ycoord, thumbnail)
        //         // }
        //     }
        // }
    },
    printWorld: function () {
        // console.log('map something')
        var i = 0;

        _i('gameWorld').innerHTML = ""
        for (j = 0; j < world.RADIUS; j++) {
            for (i = 0; i < world.RADIUS; i++) {
                // var str = "|"+i+","+j+"|"
                // process.stdout.write(str)
                _i('gameWorld').innerHTML+=(world.getMap(i, j))
            }
            // _i('gameWorld').innerHTML+="<br>";
        }
    },
    objLength: function (obj) {
        var count = 0;

        for (var property in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, property)) {
                count++;
            }
        }

        return count;
    }
}

// console.log(Math.floor((Math.random() * 5) + 1))
//North
// x: 0,y: -1

// south
// 0,1

// east
// 1,0

// west
// -1,0
// console.log(world.objLength(world.TILE))

// world.generateMap()
// world.printWorld()
// world.placeLandmark()
// console.log(world.getMap(10, 10))
// console.log(world.isTerrain(10, 10))
world.init()

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var player = {
    init: function(){
        var i = Math.floor(world.RADIUS/2);
        var j = Math.floor(world.RADIUS/2);
        world.setMap(i,j,world.PLAYER.PLAYER_TILE);
        player.CURR_POS = [i,j]
    },
    CURR_POS:[],
    HP:100,
    MP:100,
    playerHealth: function () {

    },

    moveNorth: function(){ 
    
    },

    moveSouth: function(){

    },

    moveEast: function(){

    },

    moveWest: function(){

    }

}

player.init()