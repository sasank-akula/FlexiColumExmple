sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/odata/v4/ODataModel",
	"sap/ui/model/json/JSONModel",
	"sap/f/library"
], function (UIComponent, ODataModel, JSONModel, fioriLibrary) {
	"use strict";

	return UIComponent.extend("com.cy.grocery.Component", {

		metadata: {
			manifest: "json"
		},

		init: function () {
			// Call base component init
			UIComponent.prototype.init.apply(this, arguments);

			// Set layout model
			const oLayoutModel = new JSONModel();
			this.setModel(oLayoutModel, "layoutModel");

			// Attach before route matched to set layout
			const oRouter = this.getRouter();
			oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
			oRouter.initialize();
		},

		_onBeforeRouteMatched: function (oEvent) {
			const oModel = this.getModel("layoutModel");
			let sLayout = oEvent.getParameters().arguments.layout;

			if (!sLayout) {
				sLayout = fioriLibrary.LayoutType.OneColumn;
			}

			oModel.setProperty("/layout", sLayout);
		}
	});
});
