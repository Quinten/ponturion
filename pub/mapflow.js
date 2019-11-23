var maps = [];

var id = 0;

function getNextId() {
    return id++;
}

function createMap(x, y) {
    return {
        id: getNextId(),
        x: x,
        y: y,
        data: undefined
    };
}

const wall = 1;
const mapSize = 20;
const weights = [
    1, 1, 1, 1, 0, 1, 0, 0,
    2, 2, 0, 0, 0, 1, 0, 0,
    2, 2, 0, 0, 0, 1, 0, 0,
    2, 2, 0, 0, 0, 1, 0, 0
];
const tiles = [
    0, 32, 32, 35,
    32, 37, 38, 39,
    32, 41, 42, 43,
    44, 45, 46, 48,
    34, 36, 40, 33
];

function fillMap(map) {
    var leftMap = getMap(map.x - 1, map.y);
    var upMap = getMap(map.x, map.y - 1);
    let data = [];
    let row = [];
    if (upMap && upMap.rawData) {
        for (let x = 0; x < mapSize; x++) {
            let tile = 0;
            if (upMap.rawData[mapSize - 1][x]) {
                tile = 1;
            }
            row.push(tile);
        }
    } else {
        for (let x = 0; x < mapSize; x++) {
            let tile = (Math.round(Math.random()) ? 0 : wall);
            row.push(tile);
        }
    }
    data.push(row);
    for (let y = 1; y < mapSize; y++) {
        row = [];
        data.push(row);
        for (let x = 0; x < mapSize; x++) {
            // idea 1
            /*
            let tile = (Math.round(Math.random()) ? 0 : wall);
            if ((x > 0) && (y > 0)) {
                if ((tile === data[y - 1][x - 1]) && (tile !== data[y][x - 1]) && (tile !== data[y - 1][x])) {
                    tile = data[y][x - 1];
                }
                if (x > 1 && !tile && !data[y][x - 2] && data[y][x - 1]) {
                   data[y][x - 1] = 0;
                }
                if (y > 2 && !tile && !data[y - 2][x] && !data[y - 1][x] &&!data[y - 3][x]) {
                   tile = wall;
                }
                if (y > 1 && !tile && !data[y - 2][x] && data[y - 1][x]) {
                   data[y - 1][x] = 0;
                   tile = wall;
                }
            }
            */
            // idea 2
            /*
            let tile = 0;
            //if (y > 0) {
                tile = (Math.round(Math.random()) ? 0 : wall);
            //}
            if (y > 2 && !data[y - 3][x] && !data[y - 2][x] && !data[y - 1][x]) {
                tile = wall;
                if (x > 0) {
                    data[y][x - 1] = wall;
                    data[y - 1][x - 1] = wall;
                }
            }
            if (y > 0 && x > 0 && !tile && !data[y - 1][x - 1] && data[y - 1][x] && data[y][x - 1]) {
                data[y - 1][x] = 0;
                if (y > 2) {
                    data[y - 2][x] = 0;
                }
            }*/
            // idea 3
            let tile = 0;
            if (x === 0 && leftMap && leftMap.rawData) {
                tile = leftMap.rawData[y][mapSize - 1];
            } else if (x === 0 || y < 3) {
                tile = (Math.round(Math.random()) ? 0 : wall);
                if ((x > 0) && (y > 0)) {
                    if ((tile === data[y - 1][x - 1]) && (tile !== data[y][x - 1]) && (tile !== data[y - 1][x])) {
                        tile = data[y][x - 1];
                    }
                }
            } else {
                let weight = 0;
                if (data[y][x - 1]) {
                    weight += 1;
                }
                if (data[y - 1][x - 1]) {
                    weight += 2;
                }
                if (data[y - 1][x]) {
                    weight += 4;
                }
                if (data[y - 2][x]) {
                    weight += 8;
                }
                if (data[y - 3][x]) {
                    weight += 16;
                }
                tile = weights[weight];
                if (tile === 2) {
                    tile = (Math.round(Math.random()) ? 0 : wall);
                }
                if (weight === 2) {
                    data[y][x - 1] = wall;
                    // super rare
                    if (x === 1 && leftMap && leftMap.rawData && !leftMap.rawData[y][mapSize - 1]) {
                        data[y][x - 1] = 0;
                        tile = 0;
                    }
                }
            }

            row.push(tile);
        }
    }
    // block of the sides
    /*
    for (let x = 0; x < mapSize; x++) {
        data[0][x] = wall;
        data[mapSize - 1][x] = wall;
        let y = 1;
        while(!data[y][x]) {
            data[y][x] = wall;
            y++;
        }
        y = mapSize - 2;
        while(!data[y][x]) {
            data[y][x] = wall;
            y--;
        }
    }
    for (let y = 0; y < mapSize; y++) {
        data[y][0] = wall;
        data[y][mapSize - 1] = wall;
        let x = 1;
        while(!data[y][x]) {
            data[y][x] = wall;
            x++;
        }
        x = mapSize - 2;
        while(!data[y][x]) {
            data[y][x] = wall;
            x--;
        }
    }
    */
    // connect maps
    var downMap = getMap(map.x, map.y + 1);
    if (downMap && downMap.rawData) {
        for (let x = 0; x < mapSize; x++) {
            if (!downMap.rawData[0][x]) {
                data[mapSize - 1][x] = 0;
            } else {
                data[mapSize - 1][x] = wall;
                let y = mapSize - 2;
                while (y >= 0 && !data[y][x]) {
                    data[y][x] = wall;
                    y--;
                }
            }
        }
    }
    var rightMap = getMap(map.x + 1, map.y);
    if (rightMap && rightMap.rawData) {
        for (let y = 0; y < mapSize; y++) {
            if (rightMap.rawData[y][0]) {
                data[y][mapSize - 1] = wall;
            } else {
                data[y][mapSize - 1] = 0;
                let x = mapSize - 2;
                while (x >= 0 && data[y][x]) {
                    data[y][x] = 0;
                    x--;
                }
            }
        }
    }
    // expand map
    let expandedData = [];
    for (let y = 0; y < mapSize * 3; y++) {
        let row = [];
        expandedData.push(row);
        for (let x = 0; x < mapSize * 3; x++) {
            let tile = (data[Math.floor(y / 3)][Math.floor(x / 3)]) ? 63 : 0;
            row.push(tile);
        }
    }
    // autotile
    let tileData = [];
    for (let y = 0; y < mapSize * 3; y++) {
        let row = [];
        tileData.push(row);
        for (let x = 0; x < mapSize * 3; x++) {
            let tile = 0;
            if (expandedData[y][x]) {
                let weight = 0;
                if (y === 0 || expandedData[y - 1][x]) {
                    weight += 1;
                }
                if (x === (mapSize * 3 - 1) || expandedData[y][x + 1]) {
                    weight += 2;
                }
                if (y === (mapSize * 3 - 1) || expandedData[y + 1][x]) {
                    weight += 4;
                }
                if (x === 0 || expandedData[y][x - 1]) {
                    weight += 8;
                }
                if (weight === 15) {
                    if (y > 0 && x > 0 && !expandedData[y - 1][x - 1]) {
                        weight += 1;
                    }
                    if (y > 0 && x < ((mapSize * 3) - 1) && !expandedData[y - 1][x + 1]) {
                        weight += 2;
                    }
                    if (y < ((mapSize * 3) - 1) && x < ((mapSize * 3) - 1) && !expandedData[y + 1][x + 1]) {
                        weight += 3;
                    }
                    if (y < ((mapSize * 3) - 1) && x > 0  && !expandedData[y + 1][x - 1]) {
                        weight += 4;
                    }
                }
                tile = tiles[weight];
            }
            row.push(tile);
        }
    }
    map.rawData = data;
    map.data = tileData;
}

