import { useEffect, useState } from "react";
import storageContract from "../../truffle/build/contracts/Storage.json";
import { Button } from "./index-styled";
// import mineContract from "../../truffle/build/contracts/Mine.json";

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
      // setMineAddress(mineContract.networks[nId]?.address);
      if (walletAddress) {
        const temp2 = await Storage.methods.balanceOf().call();
        const temp3 = await Storage.methods.owner().call();
        setWalletBalance(web3.utils.fromWei(temp2), "ether");
        setWalletOwner(temp3);
      }
    };
    loadData();
  }, [
    walletAddress,
    walletOwner,
    walletBalance,
    Storage.methods,
    web3,
    nId,
    account,
  ]);

  const getBalance = async () => {
    let bal = await Storage.methods.balanceOf().call();
    alert(bal);
  };

  const getOwner = () => {
    alert("The wallet Owner now is: " + walletOwner);
  };

  const getWithdraw = async () => {
    await Storage.methods.withdraw().send({ from: account });
  };

  const ThisIsMine = async () => {
    /*
    User needs to be able to call 
    this function to call the fallback function
    */
    let txparam = {
      to: walletAddress,
      from: account,
      value: "0x0000",
    };
    await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [txparam],
    });
  };
  return (
    <>
      <Button onClick={getWithdraw}> Withdraw</Button> &nbsp;
      <Button onClick={getBalance}> balanceOf</Button> &nbsp;
      <Button onClick={getOwner}> Owner </Button> &nbsp;
      <Button onClick={ThisIsMine}> this is mine!</Button>
    </>
  );
}

export default Storage;
