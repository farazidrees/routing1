sap.ui.define(
  ["sap/ui/model/json/JSONModel", "com/sap/routing1/controller/BaseController"],
  function (JSONModel, BaseController) {
    "use strict";

    var _aValidTabKeys = ["Info", "Projects", "Hobbies", "Notes"];

    return BaseController.extend("com.sap.routing1.controller.Resume", {
      onInit: function () {
        this.zgetRouter()
          .getRoute("resume")
          .attachMatched(this._onRouteMatched, this);
        this.getView().setModel(new JSONModel(), "zviewModel");
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
            dataReceived: function (oEvent) {
              oView.setBusy(false);
            },
          },
        });

        oQuery = oArgs["?query"];
        if (oQuery && _aValidTabKeys.indexOf(oQuery.tab) > -1) {
            oView.getModel("zviewModel").setProperty("/selectedTabKey", oQuery.tab);
        } else {
            //the default query param should be visble at all time
          this.zgetRouter().navTo(
            "resume",
            {
              id: oArgs.id,
              "?query": {
                tab: _aValidTabKeys[0],
              },
            },
            true //"no history because everytime you select tabs in icontab bar the back button will take you thru all the previously selected tabs until the preview view is reached)
          ); 
        }
      },

      _onBindingChange: function (oEvent) {
        var bindingContext = this.getView().getBindingContext("zjsonModel");

        //No data for the binding
        if (!bindingContext || !bindingContext.getProperty("firstName")) {
          this.zgetRouter().getTargets().display("targetInvalid");
        }
      },
    });
  }
);
