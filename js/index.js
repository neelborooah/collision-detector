var default_velocity = 10;

var store = {
    gun: null,
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

function Bullet(x_pos, y_pos, angle, id, speed) {
    this.angle = angle;
    this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.id = id;
    this.speed = speed;
}

function draw() {
    var elements = store.gun.render(); 
    $("#canvas").html(elements);
}

$(document).ready(function() {
    var gun_height = Math.round(window.innerHeight/2),
        gun = new Gun(0, 30, gun_height, "gun_1");
    
    store.gun = gun;
    draw();

    $("body").on("mousemove", function(e) {
        var dist_x = e.clientX - store.gun.x_pos,
            dist_y = e.clientY - store.gun.y_pos,
            angle = Math.atan(dist_y/dist_x);

        store.gun.angle = angle;
        draw();
    });
});

