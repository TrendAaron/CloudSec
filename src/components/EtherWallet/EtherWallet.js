import { useEffect, useState } from "react";
import {
  Button,
  Break,
  Input,
  CenterDiv,
  Withdraw,
  Total,
  Balance,
  InstanceB,
  CodeDiv,
} from "./index-styled";
import etherWalletContract from "../../truffle/build/contracts/EtherWallet.json";
import EtherWalletFactory from "../../truffle/build/contracts/EtherWalletFactory.json";

const EtherWallet = ({ web3, nId, account }) => {
  const [walletBalance, setWalletBalance] = useState();
  const [walletOwner, setwalletOwner] = useState();
  const [walletAddress, setWalletAddress] = useState();
  const [ethValue, setEthValue] = useState(0);
  const [instantiated, setInstantiated] = useState(false);

  let Contract = new web3.eth.Contract(
    etherWalletContract.abi,
    etherWalletContract.networks[nId]?.address
  );
  let GameContract = new web3.eth.Contract(
    EtherWalletFactory.abi,
    EtherWalletFactory.networks[nId]?.address
  );

  const createInstance = async () => {
    try {
      await GameContract.methods
        .createInstance(account)
        .send({ from: account, value: 1 });
      setwalletOwner(await Contract.methods.owner().call());
      setWalletAddress(await etherWalletContract.networks[nId]?.address);
      setWalletBalance(await Contract.methods.balanceOf().call());
      setInstantiated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getInvestments = async () => {
    try {
      let investment = await Contract.methods
        .getInvestments()
        .call({ from: account });
      alert(
        "ETH invested by accout: " +
          web3.utils.fromWei(String(investment), "ether")
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getWithdraw = async () => {
    await Contract.methods.withdraw().send({ from: account });
    alert("Succesfully withdraw! [INSERT FLAG HERE]");
  };

  const getBalance = async () => {
    let balance = await Contract.methods.balanceOf().call();
    alert(balance);
  };

  const validatePlayer = async () => {
    let validate = await GameContract.methods
      .validateInstance(walletAddress, account)
      .call();
    console.log(validate);
  };

  const handleInvest = async (event) => {
    event.preventDefault();
    console.log("Amount Invested: " + ethValue);
    var weiValue = web3.utils.toWei(String(ethValue), "ether");
    await Contract.methods.invest().send({ from: account, value: weiValue });
  };

 
  useEffect(() => {
    const data = localStorage.getItem("instance");
    if (data) {
      setInstantiated(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("instance", JSON.stringify(instantiated));
  }, [
    walletAddress,
    walletOwner,
    walletBalance,
    Contract.methods,
    nId,
    web3,
    account,
  ]);

  return (
    <>
      
      {/* <div className="mt-3"> */}
      <CenterDiv>

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
            <>
              <form onSubmit={handleInvest}>
                <Input
                  type="number"
                  placeholder="Amount in ETH"
                  value={ethValue}
                  onChange={(e) => setEthValue(e.target.value)}
                  step="any"
                />
                <Button type="submit"> Invest?</Button>
              </form>
              <Total onClick={getInvestments}>Investments</Total>&nbsp;
              <Balance onClick={getBalance}>Balance</Balance>&nbsp;
              <Withdraw onClick={getWithdraw}>Withdraw</Withdraw> &nbsp;
              <Button onClick={validatePlayer}>Validate</Button>
            </>
          {/* {instantiated ? (
           
          ) : (
            <InstanceB onClick={createInstance}>create Instance</InstanceB>
          )} */}
        </CenterDiv>

      {/* </div> */}
      
      <Break></Break>
    </>
  );
};

export default EtherWallet;
