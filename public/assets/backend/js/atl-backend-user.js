$(document).ready(function(){ 
    "use strict";

    var ATL_BACKEND_USER = {

        init () {
            this.handleNotify();
            this.manageFitlerRole();
            this.manageSearch();
            this.manageRemove();
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
                let data = { role };
                altair_helpers.content_preloader_show();
                $.post('/user-manage-filter', data).then((html) => {
                    altair_helpers.content_preloader_hide();
                    $('.atl-list-user-js').html(html);
                    $('.atl-list-user-not-js').remove();
                    item.closest('.atl-manage-user-filter').find('li').removeClass('uk-active');
                    item.addClass('uk-active');
                });
                return false;
            });
        },

        manageSearch () {
            $('.atl-user-manage-search').keyup((e) => {
                let item  = $(e.currentTarget);
                let input = item.val();
                let data  = { input };
                altair_helpers.content_preloader_show();
                // Send to server handle.
                $.post('/user-manage-filter', data).then((html) => {
                    altair_helpers.content_preloader_hide();
                    $('.atl-list-user-js').html(html);
                    $('.atl-list-user-not-js').remove();
                });
                return false;
            });
        },

        manageRemove () {
            $('.uk-table').on('click', '.atl-manage-user-delete', function(e){
                let item = $(e.currentTarget);
                let id   = item.attr('data-id');
                let data = { id };
                altair_helpers.content_preloader_show();
                $.post('/user-manage-remove', data, (result) => {
                    if (result) {
                        altair_helpers.content_preloader_hide();
                        item.closest('tr').remove();
                        UIkit.modal.alert('Delete Success!');
                    }
                });
                return false;
            })
        },
    };

    ATL_BACKEND_USER.init();
});