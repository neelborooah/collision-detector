var default_speed = 0.8; //pixels per millisecond

var store = {
    gun: null,
    target: null,
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

function Target(x_pos, y_pos, width, height, angle) {
    this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.width = width;
    this.height = height;
    this.angle = angle;
}

Target.prototype.render = function() {
    var style = 
        "width:"+this.width+
        ";height:"+this.height+
        ";top:"+this.y_pos+
        ";left:"+this.x_pos;
    var htmlString = "<div class='target' style="+style+">&nbsp;</div>";    
    return htmlString;
}

function draw() {
    var elements = store.gun.render(); 
    
    elements += store.target.render();

    store.bullets = store.bullets.filter(function(bullet) {
        return (bullet.x_pos >= 0 && bullet.x_pos <= window.innerWidth);
    });

    store.bullets.forEach(function(bullet) {
        elements += bullet.render();
    });
    $("#canvas").html(elements);
}

function isImpactTarget(bullet) {
    var x_dist = store.target.x_pos - bullet.x_pos;
        distance_travelled = x_dist / Math.cos(bullet.angle),
        y_dist = x_dist * Math.tan(bullet.angle),
        max_y = window.innerHeight - store.gun.y_pos,
        final_y = 0;
       
    var y_val = y_dist % max_y; 
        
    var divider = Math.floor(Math.abs(y_dist / max_y)) - 1;
    if(divider === -1) final_y = store.gun.y_pos + y_val;
    else if(divider % 2 === 0) {
        var angle = (divider % 4 === 0)?bullet.angle: (-bullet.angle);
        if(angle < 0) {
            final_y = Math.abs(y_val);
        } else {
            final_y = window.innerHeight - Math.abs(y_val);
        }
    } else {
        var angle = ((divider-1) % 4 === 0)?-bullet.angle:bullet.angle;
        if(angle > 0) final_y = store.gun.y_pos + Math.abs(y_val);
        else final_y = store.gun.y_pos - Math.abs(y_val);
    }

    var is_impact = (final_y >= store.target.y_pos && final_y <= store.target.y_pos + store.target.height);

    console.log(
        "max height:", max_y,
        "height travelled:", y_dist,
        "height after mod:", y_val,
        "final_y:", final_y,
        "divider:", divider,
        "is_impact:", is_impact
    );

    return is_impact;
}

$(document).ready(function() {
    var gun_height = Math.round(window.innerHeight/2),
        gun = new Gun(0, 30, gun_height, "gun_1");
    
    store.gun = gun;

    store.target = new Target(window.innerWidth - 60, 30, 20, 60, 0);

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
        isImpactTarget(bullet);  
    });

    window.setInterval(function() {
        draw();
    }, 15);
});

