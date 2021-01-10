pragma solidity 0.5.12;

import "./Ownable.sol";
import "./provableAPI.sol";

contract RandomFlip is Ownable, usingProvable {
  uint256 constant NUM_RANDOM_BYTES_REQUESTED = 1;
  uint256 public modulo;

  mapping (bytes32 => address) queryIDToUser;


  mapping (address => UserQuery) userQuery;

  struct UserQuery {
    bool waitingForCallback;
    bytes32 lastestQueryID;
    uint latestRandomNumber;
  }

  event LogNewProvableQuery(string description, address user, bytes32 queryID);


  constructor () public {
      modulo = 2;
  }

  function getRandomNumber() //rename
      payable
      public
  {
      uint256 QUERY_EXECUTION_DELAY = 0;
      uint256 GAS_FOR_CALLBACK = 200000;

      // (waitingForCallback, lastestQueryID)
      userQuery[msg.sender] = UserQuery(true, provable_newRandomDSQuery(
                                      QUERY_EXECUTION_DELAY,
                                      NUM_RANDOM_BYTES_REQUESTED,
                                      GAS_FOR_CALLBACK
                                      )
        ,999); // unusually large number vs modulo

      queryIDToUser[userQuery[msg.sender].lastestQueryID] = msg.sender;
      emit LogNewProvableQuery("Provable queryID was sent, standing by for answer...", msg.sender, userQuery[msg.sender].lastestQueryID);
  }

  function boom() public onlyOwner {
      selfdestruct(msg.sender);
  }
}
