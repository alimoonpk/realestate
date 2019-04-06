App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Property.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);

      App.listenForEvents();
      App.listenForEventsNotVerified();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.Election.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.verifiedEvent({}, {
        fromBlock: 'latest',
        //toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        $("#ResultFailed").hide();
        $("#ResultSuccess").html("Data Verified Successfully!");
        $("#ResultSuccess").show();
        // Reload when a new vote is recorded
    //    App.render();
      });
    });
  },

  listenForEventsNotVerified: function() {
    App.contracts.Election.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.notVerifiedEvent({}, {
        fromBlock: 'latest',
        //toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        $("#ResultSuccess").hide();
        $("#ResultFailed").html("Data Verification Failed!");
        $("#ResultFailed").show();
        // Reload when a new vote is recorded
    //    App.render();
      });
    });
  },

  render: function() {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    $("#ResultSuccess").hide();
    $("#ResultFailed").hide();
    $("#verifiedData").hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    web3.personal.unlockAccount("0xa6924b283daa62c3e9ed886e42f1c1068d6c20f1","ali",1000000, function(err, transactionHash) {
  if (!err)
    console.log(transactionHash);
});


    // Load contract data
    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then(function(candidatesCount) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      var candidatesSelect = $('#candidatesSelect');
      candidatesSelect.empty();

      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(function(candidate) {
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];
          var licenseNumber = candidate[3];
          var registrationNumber = candidate[4];
          var size = candidate[5];
          var location = candidate[6];
          var rooms = candidate[7];
          var price = candidate[8];
          var ownerName = candidate[9];
          var ownerAddress = candidate[10];
          var tempHash = candidate[11];

          // Render candidate Result
          var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + licenseNumber + "</td></td><td>" + registrationNumber + "</td></td><td>" + size + "</td></td><td>" + location + "</td></td><td>" + rooms + "</td></td><td>" + price + "</td></td><td>" + ownerName + "</td></td><td>" + ownerAddress + "</td><td>" + tempHash + "</td></tr>"
          candidatesResults.append(candidateTemplate);

          // Render candidate ballot option
          var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
          candidatesSelect.append(candidateOption);
        });
      }
      return electionInstance.voters(App.account);
    }).then(function(hasVoted) {
      // Do not allow a user to vote
      if(hasVoted) {
        $('form').hide();
      }
      loader.hide();
      content.show();
      document.getElementById("Result").innerHTML = "";
    }).catch(function(error) {
      console.warn(error);
    });
  },

  castVote: function() {
    var candidateId = $('#candidatesSelect').val();
    App.contracts.Election.deployed().then(function(instance) {
      return instance.vote(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  newListing: function() {
    var nameInput = $('#nameInput').val();
    var licenseNumberInput = $('#licenseNumberInput').val();
    var registrationNumberInput = $('#registrationNumberInput').val();
    var sizeInput = $('#sizeInput').val();
    var locationInput = $('#locationInput').val();
    var roomsInput = $('#roomsInput').val();
    var priceInput = $('#priceInput').val();
    var ownerNameInput = $('#ownerNameInput').val();
    App.contracts.Election.deployed().then(function(instance) {
      return instance.addCandidate(nameInput, licenseNumberInput, registrationNumberInput, sizeInput, locationInput, roomsInput, priceInput,ownerNameInput, { from: App.account });
    //  return instance.addCandidate("House MM", 2541, 2222, 240, "Johar", 6, 750, "Furqan");
    }).then(function(result) {

      var dataToPrint = "	"+nameInput+"	"+licenseNumberInput+"	"+registrationNumberInput+"	"+sizeInput+"	"+locationInput+"	"+roomsInput+"	"+priceInput+"	"+ownerNameInput;
      console.log(dataToPrint);

      var hiddenElement = document.createElement('a');

      hiddenElement.href = 'data:attachment/text,' + encodeURI(dataToPrint);
      hiddenElement.target = '_blank';
      hiddenElement.download = 'Certificate of Ownership - '+nameInput+'.txt';
      hiddenElement.click();

    //  $("#content").hide();
    //  $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  editListing: function() {
    var candidateId = $('#candidatesSelect').val();
    var ownerNameEdit = $('#ownerNameEdit').val();
    var ownerAddressEdit = $('#ownerAddressEdit').val();

    App.contracts.Election.deployed().then(function(instance) {
    //  return instance.editCandidate(1, "Pathan", "0xd11d1CAa0ac51dc4e94ecE78F13fb4eCa2465596", { from: App.account });
        return instance.editCandidate(candidateId, ownerNameEdit, ownerAddressEdit, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update

      var dataToPrint = "	"+ownerNameEdit;
      console.log(dataToPrint);

      var hiddenElement = document.createElement('a');

      hiddenElement.href = 'data:attachment/text,' + encodeURI(dataToPrint);
      hiddenElement.target = '_blank';
      hiddenElement.download = 'Certificate of Ownership.txt';
      hiddenElement.click();


    //  $("#content").hide();
    //  $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  testHash: function() {
    var candidateId = $('#candidatesSelect').val();
    var enterHash = $('#enterHash').val();
    var ownerAddressEdit = $('#ownerAddressEdit').val();

    App.contracts.Election.deployed().then(function(instance) {
        return instance.hashSeriesNumber(enterHash, { from: App.account });
    }).then(function(result) {
      console.log(result);
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  verifyHash: function() {
    var candidateId = $('#candidatesSelect').val();
    var enterHashtoVerify = $('#enterHashtoVerify').val();
    enterHashtoVerify = enterHashtoVerify.replace(/	+/g, "");
    enterHashtoVerify = enterHashtoVerify.replace(/\d+/g, '');

    App.contracts.Election.deployed().then(function(instance) {
        return instance.verifyDocument(candidateId, enterHashtoVerify, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
    //  $("#content").hide();
    //  $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

getDataFromHash: function() {
  var resultFound = 0;
  var HashtoVerify = $('#HashtoVerify').val();
  App.contracts.Election.deployed().then(function(instance) {
    electionInstance = instance;
    return electionInstance.candidatesCount();
  }).then(function(candidatesCount) {

    for (var i = 1; i <= candidatesCount; i++) {
      electionInstance.candidates(i).then(function(candidate) {
        var id = candidate[0];
        var name = candidate[1];
        var voteCount = candidate[2];
        var licenseNumber = candidate[3];
        var registrationNumber = candidate[4];
        var size = candidate[5];
        var location = candidate[6];
        var rooms = candidate[7];
        var price = candidate[8];
        var ownerName = candidate[9];
        var ownerAddress = candidate[10];
        var tempHash = candidate[11];

if(tempHash == HashtoVerify){
  resultFound = 1;
document.getElementById("propertyIDInputVerified").value = id;
document.getElementById("nameInputVerified").value = name;
document.getElementById("licenseNumberInputVerified").value = licenseNumber;
document.getElementById("registrationNumberInputVerified").value = registrationNumber;
document.getElementById("sizeInputVerified").value = size;
document.getElementById("locationInputVerified").value = location;
document.getElementById("roomsInputVerified").value = rooms;
document.getElementById("priceInputVerified").value = price;
document.getElementById("ownerNameInputVerified").value = ownerName;
document.getElementById("ownerAddressInputVerified").value = ownerAddress;
document.getElementById("hashInputVerified").value = tempHash;
if(resultFound == 1){
    $("#ResultSuccess").show();
    $("#verifiedData").show();
    $("#ResultSuccess").html("Data Verified Successfully!");
    $("#ResultFailed").hide();
    }
}
if(resultFound == 0){
    $("#ResultSuccess").hide();
    $("#ResultFailed").show();
    $("#ResultFailed").html("Hash Data Verification Failed!");
    $("#verifiedData").hide();
    }

      });
    }
    return electionInstance.voters(App.account);
  })

}

}

$(function() {
  $(window).load(function() {
    App.init();
  });
});
