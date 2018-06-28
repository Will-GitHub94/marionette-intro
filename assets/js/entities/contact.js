// Callback takes up to 6 args:
//   1. Module itself ('Entities')
//   2. The app object that module was called from ('ContactManager')
//   3. Backbone
//   4. Backbone.Marionette
//   5. jQuery ('$')
//   6. Underscore ('_')
ContactManager.module("Entities", function (Entities, ContactManager, Backbone, Marionette, $, _) {
    Entities.Contact = Backbone.Model.extend({
        urlRoot: "contacts"
    });
    Entities.configureStorage(Entities.Contact);    // 'configureStorage' = use web storage

    Entities.ContactCollection = Backbone.Collection.extend({
        url: "contacts",                            // Basically specifying an endpoint that allows us to persist data into the web storage
        model: Entities.Contact,
        comparator: "firstName"
    });
    Entities.configureStorage(Entities.ContactCollection);

    // model and collection definitions are here
    var contacts;
    var initialiseContacts = function () {
        contacts = new Entities.ContactCollection([
            {
                id: 1,
                firstName: "Will",
                lastName: "Ashworth",
                phoneNumber: "123456"
            },
            {
                id: 2,
                firstName: "Molly",
                lastName: "Souter",
                phoneNumber: "654321"
            },
            {
                id: 3,
                firstName: "Robb",
                lastName: "Wilson",
                phoneNumber: "24680"
            },
            {
                id: 4,
                firstName: "Matt",
                lastName: "Spencer",
                phoneNumber: "13579"
            }
        ]);
        contacts.forEach(function(contact) {
            contact.save();
        });
    };

    // Functions that we are exposing
    var API = {
        getContactEntities: function() {
            var contacts = new Entities.ContactCollection();
            contacts.fetch();

            if (contacts.length === 0) {
                return initialiseContacts();
            }
            return contacts;
        },
        getContactEntity: function(contactId) {
            var contact = new Entities.Contact({
                id: contactId
            });
            contact.fetch();
            return contact;
        }
    };

    // Request handler
    ContactManager.reqres.setHandler("contact:entities", function () {
        return API.getContactEntities();
    });

    ContactManager.reqres.setHandler("contact:entity", function (id) {
        return API.getContactEntity(id);
    });

    // Private function
    // var alertPrivate = function() { ... }

    // Public function...can be called from app object
    // Entities.alertPublic = function() { ... }
});