const assert = require("assert");
const axios = require("axios").default;

const { Given, When, Then } = require("cucumber");

Given("Product1", () => {

});

When("Product1 is saved", () => {
    this.product = true;
});

Then("Product1 is retrievable", () => {
    assert.equal(this.product, true);
});