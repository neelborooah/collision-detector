export default class Bullet {

    constructor(x_pos, y_pos, angle, speed, timestamp) {
        this.angle = angle;
        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.speed = speed;
        this.timestamp = timestamp;    
    }

    move(timestamp) {
        var time_elapsed = timestamp - this.timestamp,
            distance_travelled = time_elapsed * this.speed; //pixels
            
        this.x_pos += Math.cos(this.angle) * distance_travelled;
        this.y_pos += Math.sin(this.angle) * distance_travelled;

        if(this.y_pos <= 0 || this.y_pos >= window.innerHeight) {
            this.angle = -this.angle;
            this.y_pos += Math.sin(this.angle) * distance_travelled;
        }

        this.timestamp = timestamp; 
    }

    render() {
        this.move(new Date().getTime());
        
        var style = "top:"+this.y_pos+";left:"+this.x_pos; 
        var htmlString = "<div class='bullet' style="+style+">&nbsp;</div>";
        return htmlString;
    }
}

