import abi from "./abi.js";
import openTab from "./tab.js";
const { ethers: etherjs } = ethers;
console.log("Ayo")

const rpcUrl = "https://goerli.infura.io/v3/ba80361523fe423bb149026a490266f0";
const signerProvider = new etherjs.providers.Web3Provider(window.ethereum);

const provider = new etherjs.providers.JsonRpcProvider(rpcUrl);

const signer = signerProvider.getSigner();
//const tokenAddress = "0xC770d227Eb937D7D3A327e68180772571C24525F";
const contracts = [
    "0x91EF3CD82B9287a45BE848fC3627254349684139",
    "0x89692B2C5024482284E18E2Ec657235c7d538eE7",
    "0x2afeDC33959006042C613C1E925c3CE0844704B5",
    "0xE441700EA7C787CE3910D78fB628704B52126a48",
    "0xcF7828A211336bD3304097c8C531Fd327898b036"
];

// const contracts = [
//   "0x0D0AEDB0B20e7851D7A1BEcC0463738eb7c64cE0",
//   "0x96316750AC3Cc8B9414dEC76790FdC735c503D16",
//   "0x4c45AD2879B163DCfF3a76f27EDeBFAf8b6F5413",
//   "0x2190030eED31a02cec2637A36480b61FD1A48229",
//   "0x3385F102B08523E492b933FaA1d3246Afa670C0a"
// ];



const useContract = (
  address,
  contractAbi,
  isSigner = false
) => {
  const providerSigner = new etherjs.providers.Web3Provider(window.ethereum);
  const signer = providerSigner.getSigner();
  const provider = new etherjs.providers.JsonRpcProvider(rpcUrl);
  const newProvider = isSigner ? signer : provider;
  return new ethers.Contract(address, contractAbi, newProvider);
};

// view functions
// new ethers.Contract(address, abi, provider)

//state  mutating functions
// new ethers.Contract(address, abi, signer)

const connectWallet = async () => {
  await signerProvider.send("eth_requestAccounts");
  await getUserWallet();
};

const getUserWallet = async () => {
  let userAddress = await signer.getAddress();
  //   connectedWallet = userAddress;
  updateUserAddress(userAddress);
  //   console.log(connectedWallet, "connected wallet");
};

export default {
  openTab,
};

// elements
// const button = document.getElementById("connectBtn");
// const userAddress = document.getElementById("userAddress");

// Event Listeners
connectBtn.addEventListener("click", connectWallet);

function updateUserAddress(address) {
  userAddress.innerText = address;
}

function tokenTemplateUpdate(name, symbol, totalSupply, balance) {
  return `<div class="flex justify-between items-center">
    <div>
        <div class="flex items-center">
            <div class="p-2 token-thumbnail w-10 h-10"> 
                <img src="https://bafybeiekvvr4iu4bqxm6de5tzxa3yfwqptmsg3ixpjr4edk5rkp3ddadaq.ipfs.dweb.link/" alt="token-img" />  </div>
            <div>
                <p class="font-semibold">${name} - ${symbol} </p>
                <p>Total Supply:${totalSupply}</p>
            </div>
        </div>
    </div>
    <div>${balance}</div>
</div>`;
}

async function getTokenDetails() {
  loader.innerText = "Loading...";
  //const token = await useContract(tokenAddress, abi);
  const token1 = await useContract(contracts[0], abi);
  const token2 = await useContract(contracts[1], abi);
  const token3 = await useContract(contracts[2], abi);
  const token4 = await useContract(contracts[3], abi);
  const token5 = await useContract(contracts[4], abi);


  try {
    const [name1, symbol1, totalSupply1, balance1] = await Promise.all([
      token1.name(),
      token1.symbol(),
      token1.totalSupply(),
      token1.balanceOf(signer.getAddress())
    ]);

    const [name2, symbol2, totalSupply2, balance2] = await Promise.all([
      token2.name(),
      token2.symbol(),
      token2.totalSupply(),
      token2.balanceOf(signer.getAddress())
    ]);

    const [name3, symbol3, totalSupply3, balance3] = await Promise.all([
      token3.name(),
      token3.symbol(),
      token3.totalSupply(),
      token3.balanceOf(signer.getAddress())
    ]);

    const [name4, symbol4, totalSupply4, balance4] = await Promise.all([
      token4.name(),
      token4.symbol(),
      token4.totalSupply(),
      token4.balanceOf(signer.getAddress())
    ]);

    const [name5, symbol5, totalSupply5, balance5] = await Promise.all([
      token5.name(),
      token5.symbol(),
      token5.totalSupply(),
      token5.balanceOf(signer.getAddress())
    ]);
    return { 
        token1:{name1, symbol1, totalSupply1, balance1},
        token2:{name2, symbol2, totalSupply2, balance2},
        token3:{name3, symbol3, totalSupply3, balance3},
        token4:{name4, symbol4, totalSupply4, balance4},
        token5:{name5, symbol5, totalSupply5, balance5}
    };
  } catch (error) {
    errored.innerText = "Error Occurred!";
    console.log("error occurred", error);
  } finally {
    loader.innerText = "";
  }
}

