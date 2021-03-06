import { Bullet } from './';

export default class Gun {
    
    constructor(angle, x_pos, y_pos, id, speed) {
        this.angle = angle;
        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.id = id;
        this.bullets = [];
        this.bullet_speed = speed;
    }

    filterBullets() {
        this.bullets = this.bullets.filter(bullet => {
            return bullet.x_pos >= 0 && bullet.x_pos <= window.innerWidth;
        });
    }

    shoot() {
        var bullet = new Bullet(
            this.x_pos+10, 
            this.y_pos+6, 
            this.angle, 
            this.bullet_speed, 
            new Date().getTime()
        );
        
        this.bullets.push(bullet);

        return bullet;
    }

    adjustOrientation(x_pos, y_pos) {
        var dist_x = x_pos - this.x_pos,
            dist_y = y_pos - this.y_pos,
            angle = Math.atan(dist_y/dist_x);

        this.angle = angle;
    }
 
    render() {
        var angle_in_deg = this.angle * (180/Math.PI);
        var style = "top:"+this.y_pos+";left:"+this.x_pos+";transform:rotate("+angle_in_deg+"deg)";
        var htmlString = "<div id="+this.id+" class='gun' style="+style+">&nbsp;</div>";

        this.filterBullets();

        this.bullets.forEach(bullet => {
            htmlString += bullet.render();
        });

        return htmlString;
    }

}
