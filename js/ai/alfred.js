function Alfred(gun, target) {
	//initialize brain
}

Alfred.prototype.decide = function(gun, target) {
	var is_impact = false;
	var impacting_bullet = null;
	for(var id in gun.bullets) {

		is_impact = target.isImpact(gun.bullets[id], gun);

		impacting_bullet = gun.bullets[id];

		if(is_impact) break;
	}

	var result = null;

	if(is_impact) {
		result = target.preferredDirection(gun, impacting_bullet);
	} 

	return result;
}
