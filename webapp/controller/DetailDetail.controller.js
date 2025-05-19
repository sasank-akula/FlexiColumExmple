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
            this._orderId = oEvent.getParameter("arguments").Order;
            debugger
            var sPath = "/Orders('" + this._orderId + "')";

            // Bind the view element to the path
            this.getView().bindElement({
                path: sPath
            });
        },

        onExit: function () {
            // Clean up the event listener
            this.oRouter.getRoute("detailDetail").detachPatternMatched(this._onPatternMatch, this);
        }
    });
});