function initMaps() {

    maps = [];
    id = 0;

    for (var i = 0; i < 9; i++) {
        maps.push(createMap(i % 3, Math.floor(i / 3) % 3));
    }

    for (var i = 9; i < 12; i++) {
        maps.push(createMap(i - 9, -1));
    }

    for (var i = 12; i < 15; i++) {
        maps.push(createMap(3, i % 3));
    }

    for (var i = 15; i < 18; i++) {
        maps.push(createMap(17 - i, 3));
    }

    for (var i = 18; i < 21; i++) {
        maps.push(createMap(-1, 20 - i));
    }

    maps.forEach(fillMap);
}

function refillMaps() {
    maps.forEach(function (map) {
        if (!map.data) {
            fillMap(map);
        }
    });
}

function getMap(x, y) {
    var foundMap = undefined;
    maps.forEach(function (map) {
        if (!foundMap && map.x === x && map.y === y) {
            foundMap = map;
        }
    });
    return foundMap;
}

function moveUp() {

    var mapping = [9, 10, 11, 0, 1, 2, 3, 4, 5, -1, -1, -1, -1, 12, 13, 8, 7, 6, 19, 20, -1];

    var newMaps = [];
    mapping.forEach(function (i, index) {
        if (i === -1) {
            newMaps.push(createMap(maps[index].x, maps[index].y - 1));
        } else {
            newMaps.push(maps[i]);
        }
    });

    var remove = maps.slice(6, 9);
    maps = newMaps;
    var add = maps.slice(0, 3);
    postMessage({
        current: maps[4].id,
        add: add,
        remove: remove
    });
    refillMaps();
}

