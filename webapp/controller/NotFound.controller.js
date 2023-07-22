sap.ui.define([
    "com/sap/routing1/controller/BaseController"
],
    function (BaseController) {
        "use strict";

        return BaseController.extend("com.sap.routing1.controller.NotFound", {
            onInit: function () {
                var oRouter, oTarget;

                oRouter = this.zgetRouter();
                oTarget = oRouter.getTargets("targetInvalid");
                oTarget.attachDisplay(function (oEvent) {
                    this._oData = oEvent.getParameter("data");
                }, this);
            },

            onNavBack: function () {
                if (this._oData && this._oData.zfromTarget) { //sourceview used display instead of navTo so go thru this logic
                    this.zgetRouter().getTargets().display(this._oData.zfromTarget);
                    delete this._oData.zfromTarget;
                    return;
                }
                //call the parents onNavBack //sourceview used navTo so go thru this logic
                BaseController.prototype.onNavBack.apply(this, arguments);
            }
        });
    });
