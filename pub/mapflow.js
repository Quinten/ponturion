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

function fillMap(map) {
    let data = [];
    for (let y = 0; y < 64; y++) {
        let row = [];
        data.push(row);
        for (let x = 0; x < 64; x++) {
            row.push(Math.floor(Math.random() * 64));
        }
    }
    map.data = data;
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
