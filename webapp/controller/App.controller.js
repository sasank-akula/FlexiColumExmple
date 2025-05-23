sap.ui.define([
							   
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.sap.project1.controller.App", {
		onInit: function () {
			this.oOwnerComponent = this.getOwnerComponent();
			this.oRouter = this.oOwnerComponent.getRouter();
			this.oRouter.attachRouteMatched(this.onRouteMatched, this);
		},

		onRouteMatched: function (oEvent) {
			var sRouteName = oEvent.getParameter("name"),
				oArguments = oEvent.getParameter("arguments");
		
			// Save the current route name
			this.currentRouteName = sRouteName;
		
			// For customer > orders > order items, you will extract the customer ID
			this.currentCustomer = oArguments.customer;
		
			// Example: If you have order details as well, extract that
			if (oArguments.order) {
				this.currentOrder = oArguments.order;
			}
			
			// Update the view based on the current customer (and order if applicable)
			this._updateViewWithCustomerData(this.currentCustomer, this.currentOrder);
		},

		onStateChanged: function (oEvent) {
			var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
				sLayout = oEvent.getParameter("layout");

			// Replace the URL with the new layout if a navigation arrow was used
			if (bIsNavigationArrow) {
				this.oRouter.navTo(this.currentRouteName, {layout: sLayout, product: this.currentProduct}, true);
			}
		},

		onExit: function () {
			this.oRouter.detachRouteMatched(this.onRouteMatched, this);
		}
	});
});
