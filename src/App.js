import "./App-styled.js";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Web3 from "web3";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import { Break,ContainerApp } from "./App-styled.js";

/* Importing of all the components*/
import Branches from "./components/Branches/Branches.js";
import Crack from "./components/Crack/Crack";
import Defense from "./components/Defense/Defense"; 
import Dino from "./components/Dino/Dino"; 
import Door from "./components/Door/Door"; 
import EtherWallet from "./components/EtherWallet/EtherWallet";
import GasDefense from "./components/GasDefense/Gasdefense"; 
import Hand from "./components/Hand/Hand";
import Password from "./components/Password/Password";
import Seller from "./components/Seller/Seller"; 
import Storage from "./components/Storage/Storage";
import Switch from "./components/Switch/Switch";
import Timezone from "./components/Timezone/Timezone"; 
import Topbidder from "./components/Topbidder/Topbidder"; 
import Transfer from "./components/Transfer/Transfer.js";



function App() {
  const [account, setAccount] = useState();
  const [networkId, setNetworkId] = useState();
  // const [network,setNetwork] = useState();
  const web3 = new Web3(window.ethereum);

  useEffect(() => {
    const loadBlockChaindata = async () => {
      const temp1 = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(temp1[0]);
    };
    const loadWeb3 = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        await window.ethereum.on("accountsChanged", function (account) {
          setAccount(account[0]);
        });
        const temp2 = await web3.eth.net.getId();
        setNetworkId(temp2);
      } else if (window.web3) {
        window.web3 = new Web3(window.ethereum);
      } else {
        window.alert("Check metaMask!");
      }
    };

    loadWeb3();
    loadBlockChaindata();
  }, [account, networkId, web3.eth.net]);

  return (
    <>
        
        <Navbar account={account} />
        
        <Break></Break>
  

        <ContainerApp>
        
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/branches" element={<Branches/>}/>
          <Route path="/crack" element={<Crack/>} />
          <Route path="/defense" element={<Defense/>} />
          <Route path="/dino" element={<Dino/>}/>
          <Route path="/door" element={<Door/>}/>
          <Route path="/withdraw" element={<EtherWallet web3={web3} nId={networkId} account={account} />}/>
          <Route path="/gasdefense" element={<GasDefense/>} />
          <Route path="/hand" element={<Hand/>}/>
          <Route path="/unlock" element={<Password web3={web3} nId={networkId} account={account} />}/>
          <Route path="/seller" element={<Seller/>} />
          <Route path="/consign" element={<Storage web3={web3} nId={networkId} account={account} />}/>
          <Route path="/switch" element={<Switch/>}/>
          <Route path="/timezone" element={<Timezone/>}/>
          <Route path="/topbidder" element={<Topbidder/>}/>
          <Route path="/transfer" element={<Transfer web3={web3} nId={networkId} account={account} />}/>

          
        </Routes>
        {/* <Password web3={web3} nId={networkId} account={account} /> */}
        {/* <EtherWallet web3={web3} nId={networkId} account={account} /> */}
        {/* <Storage web3={web3} nId={networkId} account={account} /> */}
        </ContainerApp>
    </>
  );
}

export default App;
