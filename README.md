# realestateblockchain

1.0 **SETTING UP BLOCKCHAIN ENVIRONMENT FOR PROJECT TO WORK**

> Download Node.js
> Download Git
> $ npm install -g truffle

// Installing LiteServer (Local WebServer)
> $ npm install -g lite-server



2.0 **WE CAN RUN OUR PROJECT ON BOTH PRIVATE NETWORK AND BLOCKCHAIN SIMULATION CONFIGURATION OF BOTH ARE GIVEN BELOW**



2.1 **FOR CONFIGURING PRIVATE NETWORK USING GETH (COMPLEX)**

> Download Geth
> Download genesis.json file from => https://gist.github.com/dickolsson/e652b3d0e7bee55aa0a582d8a03900bf
> Place file in a folder where you want to create blockchain
> After placing file go to that folder then,
> $ geth datadir=chaindata init genesis.json
> $ geth datadir=chaindata --rpc --rpccorsdomain "*" --rpcapi eth,web3,personal,net
*For Creating account in private network > $ personal.newAccount("password")
*For setting coinbase account > $ eth.setEtherbase(account)
*For start mining > $ miner.start(1)
*For stop mining > $ miner.stop()
geth --testnet account new
web3.personal.unlockAccount("0xa6924b283daa62c3e9ed886e42f1c1068d6c20f1","ali",100000)
geth attach http://127.0.0.1:8545


(OR)



2.2.1 **FOR CONFIGURING GANACHE (EASY TO USE INTERFACE)**

> $ npm install -g ganache-cli
> $ ganache-cli

2.2.2 (OR) Simply Run Ganache and Create a New Workspace!
It will automatically simulate a real blockchain environment with Ready to Use Ethereum Accounts having Ether Balances and Mining and everything.


3.0 **AFTER INSTALLATION AND CONFIGURATION IN PROJECT FOLDER**

> $ npm install

// To Run the LocalHost Files (WebServer)
> $ npm run dev

// To Compile and Execute The SmartContract on Local BlockChain
> $ truffle migrate --reset

> $ ng serve
