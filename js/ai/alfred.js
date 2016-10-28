function Alfred(interval) {
	//initialize brain

	this.interval = interval;
}

Alfred.prototype.decide = function(gun, target) {
	
	var impacting_bullet = target.firstToImpact(gun);

	if(impacting_bullet != null) {
		
		var result = target.preferredDirection(gun, impacting_bullet);

		return result; 

	} 

	return null;
}
