export default class Summary {

    constructor() {
        this.score = 0;
        this.start_time = new Date().getTime();
        this.active = true;
        this.end_time = null;
        this.autoplay = false;
        this.max_score = 2;
    }

    update(gun, target) {
        let target_y1 = target.y_pos,
            target_y2 = target_y1 + target.height,
            target_x1 = target.x_pos, 
            target_x2 = target_x1 + target.width;

        gun.bullets.forEach(bullet => {

            if(bullet.x_pos >= target_x1 && bullet.x_pos <= target_x2 && 
                    bullet.y_pos >= target_y1 && bullet.y_pos <= target_y2) {
                this.score++;
            }

        });

        if(this.score >= 2 && this.active) {
            this.active = false;
            this.end_time = new Date().getTime();
        }
    }

    getGameDuration() {
        const duration = this.end_time - this.start_time;

        return parseInt(duration / 1000);
    }

    toggleAutoplay() {
        this.autoplay = !this.autoplay;
    }

    render() {
        let htmlString = "";

        if(this.active) {
            htmlString =    `<div class='summary'>
                                <span>${this.score}/${this.max_score}</span>
                                <span class="simple-text margin-left">Autoplay: ${this.autoplay ? "on" : "off"}</span>
                            </div>`;
        } else {
            htmlString = `<div class='summary'>You won in ${this.getGameDuration()} seconds!</div>`;
        }

        return htmlString;

    }
}