ContactManager.module("ContactsApp", function(ContactsApp, ContactManager, Backbone, Marionette, $, _) {
    ContactsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            // Key is path taken in URL (i.e. index.html#contacts)
            "contacts": "listContacts",
            "contacts/:id": "showContact"
        }
    });

    var API = {
        listContacts: function() {
            ContactsApp.List.Controller.listContacts();
        },
        showContact: function(id) {
            ContactsApp.Show.Controller.showContact(id);
        }
    };

    ContactManager.on("contacts:list", function() {
        ContactManager.navigate("contacts");
        API.listContacts();
    });

    ContactManager.on("contact:show", function(id) {
        // So we don't impeach DRY...
        // Update the URL fragment & excuting controller action
        ContactManager.navigate(`contacts/${id}`);
        API.showContact(id);
    });

    ContactManager.addInitializer(function() {
        new ContactsApp.Router({
            controller: API
        });
    });
});