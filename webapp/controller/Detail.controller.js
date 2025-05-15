sap.ui.define([
	"sap/ui/core/mvc/Controller",
    'sap/f/library'
], function (Controller,fioriLibrary) {
	"use strict";

	return Controller.extend("sap.ui.demo.fcl.controller.Detail", {
        onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();
			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			// Attach route match handler
			this.oRouter.getRoute("detail").attachPatternMatched(this._onProductMatched, this);
            this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onProductMatched, this);
		},

		_onProductMatched: function (oEvent) {
			this._customerId = oEvent.getParameter("arguments").Customer ;
			const sCustomerId=this._customerId;
			this.getView().bindElement({
				path: "/Customers('" + sCustomerId + "')"
			});
		},

		onEditToggleButtonPress: function () {
			var oObjectPage = this.getView().byId("ObjectPageLayout");
			var bCurrentShowFooterState = oObjectPage.getShowFooter();
			oObjectPage.setShowFooter(!bCurrentShowFooterState);
		},

		onExit: function () {
			this.oRouter.getRoute("detail").detachPatternMatched(this._onProductMatched, this);
		},
        onOrderPress: function (oEvent) {
            const oContext = oEvent.getSource().getBindingContext();
            const oOrder = oContext.getObject();
            const sOrderId = oOrder.ID;
            const sCustomerId = this._customerId; // Make sure this is stored earlier
        
            const sLayout = fioriLibrary.LayoutType.ThreeColumnsEndExpanded;
        debugger
            if (sCustomerId && sOrderId) {
                this.oRouter.navTo("detailDetail", {
                    Customer: sCustomerId,
                    Order: sOrderId,
                    layout: sLayout
                });
            } else {
                console.error("Customer ID or Order ID is missing");
            }
        }
        
	});
});
