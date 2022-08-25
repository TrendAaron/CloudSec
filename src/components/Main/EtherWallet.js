import { useEffect, useState } from "react";
import EtherWallet from "../../truffle/build/contracts/EtherWallet.json";

const Main = ({ web3, nId }) => {
  const [walletBalance, setWalletBalance] = useState();
  const [walletOwner, setwalletOwner] = useState();
  const [walletAddress, setWalletAddress] = useState();
  const [contract, setContract] = useState();
  const loadData = async () => {
    setWalletAddress(EtherWallet.networks[nId]?.address);
    if (walletAddress) {
      const Contract = new web3.eth.Contract(EtherWallet.abi, walletAddress);
      const temp2 = await Contract.methods.balanceOf().call();
      const temp3 = await Contract.methods.owner().call();
      console.log("1", temp3);
      setWalletBalance(web3.utils.fromWei(temp2), "ether");
      setwalletOwner(temp3);
    }
  };

  const handleClick = () => {
    console.log("sheesh");
  };

  useEffect(() => {
    loadData();
  });

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
      {/* <form action="" >
                    <input type="number" placeholder="Plez" />
                    <button onClick={handleClick}> getInstance?</button>
                </form> */}
      <input type="number" placeholder="Amount in wei" />
      &nbsp;
      <button> Invest</button>
    </div>
  );
};

export default Main;
