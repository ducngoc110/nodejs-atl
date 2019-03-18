$(document).ready(function(){ 
    "use strict";

    var ATL_BACKEND_USER = {

        init () {
            this.handleNotify();
            this.manageFitlerRole();
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
        },

        manageFitlerRole () {
            $('.atl-manage-user-filter li').click((e) => {
                let item = $(e.currentTarget);
                let role = item.attr('data-role');
                let data = {
                    role
                };
                // Send to server handle.
                $.get('/user-manage-filter', data).then((html) => {
                    $('.atl-list-user-js').html(html);
                    $('.atl-list-user-not-js').remove();
                    item.closest('.atl-manage-user-filter').find('li').removeClass('uk-active');
                    item.addClass('uk-active');
                });
                return false;
            });
        }
    };

    ATL_BACKEND_USER.init();
});