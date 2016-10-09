var default_speed = 0.8; //pixels per millisecond
var dom_node_id = "#canvas";

var store = {
    gun: null,
    target: null,
    painter: null
};

$(document).ready(function() {
    var gun_height = Math.round(window.innerHeight/2),
        gun = new Gun(0, 30, gun_height, "gun_1");
    
    store.gun = gun;

    store.target = new Target(window.innerWidth - 60, 30, 20, 60, 90, default_speed);

    store.painter = new Painter(dom_node_id);

    $(dom_node_id).on("mousemove", function(e) {
        var dist_x = e.clientX - store.gun.x_pos,
            dist_y = e.clientY - store.gun.y_pos,
            angle = Math.atan(dist_y/dist_x);

        store.gun.angle = angle;
    });

    $(dom_node_id).on("click", function(e) {
        var dist_x = e.clientX - store.gun.x_pos,
            dist_y = e.clientY - store.gun.y_pos;

        var bullet = store.gun.shoot(
                store.gun.x_pos+10, 
                store.gun.y_pos+6,
                store.gun.angle,
                default_speed,
                new Date().getTime()
        );
        store.target.isImpact(bullet, store.gun);  
    });

    $(document).on("keydown", function(e) {
        var move = null;
        switch(e.which) {
            case 38: move = "UP";
            break;
            case 40: move = "DOWN";
            break;
        }

        store.target.setActiveMove(move);

        e.preventDefault();
    });

    $(document).on("keyup", function(e) {
        store.target.setActiveMove(null);
        e.preventDefault();
    });

    window.setInterval(function() {
        store.painter.draw();
    }, 15);
});

