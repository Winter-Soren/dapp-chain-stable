# Setting Up a Private Network with Polygon-Edge Private Network

### Prerequisites
Make sure you have Polygon-Edge installed on your system.

### **Step 1: Create Nodes Directory**
Create a directory named `dapp-chain` to store all the nodes.

```bash
mkdir dapp-chain
```

### **Step 2: Initialize Secrets**
Run the following command to initialize secrets for your first chain (replace `has-chain-1` with your preferred chain name).

```bash
polygon-edge secrets init --data-dir has-chain-1 --insecure
```

**Output:**
```
[WARNING: INSECURE LOCAL SECRETS - SHOULD NOT BE RUN IN PRODUCTION]

[SECRETS INIT]
Public key (address) = 0x2e74FF80f62652515443e4c64cC7bdc79A8BbBE8
BLS Public key = 0x812c3a6b6c3139ec555c8643443a06ebf7b687433382f1f39acf13d96d179b7c3b656e91305d50451c2b735bd126b4b8
Node ID = 16Uiu2HAm546wDQej3oGL8ec8yvEFvN6hhoCK9rtfoWQazQutCH3y

[WARNING: INSECURE LOCAL SECRETS - SHOULD NOT BE RUN IN PRODUCTION]
```

Copy the generated public key, BLS public key, and Node ID for reference.

### **Step 3: Create Additional Chains**
Repeat the secrets initialization step for additional chains (replace `has-chain-n` with your chain names, where `n` is 2, 3, and 4).

### **Step 4: Generate Genesis Block and Bootnodes**
Run the following command to generate the genesis block and bootnodes configuration. Customize the `--premine` address and amount according to your needs.

```bash
polygon-edge genesis --consensus ibft --ibft-validators-prefix-path has-chain- --bootnode /ip4/127.0.0.1/tcp/10001/p2p/16Uiu2HAkvwvxei2xwymMfrUpgKud6SGff23ZWWQ7N92xWb9uotUP --bootnode /ip4/127.0.0.1/tcp/20001/p2p/16Uiu2HAmRD3MDmxB7aJPfBdkEjyGBgwjnmNj2vXbriZwPeFCP6ErP --premine=0x370e221F02A76c8F4C76d3E72cFF8c6f91888fe8:1000000000000000000
```

**Output:**
```
[GENESIS SUCCESS]

Genesis written to ./genesis.json
```

### **Step 5: Start Nodes**
Open four terminals (or the number of nodes you created). Start the nodes using the following commands (replace `n` with 1, 2, 3, and 4 respectively):

```bash
polygon-edge server --data-dir ./has-chain-1 --chain genesis.json --grpc-address :10000 --libp2p :10001 --jsonrpc :10002 --seal --log-level DEBUG
polygon-edge server --data-dir ./has-chain-2 --chain genesis.json --grpc-address :20000 --libp2p :20001 --jsonrpc :20002 --seal --log-level DEBUG
polygon-edge server --data-dir ./has-chain-3 --chain genesis.json --grpc-address :30000 --libp2p :30001 --jsonrpc :30002 --seal --log-level DEBUG
polygon-edge server --data-dir ./has-chain-4 --chain genesis.json --grpc-address :40000 --libp2p :40001 --jsonrpc :40002 --seal --log-level DEBUG
```

**Example Output (Partial):**
```
2023-10-12T16:53:23.033+0530 [INFO]  polygon.server.jsonrpc: http server started: addr=0.0.0.0:40002
2023-10-12T16:53:23.033+0530 [INFO]  polygon.server.ibft.consensus: sequence started: height=1
2023-10-12T16:53:23.033+0530 [INFO]  polygon.server.ibft.consensus: round started: round=0
...
Peer connected: id=16Uiu2HAm546wDQej3oGL8ec8yvEFvN6hhoCK9rtfoWQazQutCH3y
Peer connected: id=16Uiu2HAm6UvWR8Q81xypFL7YfUdiZYzrczgtj9usL7RkU8x5nmD9
...
```

### **Step 6: Verify Connection**
Check the terminals for peer connection messages to ensure successful node setup.

---

**Note:**
- The provided setup is for testing purposes and should not be used in a production environment.
- Customize chain names, ports, and addresses as needed for your use case.
- Ensure that your system meets the necessary requirements and configurations for Polygon-Edge.
