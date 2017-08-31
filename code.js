(function () {
var canvas = document.getElementById('game');

var ctx = canvas.getContext('2d');

function Player() {
    var _ = this;

    _.x = 50;
    _.y = 50;
    _.vx = 0;
    _.vy = 0;
    _.speed = 1;
    _.w = 10;
    _.h = 10;
}

Player.prototype = {
    contains: function contains(x, y) {
        var _ = this;

        return (
            (_.x <= x && x <= _.x + _.w) &&
            (_.y <= y && y <= _.y + _.h)
        );
    },
    overlaps: function overlaps(player) {
        var _ = this;

        return (
            (
                (_.x <= player.x && player.x <= _.x + _.w) &&
                (_.y <= player.y && player.y <= _.y + _.h)
            ) ||
            (
                (_.x <= player.x + player.w && player.x + player.w <= _.x + _.w) &&
                (_.y <= player.y && player.y <= _.y + _.h)
            ) ||
            (
                (_.x <= player.x + player.w && player.x + player.w <= _.x + _.w) &&
                (_.y <= player.y + player.h && player.y + player.h <= _.y + _.h)
            ) ||
            (
                (_.x <= player.x && player.x <= _.x + _.w) &&
                (_.y <= player.y + player.h && player.y + player.h <= _.y + _.h)
            )
        );
    },
    move: function move() {
        var _ = this;

        _.x += _.vx * _.speed;
        _.y += _.vy * _.speed;
    }
};

var point = new Player();

function newPoint() {
    point.x = 10 + (canvas.width-20) * Math.random();
    point.y = 10 + (canvas.height-20) * Math.random();
}

var bestScore = 0;

var player = new Player();

function render() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    player.move();

    var edgeTouch = false;

    if (player.overlaps(point)) {
        player.speed -= 0.1;

        newPoint();
    }

    if (player.x <= 0) {player.x = 0; edgeTouch=true;}
    if (player.x + player.w >= canvas.width) {player.x = canvas.width - player.w; edgeTouch=true;}

    if (player.y <= 0) {player.y = 0; edgeTouch=true;}
    if (player.y + player.h >= canvas.height) {player.y = canvas.height - player.h; edgeTouch=true;}

    if (edgeTouch) {

        if (player.speed > bestScore) bestScore = player.speed;
        alert('your Score: '+parseInt(10*player.speed)+'\nbest: '+parseInt(10*bestScore));
        player = new Player();

        newPoint();

    }


    ctx.fillStyle = '#000000';

    ctx.fillRect(player.x, player.y, player.w, player.h);

    ctx.fillStyle = '#00FF00';

    ctx.fillRect(point.x, point.y, point.w, point.h);
}

var gameInterval = setInterval(render, 30);

window.addEventListener('keydown', function (e) {
    player.speed += 0.05;
    switch(e.keyCode) {
    case 75: //vim up
    case 38: //up
        player.vy = -1;
        player.vx = 0;
        break;
    case 74: //vim down
    case 40: //down
        player.vy = 1;
        player.vx = 0;
        break;
    case 76: //vim right
    case 39: //right
        player.vx = 1;
        player.vy = 0;
        break;
    case 72: //vim left
    case 37: //left
        player.vx = -1;
        player.vy = 0;
        break;
    }
}, false);
}())
