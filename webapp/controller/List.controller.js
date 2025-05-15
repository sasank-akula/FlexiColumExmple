sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
	"sap/m/MessageBox",
    "sap/f/library"
], function (Controller, Filter, FilterOperator, Sorter, MessageBox,fioriLibrary) {
	"use strict";

	return Controller.extend("com.sap.project1.controller.List", {
		onInit: function () {
			this.oView = this.getView();
			this._bDescendingSort = false;
			this.oProductsTable = this.oView.byId("userTable");
            this.oRouter = this.getOwnerComponent().getRouter();
		},

		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");

			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [new Filter("name", FilterOperator.Contains, sQuery)];
			}

			this.oProductsTable.getBinding("items").filter(oTableSearchState, "Application");
		},

		onAdd: function () {
			MessageBox.information("This functionality is not ready yet.", {title: "Aw, Snap!"});
		},

		onSort: function () {
			this._bDescendingSort = !this._bDescendingSort;
			var oBinding = this.oProductsTable.getBinding("items"),
				oSorter = new Sorter("name", this._bDescendingSort);

			oBinding.sort(oSorter);
		},
        onListItemPress: function (oEvent) {
            const sPath = oEvent.getSource().getBindingContext().getPath(); 
            
            const customerId = sPath.split("(")[1].split(")")[0];
                this.oRouter.navTo("detail", {
                    Customer: customerId,
                    layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded
                });
		}
	});
});
