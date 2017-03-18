import { Bullet, Gun, Painter, Summary, Target } from './core';
import { Alfred } from './ai';

var default_speed = 0.8; //pixels per millisecond
var dom_node_id = "#canvas";
var interval = 15;

var store = {
    gun: null,
    target: null,
    painter: null,
    alfred: null,
    summary: null
};

function initializeListeners() {
    $(dom_node_id).on("mousemove", function(e) {
        var dist_x = e.clientX - store.gun.x_pos,
            dist_y = e.clientY - store.gun.y_pos,
            angle = Math.atan(dist_y/dist_x);

        store.gun.angle = angle;
    });

    $(dom_node_id).on("click", function(e) {
        var dist_x = e.clientX - store.gun.x_pos,
            dist_y = e.clientY - store.gun.y_pos;

        var bullet = store.gun.shoot(default_speed);
        store.target.isImpact(bullet, store.gun);  
    });

}

$(document).ready(function() {
    let gun_height = Math.round(window.innerHeight/2),
        gun = new Gun(0, 30, gun_height, "gun_1");
    
    store.gun = gun;

    store.target = new Target(window.innerWidth - 60, 30, 20, 60, 90, default_speed);

    store.painter = new Painter(dom_node_id);

    store.alfred = new Alfred(interval);

    store.summary = new Summary();

    initializeListeners();

    window.setInterval(function() {

        store.painter.draw(store.gun, store.target, store.summary);
        
        store.summary.update(store.gun, store.target);

        let move = store.alfred.decide(store.gun, store.target);

        store.target.setActiveMove(move);

    }, interval);
});

