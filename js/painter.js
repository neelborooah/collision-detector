function Painter(dom_node) {
	this.dom_node = dom_node;
}

Painter.prototype.draw = function(gun, bullets, target) {
	var elements = store.gun.render(); 
    
    elements += store.target.render();

    $(this.dom_node).html(elements);
}