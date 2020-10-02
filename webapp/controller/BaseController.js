sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment"
], function (Controller, JSONModel, Fragment) {
	"use strict";
	
	return Controller.extend("com.esr.itemstorageESR.controller.BaseController", {
		
		onInit: function () {
			
		},
		
		saveItemModel: function () {
			var oModel = this.getOwnerComponent().getModel("items");
			var oData = oModel.getData();
			var sData = JSON.stringify(oData);
			
			window.localStorage.setItem("itemModel", sData);
		},
		
		loadItemModel: function () {
			var sData = window.localStorage.getItem("itemModel");
			var oData = JSON.parse(sData);
			var oModel = new JSONModel(oData);
			
			this.getOwnerComponent().setModel(oModel, "items");
		},
		
		loadFragment: function (sId, sFragmentPath, self) {
			if (!self.byId(sId)){
				Fragment.load({
					id: self.getView().getId(),
					name: sFragmentPath,
					controller: self
				}).then(function (oDialog) {
					self.getView().addDependent(oDialog);
					//oDialog.addStyleClass(self.getOwnerComponent().getContentDensityClass());
					oDialog.open();
				});
			}
			else {
				this.byId(sId).open();
			}
		}
	});
});