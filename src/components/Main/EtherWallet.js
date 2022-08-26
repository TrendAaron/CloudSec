import { useEffect, useState } from "react";
import EtherWallet from "../../truffle/build/contracts/EtherWallet.json";
import EtherWalletFactory from "../../truffle/build/contracts/EtherWalletFactory.json"

const Main = ({ web3, nId, account }) => {
  const [walletBalance, setWalletBalance] = useState();
  const [walletOwner, setwalletOwner] = useState();
  const [walletAddress, setWalletAddress] = useState();
  const [ethValue, setEthValue] = useState(0); 
  const [contractOwner, setContractOwner] = useState()
  
  let Contract = new web3.eth.Contract(EtherWallet.abi, EtherWallet.networks[nId]?.address);
  let GameContract = new web3.eth.Contract(EtherWalletFactory.abi, EtherWalletFactory.networks[nId]?.address)
  
 

  useEffect(() => {

    const loadData = async () => {
      setWalletAddress(EtherWallet.networks[nId]?.address);
      if (walletAddress) {
        const temp2 = await Contract.methods.balanceOf().call();
        const temp3 = await Contract.methods.owner().call();
        setWalletBalance(web3.utils.fromWei(temp2), "ether");
        setwalletOwner(temp3);
      }
    };
  loadData();

  
  }, [walletAddress,walletOwner,walletBalance,nId,web3,account]);
  

  

   const handleInvest = async (event) => {
    event.preventDefault() 
    console.log("Amount Invested: " + ethValue)
    var weiValue = web3.utils.toWei(String(ethValue),'ether')
    await Contract.methods.invest().send({from:account,value:weiValue})
    // Contract.methods.invest({value: ethValue})
  }
  
  const getInvestments = async () => {
    let investment = await Contract.methods.getInvestments().call({from:account}) 
    console.log(investment)
  }

  
  const getWithdraw = async ( ) => {
    var weiValue = web3.utils.toWei(walletBalance,'ether')
      await Contract.methods.withdraw().send({from:account})
      console.log("withdraw success")
  }

  const getBalance = async ( ) => {
     let temp = await Contract.methods.balanceOf().call();
  }

  const playGame = async () => {
   let gameAddress = await  GameContract.methods.createInstance(account).call()
    console.log(gameAddress)
  }

  return (
    <div className="mt-3">
      <table className="table text-muted text-center">
        <tbody>
          <tr style={{ color: "black" }}>
            <th scope="col">Wallet Address</th>
            <th scope="col">Wallet Owner</th>
            <th scope="col">Wallet Balance</th>
          </tr>
        </tbody>
        <tbody>
          <tr style={{ color: "black" }}>
            <td>{walletAddress}</td>
            <td>{walletOwner} </td>
            <td>ETH - {walletBalance} </td>
          </tr>
        </tbody>
      </table>
      <form onSubmit={handleInvest}>
        <input 
        type="number" placeholder="Amount in ETH"  
        value={ethValue} onChange={(e) => setEthValue(e.target.value)} 
        step="any"/> 
        
        &nbsp; 
        <button type="submit"> Invest?</button> &nbsp;
        
              
        
        </form>
        <form>
          
        
        </form>
        <button onClick={getInvestments}> getInvestments  </button>&nbsp;
        <button onClick={getWithdraw}>Withdraw</button>&nbsp;
        <button onClick={getBalance} >GetBalance</button>&nbsp;
        <button onClick={playGame}>Start the Game</button>
      
    </div> 
  );
};

export default Main;
