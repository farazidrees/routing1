sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "com/sap/routing1/controller/BaseController"
],
    function (JSONModel, BaseController) {
        "use strict";

        return BaseController.extend("com.sap.routing1.controller.Employee", {
            onInit: function () {
                this.zgetRouter().getRoute("employee").attachMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function (oEvent) {
                var oArgs, oView;
                oArgs = oEvent.getParameter("arguments");
                oView = this.getView();
                this._id = oArgs.id;

                oView.bindElement({
                    path: "/" + oArgs.id,
                    model: "zjsonModel",
                    events: {
                        change: this._onBindingChange.bind(this),
                        dataRequested: function (oEvent) {
                            oView.setBusy(true);
                        },
                        dataReceived: function(oEvent) {
                            oView.setBusy(false);
                        }
                    }
                })
            },
            
            _onBindingChange: function (oEvent) {
                var bindingContext = this.getView().getBindingContext("zjsonModel");

             //No data for the binding
             if (!bindingContext || !bindingContext.getProperty("firstName")) {
                this.zgetRouter().getTargets().display("targetInvalid");
             }
            },

            onShowResume: function (oEvent) {
                this.zgetRouter().navTo("resume", {
                    id: this._id,
                    "?query": {
                        "tab": "Hobbies"
                    }
                });
            }           
        });
    });
