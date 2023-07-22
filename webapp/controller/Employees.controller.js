sap.ui.define([
    "com/sap/routing1/controller/BaseController"
],
    function (BaseController) {
        "use strict";

        return BaseController.extend("com.sap.routing1.controller.Employees", {
            onInit: function () {

            },

            onNavToWithMandatoryParams: function () {
                this.zgetRouter().navTo("employee", {
                    id: 0
                })
            }
            
        });
    });
