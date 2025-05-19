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
            this._customerId = oEvent.getParameter("arguments").Order;
            var sPath = "/Orders('" + this._orderId + "')";

            // Bind the view element to the path
            this.getView().bindElement({
                path: sPath
            });
        },

        handleClose: function () {
            var oFCL = this.getView().getParent().getParent(); // FlexibleColumnLayout
            oFCL.setLayout(sap.f.LayoutType.TwoColumnsMidExpanded); // Collapse to one column
        
            // Optional: Navigate to the master route
            this.oRouter.navTo("detail");
        }
        
    });
});