function moveRight() {

    var mapping = [1, 2, 12, 4, 5, 13, 7, 8, 14, 10, 11, -1, -1, -1, -1, -1, 15, 16, 6, 3, 0];

    var newMaps = [];
    mapping.forEach(function (i, index) {
        if (i === -1) {
            newMaps.push(createMap(maps[index].x + 1, maps[index].y));
        } else {
            newMaps.push(maps[i]);
        }
    });

    var remove = [maps[0], maps[3], maps[6]];
    maps = newMaps;
    var add = [maps[2], maps[5], maps[8]];
    postMessage({
        current: maps[4].id,
        add: add,
        remove: remove
    });
    refillMaps();
}

function moveDown() {

    var mapping = [3, 4, 5, 6, 7, 8, 17, 16, 15, 0, 1, 2, 13, 14, -1, -1, -1, -1, -1, 18, 19];

    var newMaps = [];
    mapping.forEach(function (i, index) {
        if (i === -1) {
            newMaps.push(createMap(maps[index].x, maps[index].y + 1));
        } else {
            newMaps.push(maps[i]);
        }
    });

    var remove = maps.slice(0, 3);
    maps = newMaps;
    var add = maps.slice(6, 9);
    postMessage({
        current: maps[4].id,
        add: add,
        remove: remove
    });
    refillMaps();
}

function moveLeft() {

    var mapping = [20, 0, 1, 19, 3, 4, 18, 6, 7, -1, 9, 10, 2, 5, 8, 16, 17, -1, -1, -1, -1];

    var newMaps = [];
    mapping.forEach(function (i, index) {
        if (i === -1) {
            newMaps.push(createMap(maps[index].x - 1, maps[index].y));
        } else {
            newMaps.push(maps[i]);
        }
    });

    var remove = [maps[2], maps[5], maps[8]];
    maps = newMaps;
    var add = [maps[0], maps[3], maps[6]];
    postMessage({
        current: maps[4].id,
        add: add,
        remove: remove
    });
    refillMaps();
}

onmessage = function(e) {

    switch (e.data.event) {
        case 'init':
            initMaps();
            postMessage({
                current: maps[4].id,
                add: maps.slice(0, 9),
                remove: []
            });
            break;
        case 'moveup':
            moveUp();
            break;
        case 'moveright':
            moveRight();
            break;
        case 'movedown':
            moveDown();
            break;
        case 'moveleft':
            moveLeft();
            break;
    }
}
