;(function($) {
    'use strict';
    
    var contactManager = (function() {
        
        var elems = {
            create: {
                name: $('#createName'),
                phone: $('#createPhone'),
                address: $('#createAddress'),
                submit: $('#createContact')
            },
            modal: {
                error: {
                    elem: $('#errorModal'),
                    title: $('#errorModal').find('.modal-title'),
                    body: $('#errorModal').find('.modal-body')
                }
            },
            output: $('#output')
        };
        
        var contacts = {};
        var contactData = {};
        
        var error = function(title, body) {
            elems.modal.error.elem.modal('toggle');
            elems.modal.error.title.html(title);
            elems.modal.error.body.html(body);
        };
        
        var validate = function() {
            if (elems.create.name.val() === '') {
                error('Error:', 'Invalid Name');
                return false;
            }
            if (isNaN(elems.create.phone) && elems.create.phone.val() === '') {
                error('Error:', 'Invalid Phone');
                return false;
            }
            if (elems.create.address.val() === '') {
                error('Error:', 'Invalid Address');
                return false;
            }
        };
        
        var display = function() {
            elems.output.empty();
            $.each(contacts, function(key, value) {
                elems.output.append(
                    $('<tr/>', {
                        id: value.id
                    }).append(
                        $('<td>', {
                            class: 'name',
                            text: value.name
                        }),
                        $('<td>', {
                            class: 'phone',
                            text: value.phone
                        }),
                        $('<td>', {
                            class: 'address',
                            text: value.address
                        })
                    )
                );
            });
        };
        
        // read contacts
        var read = function() {
            $.ajax({
                url: 'read.php',
                data: '',
                dataType: 'JSON',
                success: function(response) {
                    contacts = response;
                    display();
                }
            });
        };
        
        // create contact
        var create = function() {
            if (!validate()) {
                return false;
            }
            var postData = {
                name: elems.create.name.val(),
                phone: elems.create.phone.val(),
                address: elems.create.address.val()
            };
            $.ajax({
                type: 'POST',
                url: 'create.php',
                dataType: 'JSON',
                data: postData,
                success: function(response) {
                    
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    
                }
            });
            read();
        };
        
        // update contact
        var update = function(elem) {
            $.ajax({
                type: 'POST',
                url: 'update.php',
                dataType: 'JSON',
                data: contactData,
                success: function(response) {
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    
                }
            });
            read();
        };
        
        //delete contact
        var del = function() {
            $.ajax({
                type: 'POST',
                url: 'delete.php',
                dataType: 'text',
                data: contactData.id,
                success: function() {
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.log(thrownError);
                }
            });
            read();
        };
        
        var getData = function(elem) {
            contactData = {
                id: elem.attr('id'),
                name: elem.children('.name').html(),
                phone: elem.children('.phone').html(),
                address: elem.children('.address').html()
            };
        };
        
        var displayUpdate = function() {
            $('#updateName').val(contactData.name);
            $('#updatePhone').val(contactData.phone);
            $('#updateAddress').val(contactData.address);
        };
        
        var attachEvents = function() {
            // create
            elems.create.submit.click(function(e) {
                e.preventDefault();
                create();
                read();
            });
            // update
            $('.updateContact').click(function(e) {
                e.preventDefault();
                getData($(this).closest('tr'));
                displayUpdate();
                update(this);
            });
            $('#confirmUpdate').click(function(e) {
                e.preventDefault();
                update();
            });
            // delete
            $('.deleteContact').click(function(e) {
                e.preventDefault();
                getData($(this).closest('tr'));
                $('#deleteModal .modal-body').html("<p>Are you sure you want to delete " + contactData.name + "?</p>");
            });
            $('#confirmDelete').click(function(e) {
                e.preventDefault();
                del();
            });
        };
        
        var initialize = (function() {
            attachEvents();
            read();
        })();
        
    })();
    
})($);