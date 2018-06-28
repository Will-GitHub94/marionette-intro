var ContactManager = new Marionette.Application();

ContactManager.addRegions({
    mainRegion: "#main-region"
});

ContactManager.navigate = function(route, options) {
    options || (options = {});
    Backbone.history.navigate(route, options);
};

ContactManager.getCurrentRoute = function() {
    return Backbone.history.fragment;
};

ContactManager.on("start", function() {
    if (Backbone.history) {
        // Starting Backbone's routing
        // Can only be done once ALL initialisers have been run
        // to ensure the routing controllers are ready to respond to routing events
        Backbone.history.start();

        // If no path specified after index.html, "redirect" to 'contacts'
        if (this.getCurrentRoute() === "") {
            ContactManager.trigger("contacts:list");
        }
    }
});