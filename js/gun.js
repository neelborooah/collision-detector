function Gun(angle, x_pos, y_pos, id) {
    this.angle = angle;
    this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.id = id;
    this.bullets = [];
}

Gun.prototype.filterBullets = function() {
    this.bullets = this.bullets.filter(function(bullet) {
        return (bullet.x_pos >= 0 && bullet.x_pos <= window.innerWidth);
    });
}

Gun.prototype.render = function() {
    var angle_in_deg = this.angle * (180/Math.PI);
    var style = "top:"+this.y_pos+";left:"+this.x_pos+";transform:rotate("+angle_in_deg+"deg)";
    var htmlString = "<div id="+this.id+" class='gun' style="+style+">&nbsp;</div>";

    this.bullets.forEach(function(bullet) {
        htmlString += bullet.render();
    });

    return htmlString;
}

Gun.prototype.shoot = function(x_pos, y_pos, angle, speed, start_time) {
    var bullet = new Bullet(x_pos, y_pos, angle, speed, start_time);
    this.bullets.push(bullet);

    return bullet;
}