export default class Summary {

	constructor() {
		this.score = 0;
		this.start_time = new Date().getTime();
		this.active = true;
		this.end_time = null;
	}

	update(gun, target) {
		var target_y1 = target.y_pos,
			target_y2 = target_y1 + target.height,
			target_x1 = target.x_pos, 
			target_x2 = target_x1 + target.width;

		gun.bullets.forEach(function(bullet) {

			if(bullet.x_pos >= target_x1 && bullet.x_pos <= target_x2 && 
				bullet.y_pos >= target_y1 && bullet.y_pos <= target_y2) {
				this.score++;
			}

		}, this);

		if(this.score >= 2 && this.active == true) {
			this.active = false;
			this.end_time = new Date().getTime();
		}
	}

	getGameDuration() {
		var duration = this.end_time - this.start_time;

		return parseInt(duration / 1000);
	}

	render() {
		var htmlString = "";

		if(this.active) {
			htmlString = "<div class='summary'>"+this.score+"</div>";
		} else {
			htmlString = "<div class='summary'>You won in "+ this.getGameDuration() +" seconds!</div>";
		}

		return htmlString;

	}
}