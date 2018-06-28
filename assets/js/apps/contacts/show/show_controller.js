ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _) {
    Show.Controller = {
        showContact: function(id) {
            var fetchingContact = ContactManager.request("contact:entity", id);
            // Simple enough...is getting the model from the collection that matches the 'id'

            $.when(fetchingContact)
                .done(function(contact) {
                    var contactView;

                    if (contact) {
                        contactView = new Show.Contact({
                            model: contact
                        });
                    } else {
                        contactView = new Show.MissingContact()
                    }

                    // SPA...doesn't redirect to a new page once the anchor tag is clicked
                    // but sets the region to use a different template
                    ContactManager.mainRegion.show(contactView);
                });
        }
    }
});