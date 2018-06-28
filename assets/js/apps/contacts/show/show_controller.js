ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _) {
    Show.Controller = {
        showContact: function(id) {
            var contacts = ContactManager.request("contact:entities");
            // Simple enough...is getting the model from the collection that matches the 'id'
            var model = contacts.get(id);
            var contactView;

            if (model) {
                contactView = new Show.Contact({
                    model: model
                });
            } else {
                contactView = new Show.MissingContact();
            }

            // SPA...doesn't redirect to a new page once the anchor tag is clicked
            // but sets the region to use a different template
            ContactManager.mainRegion.show(contactView);
        }
    }
});