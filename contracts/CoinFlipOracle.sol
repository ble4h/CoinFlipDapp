pragma solidity 0.5.12;

import "./RandomFlip.sol";

contract CoinFlipOracle is RandomFlip {
  uint public rate;
  uint public minBet;
  uint public maxBet;

  mapping (address => uint) balance;

  mapping (address => UserBet) userBet;

  struct UserBet {
    uint betOn;
    uint betAmount;
    bool betDone;
    bool win;
  }

  constructor() public {
      rate = 195; // to be divided by 100
      minBet = 0.1 ether;
      maxBet = 5 ether;
  }


  event BalanceAfterDeposit (address user, uint amount);
  event GeneratedRandomNumber(address user, bytes32 queryID, uint randomNumber, bytes proof);
  event BetResult (address user, bool betResult, uint betOn, uint amount, uint balance);
  event WithdrawBalance (address user, uint amount);

  modifier nonZeroValue {
    require (msg.value > 0, "Non-zero value!");
    _; // run the function after modifier
  }

  function placeBet (uint input, uint amount) public returns (bool) {
    require (minBet <= amount && balance[msg.sender] >= amount && amount <= maxBet);
    require(userQuery[msg.sender].waitingForCallback == false); // what if __callback never completes? resetUser called after userWithdrawBalance

    balance[msg.sender] -= amount;
    userBet[msg.sender] = UserBet(input,amount,false,false);

    getRandomNumber();
  }

  function betResult(uint input, uint randomNumber, address user) private {
    require (userBet[user].betDone == false);

    if (input == randomNumber){
      userBet[user].win = true;
      balance[user] += rate * userBet[user].betAmount / 100;
    }

    else {
      userBet[user].win = false;
    }

    emit BetResult (user, userBet[user].win, input, userBet[user].betAmount, balance[user]);

    userBet[user].betDone = true;
    userQuery[user].waitingForCallback = false;
  }

  function __callback(bytes32 _queryID, string memory _result, bytes memory _proof) public {

    require(msg.sender == provable_cbAddress());
    uint256 randomNumber = uint256(keccak256(abi.encodePacked(_result))) % modulo;

    require(userQuery[queryIDToUser[_queryID]].lastestQueryID == _queryID);
    require(userQuery[queryIDToUser[_queryID]].waitingForCallback == true);
    userQuery[queryIDToUser[_queryID]] = UserQuery(true, _queryID, randomNumber);

    emit GeneratedRandomNumber(queryIDToUser[_queryID], _queryID, randomNumber, _proof);

    // do bet
    betResult(userBet[queryIDToUser[_queryID]].betOn,randomNumber,queryIDToUser[_queryID]);
  }

  function userDeposit() public nonZeroValue payable {
    balance[msg.sender] += msg.value;

    emit BalanceAfterDeposit (msg.sender, balance[msg.sender]);
  }

  function userWithdrawBalance() public payable {
      uint withdrawAmount;

      require(balance[msg.sender] > 0);
      require(balance[msg.sender] <= address(this).balance);

      withdrawAmount = balance[msg.sender];
      balance[msg.sender] = 0;

      msg.sender.transfer(withdrawAmount);

      emit WithdrawBalance(msg.sender, withdrawAmount);

      resetUser();
  }

  function resetUser() private {
      userBet[msg.sender] = UserBet(0,0,false,false);
      userQuery[msg.sender] = UserQuery(false,0,0);
  }

  function getContractBalance () public view returns (uint) {
    return address(this).balance;
  }

  function getUserBalance () public view returns (uint) {
    return balance[msg.sender];
  }

  function setRate (uint newRate) public onlyOwner {
      require (newRate >= 100);
      rate = newRate;
  }

  function ownerDeposit() public onlyOwner nonZeroValue payable returns (uint contractBalance) {
      return address(this).balance;
  }

  function ownerWithdrawAll() public onlyOwner payable returns (uint contractBalance) {
      require(address(this).balance > 0);
      msg.sender.transfer(address(this).balance);
      return address(this).balance;
  }

  function getUserBet() public view returns (uint betOn,uint betAmount,bool betDone,bool win) {
      return (userBet[msg.sender].betOn,userBet[msg.sender].betAmount,userBet[msg.sender].betDone,userBet[msg.sender].win);
  }

  function getUserQuery() public view returns (bool waitingForCallback,bytes32 lastestQueryID,uint latestRandomNumber) {
      return (userQuery[msg.sender].waitingForCallback,userQuery[msg.sender].lastestQueryID,userQuery[msg.sender].latestRandomNumber);
  }
}
