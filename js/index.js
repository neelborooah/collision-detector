import { Bullet, Gun, Painter, Summary, Target } from './core';
import { Alfred } from './ai';

const default_speed = 0.8; //pixels per millisecond
const dom_node_id = "#canvas";
const interval = 15;

let store = {
    gun: null,
    target: null,
    painter: null,
    alfred: null,
    summary: null,
};

function initializeListeners() {
    $(dom_node_id).on("mousemove", e => {
        if(!store.summary.autoplay) store.gun.adjustOrientation(e.clientX, e.clientY);
    });

    $(dom_node_id).on("click", e => {
        if(!store.summary.active) initializeActors();
        else if(e.clientX < 300 && e.clientY < 300) store.summary.toggleAutoplay();
        else if(!store.summary.autoplay) store.gun.shoot();
    });  

}

function initializeActors() {
    let gun_height = Math.round(window.innerHeight/2),
        gun = new Gun(0, 30, gun_height, "gun_1", default_speed);
    
    store.gun = gun;

    store.target = new Target(window.innerWidth - 60, 30, 20, 60, 90, default_speed);

    store.painter = new Painter(dom_node_id);

    store.alfred = new Alfred();

    store.summary = new Summary();
}

$(document).ready(() => {
    
    initializeActors();

    initializeListeners();

    window.setInterval(() => {

        store.painter.draw(store.gun, store.target, store.summary);

        store.summary.update(store.gun, store.target);

        let target_move = store.alfred.decideTargetMove(store.gun, store.target);

        store.target.setActiveMove(target_move);

    }, interval);

    window.setInterval(() => {

        if(store.summary.autoplay) {
            const move = store.alfred.decideGunMove(store.gun, store.target);
            store.gun.adjustOrientation(move.gun_x_pos, move.gun_y_pos);
            if(move.is_shoot) store.gun.shoot();
        }

    }, interval * 40);
});

