import { useEffect, useState } from "react";
import {
  Button,
  Break,
  Input,
  CenterDiv,
  Withdraw,
  Total,
  Balance,
} from "./index-styled";
import etherWalletContract from "../../truffle/build/contracts/EtherWallet.json";
// import EtherWalletFactory from "../../truffle/build/contracts/EtherWalletFactory.json";

const EtherWallet = ({ web3, nId, account }) => {
  const [walletBalance, setWalletBalance] = useState();
  const [walletOwner, setwalletOwner] = useState();
  const [walletAddress, setWalletAddress] = useState();
  const [ethValue, setEthValue] = useState(0);

  let Contract = new web3.eth.Contract(
    etherWalletContract.abi,
    etherWalletContract.networks[nId]?.address
  );
  // let GameContract = new web3.eth.Contract(
  //   EtherWalletFactory.abi,
  //   EtherWalletFactory.networks[nId]?.address
  // );

  useEffect(() => {
    const loadData = async () => {
      setWalletAddress(etherWalletContract.networks[nId]?.address);
      if (walletAddress) {
        const temp2 = await Contract.methods.balanceOf().call();
        const temp3 = await Contract.methods.owner().call();
        setWalletBalance(web3.utils.fromWei(temp2), "ether");
        setwalletOwner(temp3);
      }
    };
    loadData();
  }, [
    walletAddress,
    walletOwner,
    walletBalance,
    Contract.methods,
    nId,
    web3,
    account,
  ]);

  const handleInvest = async (event) => {
    event.preventDefault();
    console.log("Amount Invested: " + ethValue);
    var weiValue = web3.utils.toWei(String(ethValue), "ether");
    await Contract.methods.invest().send({ from: account, value: weiValue });
    // Contract.methods.invest({value: ethValue})
  };

  const getInvestments = async () => {
    let investment = await Contract.methods
      .getInvestments()
      .call({ from: account });
    alert(
      "ETH invested by account: " +
        web3.utils.fromWei(String(investment), "ether")
    );
  };

  const getWithdraw = async () => {
    await Contract.methods.withdraw().send({ from: account });
    alert("Succesfully withdraw! [INSERT FLAG HERE]");
  };

  const getBalance = async () => {
    return walletBalance;
  };

  // const playGame = async () => {
  //   let gameAddress = await GameContract.methods.createInstance(account).call();
  //   console.log(gameAddress);
  // };

  return (
    <>
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
        <CenterDiv>
          <form onSubmit={handleInvest}>
            <Input
              type="number"
              placeholder="Amount in ETH"
              value={ethValue}
              onChange={(e) => setEthValue(e.target.value)}
              step="any"
            />
            <Button type="submit"> Invest?</Button>
            {/* <Button onClick={playGame} disabled>Start the Game</Button> */}
          </form>
          <Break />
          <Total onClick={getInvestments}>Investments</Total>&nbsp;
          <Withdraw onClick={getWithdraw}>Withdraw</Withdraw>
          &nbsp;
          <Balance onClick={getBalance}>Balance</Balance>
          &nbsp;
        </CenterDiv>

        <form></form>
      </div>
    </>
  );
};

export default EtherWallet;
