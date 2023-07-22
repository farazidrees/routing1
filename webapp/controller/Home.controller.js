sap.ui.define([
    "com/sap/routing1/controller/BaseController"
],
    function (BaseController) {
        "use strict";

        return BaseController.extend("com.sap.routing1.controller.Home", {
            onInit: function () {

            },
            onDisplayInvalidTarget: function () {
                this.zgetRouter().getTargets().display("targetInvalid", {zfromTarget: "targetHome"}); //because here you are using display instead of navTo you need to tell the target that you are coming from here
            },

            onNavToValidRoute: function () {
                this.zgetRouter().navTo("employees");
            }
        });
    });
