var default_speed = 0.1; //pixels per millisecond

var store = {
    gun: null,
    bullets: [],
};

function Gun(angle, x_pos, y_pos, id) {
    this.angle = angle;
    this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.id = id;
}

Gun.prototype.render = function() {
    var angle_in_deg = this.angle * (180/Math.PI);
    var style = "top:"+this.y_pos+";left:"+this.x_pos+";transform:rotate("+angle_in_deg+"deg)";
    var htmlString = "<div id="+this.id+" class='gun' style="+style+">&nbsp;</div>";
    return htmlString;
}

function Bullet(x_pos, y_pos, angle, speed, timestamp) {
    this.angle = angle;
    this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.speed = speed;
    this.timestamp = timestamp;
}

Bullet.prototype.render = function() {
    var timestamp = new Date().getTime()
        time_elapsed = timestamp - this.timestamp,
        distance_travelled = time_elapsed * this.speed; //pixels
        
    this.x_pos += Math.cos(this.angle) * distance_travelled;
    this.y_pos += Math.sin(this.angle) * distance_travelled;

    if(this.y_pos <= 0 || this.y_pos >= window.innerHeight) {
        this.angle = -this.angle;
        this.y_pos += Math.sin(this.angle) * distance_travelled;
    }

    this.timestamp = timestamp; 
    var style = "top:"+this.y_pos+";left:"+this.x_pos; 
    var htmlString = "<div class='bullet' style="+style+">&nbsp;</div>";
    return htmlString;
}

function draw() {
    var elements = store.gun.render(); 

    store.bullets = store.bullets.filter(function(bullet) {
        return (bullet.x_pos >= 0 && bullet.x_pos <= window.innerWidth
                && bullet.y_pos >= 0 && bullet.y_pos <= window.innerHeight);
    });

    store.bullets.forEach(function(bullet) {
        elements += bullet.render();
    });
    $("#canvas").html(elements);
}

$(document).ready(function() {
    var gun_height = Math.round(window.innerHeight/2),
        gun = new Gun(0, 30, gun_height, "gun_1");
    
    store.gun = gun;

    $("#canvas").on("mousemove", function(e) {
        var dist_x = e.clientX - store.gun.x_pos,
            dist_y = e.clientY - store.gun.y_pos,
            angle = Math.atan(dist_y/dist_x);

        store.gun.angle = angle;
    });

    $("#canvas").on("click", function(e) {
        var dist_x = e.clientX - store.gun.x_pos,
            dist_y = e.clientY - store.gun.y_pos;

        var bullet = new Bullet(
                store.gun.x_pos+10, 
                store.gun.y_pos+6,
                store.gun.angle,
                default_speed,
                new Date().getTime()
        );
        store.bullets.push(bullet);
        console.log(bullet);
    });

    window.setInterval(function() {
        draw();
    }, 15);
});