async function InitData() {
  const { token1, token2, token3, token4, token5} = await getTokenDetails();
  const template1 = tokenTemplateUpdate(token1.name1, token1.symbol1, token1.totalSupply1 / 10 ** 18, token1.balance1 / 10 ** 18);
  const template2 = tokenTemplateUpdate(token2.name2, token2.symbol2, token2.totalSupply2 / 10 ** 18, token2.balance2 / 10 ** 18);
  const template3 = tokenTemplateUpdate(token3.name3, token3.symbol3, token3.totalSupply3 / 10 ** 18, token3.balance3 / 10 ** 18);
  const template4 = tokenTemplateUpdate(token4.name4, token4.symbol4, token4.totalSupply4 / 10 ** 18, token4.balance4 / 10 ** 18);
  const template5 = tokenTemplateUpdate(token5.name5, token5.symbol5, token5.totalSupply5 / 10 ** 18, token5.balance5 / 10 ** 18);
  token.innerHTML += template1;
  token.innerHTML += template2;
  token.innerHTML += template3;
  token.innerHTML += template4;
  token.innerHTML += template5;
}

InitData();

// tokenDetails();

/***
 * @amt - Number
 * @receiver - string
 **/

 // transfer 1
async function sendToken1(address, amt) {
  const contract1 = useContract(contracts[0], abi, true);
  console.log(contract1);
  // const amount = new etherjs.utils.parseEthers();
  const decimal = await getDecimals();
  const parseUnit = new etherjs.utils.parseUnits(amt, decimal);
  const txn = await contract1.transfer(address, parseUnit);
  console.log(txn, "transaction pending....");
  sendTransaction.innerText = "Sending";
  window.alert(`transaction pending....`);
  const confirm = await txn.wait();
  console.log("transaction ends", confirm);
  window.alert(`${amt} CLT sent to ${address}`);
  sendTransaction.innerText = "Send";

}

async function getDecimals() {
  return await useContract(contracts[0], abi).decimals();
}

sendTransaction1.addEventListener("click", async () => {
 const amount = amt1.value;
  const receiverAddress = receiver1.value;
  console.log(amount, receiverAddress);

  await sendToken1(receiver1.value, amt1.value);
});


// const contract2 = useContract(contracts[1], abi, true);
// const contract3 = useContract(contracts[2], abi, true);
// const contract4 = useContract(contracts[3], abi, true);
// const contract5 = useContract(contracts[4], abi, true);

  // transfer 2

  async function sendToken2(address, amt) {
    const contract2 = useContract(contracts[1], abi, true);
    console.log(contract2);
    // const amount = new etherjs.utils.parseEthers();
    const decimal = await getDecimals();
    const parseUnit = new etherjs.utils.parseUnits(amt, decimal);
    const txn = await contract2.transfer(address, parseUnit);
    console.log(txn, "transaction pending....");
    sendTransaction2.innerText = "Sending";
    window.alert(`transaction pending....`);
    const confirm = await txn.wait();
    console.log("transaction ends", confirm);
    window.alert(`${amt} sent to ${address}`);
    sendTransaction2.innerText = "Send";
  
  }

sendTransaction2.addEventListener("click", async () => {
    const amount = amt2.value;
     const receiverAddress = receiver2.value;
     console.log(amount, receiverAddress);
   
     await sendToken2(receiver2.value, amt2.value);
   });

     // transfer 3


     async function sendToken3(address, amt) {
        const contract3 = useContract(contracts[2], abi, true);
        console.log(contract3);
        // const amount = new etherjs.utils.parseEthers();
        const decimal = await getDecimals();
        const parseUnit = new etherjs.utils.parseUnits(amt, decimal);
        const txn = await contract3.transfer(address, parseUnit);
        console.log(txn, "transaction pending....");
        sendTransaction3.innerText = "Sending";
        window.alert(`transaction pending....`);
        const confirm = await txn.wait();
        console.log("transaction ends", confirm);
        window.alert(`${amt} sent to ${address}`);
        sendTransaction3.innerText = "Send";
      
      }
    
    sendTransaction3.addEventListener("click", async () => {
        const amount = amt3.value;
         const receiverAddress = receiver3.value;
         console.log(amount, receiverAddress);
       
         await sendToken3(receiver3.value, amt3.value);
       });

       // Transfer 4

       async function sendToken4(address, amt) {
        const contract4 = useContract(contracts[3], abi, true);
        console.log(contract4);
        // const amount = new etherjs.utils.parseEthers();
        const decimal = await getDecimals();
        const parseUnit = new etherjs.utils.parseUnits(amt, decimal);
        const txn = await contract4.transfer(address, parseUnit);
        console.log(txn, "transaction pending....");
        sendTransaction4.innerText = "Sending";
        window.alert(`transaction pending....`);
        const confirm = await txn.wait();
        console.log("transaction ends", confirm);
        window.alert(`${amt} sent to ${address}`);
        sendTransaction4.innerText = "Send";
      
      }
    
    sendTransaction4.addEventListener("click", async () => {
        const amount = amt4.value;
         const receiverAddress = receiver4.value;
         console.log(amount, receiverAddress);
       
         await sendToken4(receiver4.value, amt4.value);
       });

       // Transfer 5

       async function sendToken5(address, amt) {
        const contract5 = useContract(contracts[4], abi, true);
        console.log(contract5);
        // const amount = new etherjs.utils.parseEthers();
        const decimal = await getDecimals();
        const parseUnit = new etherjs.utils.parseUnits(amt, decimal);
        const txn = await contract5.transfer(address, parseUnit);
        console.log(txn, "transaction pending....");
        sendTransaction5.innerText = "Sending";
        window.alert(`transaction pending....`);
        const confirm = await txn.wait();
        console.log("transaction ends", confirm);
        window.alert(`${amt} sent to ${address}`);
        sendTransaction5.innerText = "Send";
      
      }
    
    sendTransaction5.addEventListener("click", async () => {
        const amount = amt5.value;
         const receiverAddress = receiver5.value;
         console.log(amount, receiverAddress);
       
         await sendToken5(receiver5.value, amt5.value);
       });