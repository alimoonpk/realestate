var TestCase = artifacts.require("./Property.sol");

contract("Sample Test Case", function(accounts) {
  var propertyInstance;

  it("Initializes with two Properties", function() {
    return TestCase.deployed().then(function(instance) {
      return instance.candidatesCount();
    }).then(function(count) {
      assert.equal(count, 2);
    });
  });
