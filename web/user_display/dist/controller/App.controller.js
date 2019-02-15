sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
	"use strict";

	return Controller.extend("user_display.controller.App", {
		onInit: function(){
		},
		getRouter : function () {
			return UIComponent.getRouterFor(this);
		},
		productListFactory : function(sId, oContext) {
			var oUIControl;
			oUIControl = this.byId("productExtended").clone(sId);
			return oUIControl;
		},		
		onItemSelected: function(oEvent) {
			var oSelectedItem = oEvent.getSource();
			var context = encodeURIComponent(oSelectedItem.getBindingContext('users').getPath());
			this.getRouter().navTo("detail",  {invoicePath: context});
		}
    });
});