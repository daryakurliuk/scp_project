sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("user_display.controller.user_display", {
        onInit: function () {
			console.log("controller init");		
		},

		updateUser: function() {
			var oTable = this.getView().byId("usersTable");

			var oSelectedItem = oTable.getSelectedItem();

			var index = oTable.indexOfItem(oSelectedItem);
			console.log(index);

			var name = sap.ui.getCore().byId(this.getView().sId + "--input_name").getValue();

			if (index == -1){
				sap.m.MessageToast.show("User is not selected!");
			} else if (name == ""){
				sap.m.MessageToast.show("Enter the name");	
			} else{
				var usid = oTable.getSelectedItem().getBindingContext("users").getObject().usid;
				var settings = {
					"async": true,
					"crossDomain": true,
					"url": "https://scp-hw-scp-hw-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata/Users('" + usid + "')",
					"method": "PUT",
					"headers": {
						"content-type": "application/json"
					},
					"processData": false,
					"data": "{\"name\": \"" + name  + "\",\"creationDate\":null,\"updateDate\":null}"
				};
				console.log(settings.url);
				$.ajax(settings).done(function (response) {
					console.log(response);
				});
				window.location.reload();
			}		
		},

		createUser: function () {
			var name = sap.ui.getCore().byId(this.getView().sId + "--input_name").getValue();

			if (name == ""){
				sap.m.MessageToast.show("Enter the name");	
			} else {
				var settings = {
					"async": true,
					"crossDomain": true,
					"url": "https://scp-hw-scp-hw-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata/Users",
					"method": "POST",
					"headers": {
						"content-type": "application/json"
					},
					"processData": false,
					"data": "{\"name\": \"" + name  + "\"}"
				};
	
				$.ajax(settings).done(function (response) {
					console.log(response);
				});
				window.location.reload();
			}			
		}
     });
});