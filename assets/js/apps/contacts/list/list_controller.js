ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {
    List.Controller = {
        listContacts: function () {
            var contacts = ContactManager.request("contact:entities");

            var contactsListView = new List.Contacts({
                collection: contacts
            });

            // Listening for event triggered by an ItemView
            contactsListView.on("childview:contact:delete", function(childView, model) {
                model.destroy();
            });

            contactsListView.on("childview:contact:show", function(childView, model) {
                // Simply to update the URL when 'Show' is clicked
                ContactManager.trigger("contact:show", model.get("id"));
            });

            ContactManager.mainRegion.show(contactsListView);
        }
    }
})