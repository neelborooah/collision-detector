export default class Target {

    constructor(x_pos, y_pos, width, height, angle, speed) {
        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.width = width;
        this.height = height;
        this.angle = angle;
        this.speed = speed;
        this.active_move = {
            move: null,
            timestamp: new Date().getTime()
        };
    }

    setActiveMove(new_move) {
        if(["UP", "DOWN", null].indexOf(new_move) != -1) {
            this.active_move = {
                move: new_move,
                timestamp: new Date().getTime()
            };
        }
    }

    finalY(bullet, gun, x_pos) {
        var x_dist = x_pos - bullet.x_pos,
            y_dist = x_dist * Math.tan(bullet.angle) + (bullet.y_pos - gun.y_pos),
            max_y = window.innerHeight - gun.y_pos,
            final_y = 0;
           
        var y_val = (y_dist % max_y); 
            
        var divider = Math.floor(Math.abs(y_dist / max_y)) - 1;
        if(divider === -1) final_y = gun.y_pos + y_val;
        else if(divider % 2 === 0) {
            var angle = (divider % 4 === 0)?bullet.angle: (-bullet.angle);
            if(angle < 0) {
                final_y = Math.abs(y_val);
            } else {
                final_y = window.innerHeight - Math.abs(y_val);
            }
        } else {
            var angle = ((divider-1) % 4 === 0)?-bullet.angle:bullet.angle;
            if(angle > 0) final_y = gun.y_pos + Math.abs(y_val);
            else final_y = gun.y_pos - Math.abs(y_val);
        }

        return final_y;
    }

    move() {

        var timestamp = new Date().getTime(),
            time_elapsed = timestamp - this.active_move.timestamp,
            distance_travelled = time_elapsed * this.speed; //pixels

        var y_pos = this.y_pos;

        switch(this.active_move.move) {
            case "UP": 
                y_pos -= distance_travelled;
                break;

            case "DOWN": 
                y_pos += distance_travelled;
                break;

            default: return;
        }

        if(y_pos < 0) y_pos = 0;
        else if(y_pos + this.height > window.innerHeight) y_pos = window.innerHeight - this.height;

        this.y_pos = y_pos;
        this.active_move.timestamp = timestamp;
    }

    isImpact(bullet, gun) {
        
        var x_pos = this.x_pos;

        while(x_pos <= this.x_pos + this.width) {

            var final_y = this.finalY(bullet, gun, x_pos);

            var is_impact = (final_y >= this.y_pos && final_y <= this.y_pos + this.height);
            
            if(is_impact) return true;

            x_pos += 1;
        }


        return false;
    }

    preferredDirection(bullet, gun) {

        var final_y = this.finalY(bullet, gun, this.x_pos);

        var difference_top = Math.abs(this.y_pos - final_y);
        var difference_bottom = Math.abs(this.y_pos + this.height - final_y);


        if(difference_top > difference_bottom) {
            if(this.y_pos - difference_bottom >= 0) return "UP";
            else return "DOWN";
        } else {
            if(this.y_pos + this.height + difference_top <= window.innerHeight) return "DOWN";
            else return "UP";
        }

    }

    firstToImpact(gun) {

        var firstToImpact = null,
            impactDistance = null;

        for(var i in gun.bullets) {

            var bullet = gun.bullets[i];

            if(this.isImpact(bullet, gun)) {

                var dist = this.x_pos - bullet.x_pos;

                if(impactDistance == null || dist < impactDistance) {

                    firstToImpact = bullet;
                    impactDistance = dist;

                }

            }

        }

        return firstToImpact;

    }

    render() {

        this.move();

        var style = 
            "width:"+this.width+
            ";height:"+this.height+
            ";top:"+this.y_pos+
            ";left:"+this.x_pos;
        var htmlString = "<div class='target' style="+style+">&nbsp;</div>";    
        return htmlString;
    }
    
}
