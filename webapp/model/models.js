sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		
		createMockData: function () {
			var data = {
				products: [
					{
						productId: 1,
						productName: "Bread",
						price: 2.99,
						stock: 50
					},
					{
						productId: 2,
						productName: "Milk",
						price: 1.35,
						stock: 120
					},
					{
						productId: 3,
						productName: "Cheese",
						price: 130.00,
						stock: 3
					}
				]
			};
			return new JSONModel(data);
		}
	};
});