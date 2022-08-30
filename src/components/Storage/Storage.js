import { useEffect, useState } from "react";
import storageContract from "../../truffle/build/contracts/Storage.json";
import mineContract from "../../truffle/build/contracts/Mine.json";

function Storage({ web3, nId, account }) {
  const [walletBalance, setWalletBalance] = useState();
  const [walletOwner, setWalletOwner] = useState();
  const [walletAddress, setWalletAddress] = useState();

  let Storage = new web3.eth.Contract(
    storageContract.abi,
    storageContract.networks[nId]?.address
  );

  useEffect(() => {
    const loadData = async () => {
      setWalletAddress(storageContract.networks[nId]?.address);
      setMineAddress(mineContract.networks[nId]?.address);
      if (walletAddress) {
        const temp2 = await Storage.methods.balanceOf().call();
        const temp3 = await Storage.methods.owner().call();
        setWalletBalance(web3.utils.fromWei(temp2), "ether");
        setWalletOwner(temp3);
      }
    };
    loadData();
  }, [walletAddress, walletOwner, walletBalance, web3, nId, account]);

  const getBalance = async () => {
    let nice = await Storage.methods.balanceOf().call();
    console.log(nice);
  };

  const getOwner = () => {
    console.log(walletOwner);
    return walletOwner;
  };

  const getWithdraw = async () => {
    await Storage.methods.withdraw().send({ from: account });
  };

  const ThisIsMine = async () => {
    let txparam = {
      to: walletAddress,
      from: account,
      value: "0x0000",
    };
    await window.ethereum
      .request({ method: "eth_sendTransaction", params: [txparam] })
      .then(function (txparam) {
        console.log(txparam);
      });
    console.log();
  };

  return (
    <>
      <button onClick={getWithdraw}> Withdraw</button> &nbsp;
      <button onClick={getBalance}> balanceOf</button> &nbsp;
      <button onClick={getOwner}> Owner </button> &nbsp;
      <button onClick={ThisIsMine}> this is mine!</button>
      <h1> {walletAddress}</h1>
    </>
  );
}

export default Storage;
