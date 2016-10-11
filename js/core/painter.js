function Painter(dom_node) {
	this.dom_node = dom_node;
}

Painter.prototype.draw = function(gun, target, summary) {

    var elements = "";

    if(summary.active) {

		elements = gun.render(); 
	    
	    elements += target.render();

	    elements += summary.render();

    } else {

    	elements += summary.render();
    	
    }

    $(this.dom_node).html(elements);
}