function Bullet(x_pos, y_pos, angle, speed, timestamp) {
    this.angle = angle;
    this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.speed = speed;
    this.timestamp = timestamp;
}

Bullet.prototype.move = function() {
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
}

Bullet.prototype.render = function() {
    this.move();
    
    var style = "top:"+this.y_pos+";left:"+this.x_pos; 
    var htmlString = "<div class='bullet' style="+style+">&nbsp;</div>";
    return htmlString;
}

