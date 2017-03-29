export default class Alfred {

	decideTargetMove(gun, target) {
		
		var impacting_bullet = target.firstToImpact(gun);

		if(impacting_bullet != null) {
			
			var result = target.preferredDirection(gun, impacting_bullet);

			return result; 
		} 

		return null;
	}

	decideGunMove(gun, target) {

		var target_y_mid = target.y_pos + (target.height / 2);

		return {
			gun_x_pos: target.x_pos,
			gun_y_pos: target_y_mid,
			is_shoot: true
		};
	}
}

