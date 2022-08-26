import "./App.css";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Web3 from "web3";
import Main from "./components/Main/EtherWallet";

function App() {
  const [account, setAccount] = useState();
  const [networkId, setNetworkId] = useState();
  // const [network,setNetwork] = useState();
  const web3 = new Web3(window.ethereum);
  
  const loadWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      await window.ethereum.on('accountsChanged', function (account) {
        setAccount(account[0]);
      })
      
    } else if (window.web3) {
      window.web3 = new Web3(window.ethereum);
    } else {
      window.alert("Check metaMask!");
    }
  };

  
 
  useEffect(() => {
    const loadBlockChaindata = async () => {
      const temp1 = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const temp2 = await window.ethereum.request({ method: 'net_version' })
      setAccount(temp1[0]);
      setNetworkId(temp2);
      
    };
    
  loadWeb3();
  loadBlockChaindata();
     
  }, [account]);

  return (
    <div>
      <Navbar account={account} />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <Main web3={web3} nId={networkId} account={account} />
    </div>
  );
}

export default App;
