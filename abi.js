console.log("Hello from CoinFlipOracle abi.js!");

var abi = [
			{
				"inputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "constructor"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": false,
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "BalanceAfterDeposit",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": false,
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "bool",
						"name": "betResult",
						"type": "bool"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "betOn",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "balance",
						"type": "uint256"
					}
				],
				"name": "BetResult",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": false,
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "bytes32",
						"name": "queryID",
						"type": "bytes32"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "randomNumber",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "bytes",
						"name": "proof",
						"type": "bytes"
					}
				],
				"name": "GeneratedRandomNumber",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": false,
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"indexed": false,
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "bytes32",
						"name": "queryID",
						"type": "bytes32"
					}
				],
				"name": "LogNewProvableQuery",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": false,
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "WithdrawBalance",
				"type": "event"
			},
			{
				"constant": false,
				"inputs": [
					{
						"internalType": "bytes32",
						"name": "_myid",
						"type": "bytes32"
					},
					{
						"internalType": "string",
						"name": "_result",
						"type": "string"
					}
				],
				"name": "__callback",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"internalType": "bytes32",
						"name": "_queryID",
						"type": "bytes32"
					},
					{
						"internalType": "string",
						"name": "_result",
						"type": "string"
					},
					{
						"internalType": "bytes",
						"name": "_proof",
						"type": "bytes"
					}
				],
				"name": "__callback",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [],
				"name": "boom",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "getContractBalance",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [],
				"name": "getRandomNumber",
				"outputs": [],
				"payable": true,
				"stateMutability": "payable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "getUserBalance",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "getUserBet",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "betOn",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "betAmount",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "betDone",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "win",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "getUserQuery",
				"outputs": [
					{
						"internalType": "bool",
						"name": "waitingForCallback",
						"type": "bool"
					},
					{
						"internalType": "bytes32",
						"name": "lastestQueryID",
						"type": "bytes32"
					},
					{
						"internalType": "uint256",
						"name": "latestRandomNumber",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "maxBet",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "minBet",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "modulo",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "owner",
				"outputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [],
				"name": "ownerDeposit",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "contractBalance",
						"type": "uint256"
					}
				],
				"payable": true,
				"stateMutability": "payable",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [],
				"name": "ownerWithdrawAll",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "contractBalance",
						"type": "uint256"
					}
				],
				"payable": true,
				"stateMutability": "payable",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"internalType": "uint256",
						"name": "input",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "placeBet",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "rate",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"internalType": "uint256",
						"name": "newRate",
						"type": "uint256"
					}
				],
				"name": "setRate",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [],
				"name": "userDeposit",
				"outputs": [],
				"payable": true,
				"stateMutability": "payable",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [],
				"name": "userWithdrawBalance",
				"outputs": [],
				"payable": true,
				"stateMutability": "payable",
				"type": "function"
			}
		]
