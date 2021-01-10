var web3 = new Web3(Web3.givenProvider);
var myContract = "0x9c9Bde4928dad1FBa3275AABe6494b4864ad5F11";
var contractInstance;
var status;
var user;
var betResult;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
      contractInstance = new web3.eth.Contract(abi, myContract, {from: accounts[0]}); //todo: check what is ABI
      console.log(contractInstance);
      console.log("Hello from CoinFlipOracle main.js!");
      getAndDisplayBalance();
      user = accounts[0];
      user = user.toLowerCase();
      startEvents();
    });
    $("#userDeposit_button").click(userDeposit)
    $("#heads_button").click(betHeads)
    $("#tails_button").click(betTails)
    $("#userGetBalance_button").click(getAndDisplayBalance)
    $("#userWithdrawBalance_button").click(userWithdrawBalance)
});

function startEvents(){
  contractInstance.events.BetResult({
      //filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
      fromBlock: 0
  }, function(error, event){ console.log(event); })
  .on('data', function(event){
      console.log(event); // same results as the optional callback above
      returnUser = event.returnValues.user;
      returnUser = returnUser.toLowerCase();

      if (returnUser == user){
          var betResult = event.returnValues.betResult;
          betResult ? status = "YOU WIN!" : status = "YOU LOST!";
          status += " Oracle Tx: " + event.transactionHash;
          updateStatus(status);
          getAndDisplayBalance();
      }
  })
  .on('changed', function(event){
      // remove event from local database
  })
  .on('error', console.error);
}

function userDeposit(){
  var amount = $("#userDeposit_input").val();
  var amountWei = {
    value: web3.utils.toWei(amount, "ether")
  }
  console.log("Deposit amount: " + amountWei.value);

  contractInstance.methods.userDeposit().send(amountWei)
  .on("transactionHash",function(hash){
    console.log(hash);
    $("#txHash_output").text(hash);
  })
  .on("confirmation", function(confirmationNr){
    console.log(confirmationNr);
  })
  .on("receipt", function(receipt){
    console.log(receipt);
    // alert("Deposited!");
    status = "Deposited " + amount + " ETH";
    updateStatus(status);
    getAndDisplayBalance();
  })
}

function getAndDisplayBalance(){
  //console.log("getUserBalance_clicked");
  contractInstance.methods.getUserBalance().call().then(function(res){
    $("#getUserBalance_output").text(res);
  })
}

function updateStatus(status){
  $("#status_output").text(status);
}

function betHeads(){
  status = "Betting on Heads. Waiting for Tx..."
  $("#txHash_output").text("");
  updateStatus(status);
  placeBet(0);
}

function betTails(){
  status = "Betting on Tails. Waiting for Tx..."
  $("#txHash_output").text("");
  updateStatus(status);
  placeBet(1);
}

function placeBet(betOn){
  var amount = $(bet_input).val();
  amountWei = web3.utils.toWei(amount,"ether");
  console.log("Bet amount: " + amountWei);

  contractInstance.methods.placeBet(betOn,amountWei).send()
  .on("transactionHash",function(hash){
    console.log(hash);
    $("#txHash_output").text(hash);
  })
  .on("confirmation", function(confirmationNr){
    console.log(confirmationNr);
  })
  .on("receipt", function(receipt){
    console.log(receipt);
    getAndDisplayBalance();
    var headsOrTails;
    (betOn) ? headsOrTails = "Tails": headsOrTails = "Heads";
    status = "Tx Success! Bet on " + headsOrTails + " for " + amount + " ETH. Waiting for Oracle response...";
    updateStatus(status);


  })
}

function userWithdrawBalance(){
  contractInstance.methods.userWithdrawBalance().send()
  .on("transactionHash",function(hash){
    console.log(hash);
    $("#txHash_output").text(hash);
  })
  .on("confirmation", function(confirmationNr){
    console.log(confirmationNr);
  })
  .on("receipt", function(receipt){
    console.log(receipt);
    console.log(receipt.event);
    getAndDisplayBalance();
  })
}
