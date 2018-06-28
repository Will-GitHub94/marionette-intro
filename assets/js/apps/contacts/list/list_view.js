ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {
    List.Contact = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#contact-list-item",
        events: {
            "click": "hightlightName",
            "click td a.js-show": "showClicked",
            "click button.js-delete": "deleteClicked"
        },
        deleteClicked: function(e) {
            e.preventDefault();
            e.stopPropagation();                        // prevents the event bubbling up the DOM
            // Communicate with the entity to delete the model instead of
            // hooking into the model directly and deleting it.
            // Exemplifies separation of concerns as the model should not know about the view
            this.trigger("contact:delete", this.model);
        },
        showClicked: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger("contact:show", this.model);
        },
        hightlightName: function(e) {
            e.preventDefault();                         // prevents a page refresh
            this.$el.toggleClass("warning");
        },
        // If model is removed, this will call the corresponding 'remove'
        // method on the ItemView (if there is one)
        remove: function() {
            var self = this;
            this.$el.fadeOut(function () {
                // Like JS' prototype chain
                // Calls the original implementation of 'remove' at the top of the prototype chain
                Marionette.ItemView.prototype.remove.call(self);
            });
        }
    });

    // CompositeView is more powerful CollectionView with 'template' attribute
    // CompositeView will append (by default) the rendered childViews to its own DOM element
    List.Contacts = Marionette.CompositeView.extend({
        template: "table",
        className: "table table-hover",
        template: "#contact-list",
        childView: List.Contact,
        childViewContainer: "tbody",            // Where the childViews should render
        childEvents: {
            "contact:delete": function() {
                this.$el.fadeOut(1000, function() {
                    $(this).fadeIn(1000);
                })
            }
        }
    });
});