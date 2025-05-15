/*global QUnit*/

sap.ui.define([
	"com/sap/project1/controller/FlexibleColumnLayout.controller"
], function (Controller) {
	"use strict";

	QUnit.module("FlexibleColumnLayout Controller");

	QUnit.test("I should test the FlexibleColumnLayout controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
