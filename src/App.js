import "./App.css";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Web3 from "web3";
import Main from "./components/Main/EtherWallet";

function App() {
  const [account, setAccount] = useState();
  const [networkId, setNetworkId] = useState();
  const web3 = new Web3(window.ethereum);
  const loadWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else if (window.web3) {
      window.web3 = new Web3(window.ethereum);
    } else {
      window.alert("Check metaMask!");
    }
  };

  const loadBlockChaindata = async () => {
    const temp1 = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const temp2 = await web3.eth.net.getId();
    setAccount(temp1[0]);
    setNetworkId(temp2);
  };

  loadBlockChaindata();
  useEffect(() => {
    loadWeb3();
  }, []);

  return (
    <div>
      <Navbar account={account} />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <Main web3={web3} nId={networkId} />
    </div>
  );
}

export default App;
