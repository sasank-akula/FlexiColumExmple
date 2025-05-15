sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("com.sap.project1.controller.DetailDetail", {
        onInit: function () {
            var oOwnerComponent = this.getOwnerComponent();
            this.oRouter = oOwnerComponent.getRouter();
            this.oModel = oOwnerComponent.getModel();

            // Attach the route to trigger onPatternMatch
            this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onPatternMatch, this);
        },

        _onPatternMatch: function (oEvent) {
            // Get arguments from the route (customerId, orderId, and itemId or similar)
            this._customerId = oEvent.getParameter("arguments").customer || this._customerId || "0";
            this._orderId = oEvent.getParameter("arguments").order || this._orderId || "0";

            // Construct the correct path based on the customer and order
            var sPath = "/Customers('" + this._customerId + "')/Orders('" + this._orderId + "')/OrderItems";

            // Bind the view element to the path
            this.getView().bindElement({
                path: sPath, // Dynamic binding path for order items under specific customer and order
                model: "" // Use default model unless specified
            });
        },

        onExit: function () {
            // Clean up the event listener
            this.oRouter.getRoute("detailDetail").detachPatternMatched(this._onPatternMatch, this);
        }
    });
});
