$(document).ready(function(){ 
    "use strict";

    var ATL_BACKEND_USER = {

    	init () {
    		this.handleNotify();
    	},

    	handleNotify () {
    		let notify = $('.atl-notify');
			if (notify.length > 0) {
				let time = 800;
				$.each(notify, ( index, value ) => {
					setTimeout(() =>  {
						$(value).fadeOut();
					}, time);
					time += 600;
				});
			}
    	}
    };

    ATL_BACKEND_USER.init();
});