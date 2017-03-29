export default class Painter {

    constructor(dom_node) {
    	this.dom_node = dom_node;
    }

    draw(gun, target, summary) {

        let elements = "";

        if(summary.active) {

    		elements = gun.render(); 
    	    
    	    elements += target.render();

    	    elements += summary.render();

        } else {

        	elements += summary.render();
        	
        }

        $(this.dom_node).html(elements);
    }
}
