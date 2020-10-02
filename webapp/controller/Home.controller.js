sap.ui.define([
	"com/esr/itemstorageESR/controller/BaseController",
	"sap/m/MessageToast"
], function (BaseController, MessageToast) {
	"use strict";

	return BaseController.extend("com.esr.itemstorageESR.controller.Home", {
		onInit: function () {
			this.getOwnerComponent().getModel("items");
		},
		
		onEdit: function (oEvent) {
			var oButton = oEvent.getSource();
			var oColumn = oButton.getParent();
			var aCells = oColumn.getAggregation("cells");
			
			// set Inputfields editable
			aCells[1].setEditable(true);
			aCells[2].setEditable(true);
			aCells[3].setEditable(true);
			
			// set Button visible
			aCells[5].setVisible(true);
			aCells[4].setVisible(false);
		},
		
		onSave: function (oEvent) {
			var aCells = oEvent.getSource().getParent().getAggregation("cells");
			var sPath = oEvent.getSource().getParent().getBindingContextPath();
			var oModel = this.getOwnerComponent().getModel("items");
			
			var name = aCells[1].getValue();
			var price = aCells[2].getValue();
			var stock = aCells[3].getValue();
			
			oModel.setProperty(sPath + "/productName", name);
			oModel.setProperty(sPath + "/price", Number(price));
			oModel.setProperty(sPath + "/stock", Number(stock));
			
			// set Inputfields uneditable
			aCells[1].setEditable(false);
			aCells[2].setEditable(false);
			aCells[3].setEditable(false);
			
			// set Button visible
			aCells[5].setVisible(false);
			aCells[4].setVisible(true);
			
			// update databinding for the table
			this.byId("itemTable").getBinding("items").refresh();
			
			// saving model to local storage
			this.saveItemModel();
			
			MessageToast.show("Products have been updated!");
		},
		
		onAddItem: function () {
			this.loadFragment("createDialog", "com.esr.itemstorageESR.fragments.CreateDialog", this);
		},
		
		onCancel: function (oEvent) {
			oEvent.getSource().getParent().close();
		},
		
		onItemSaved: function (oEvent) {
			var id = Number(this.byId("dProductId").getValue());
			var name = this.byId("dProductName").getValue();
			var price = Number(this.byId("dProductPrice").getValue());
			var stock = Number(this.byId("dProductStock").getValue());
			var oModel = this.getOwnerComponent().getModel("items");
			var aProducts = oModel.getData().products;
			
			aProducts.push({
				productId: id,
				productName: name,
				price: price,
				stock: stock
			});
			
			// update databinding for the table
			this.byId("itemTable").getBinding("items").refresh();
			
			// saving model to local storage
			this.saveItemModel();
			
			this.onCancel(oEvent);
		}
	});
});