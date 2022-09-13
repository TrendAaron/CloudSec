import { useEffect, useState } from "react";
import PasswordContract from "../../truffle/build/contracts/Password.json";

const Password = ({ web3, nId, account }) => {
  let Contract = new web3.eth.Contract(
    PasswordContract.abi,
    PasswordContract.networks[nId]?.address
  );
  const [contractAddress, setContractAddress] = useState();
  const [contractOwner, setContractOwner] = useState();
  const [locked, setLocked] = useState();
  const [balance, setBalance] = useState();
  const [hashCode, setHashCode] = useState("");
  const init = async () => {
    setContractAddress(await Contract._address);
    if (contractAddress) {
      setContractOwner(await Contract.methods.owner().call());
      setLocked(await Contract.methods.locked().call());
      setBalance(await Contract.methods.balanceOf().call());
    }
  };
  useEffect(() => {
    init();
  });

  const handleCodeUnlock = async (event) => {
    event.preventDefault();
    let code = web3.utils.asciiToHex(hashCode);
    // console.log(web3.utils.hexToAscii(hashCode));
    await Contract.methods.unlock(hashCode).send({ from: account });
    let result = await Contract.methods.locked().call();
    console.log(result);
  };

  const handleCodeInput = () => {};
  const isLocked = () => {
    alert("Lock Status: " + locked);
  };
  const withdraw = () => {};
  const balanceOf = () => {
    alert(balance);
  };

  const checkOwner = () => {
    alert(contractOwner);
  };

  const fallBack = () => {
    // let txparam = {
    //     to:
    //     from: account,
    //     value:"",
    // }
  };

  return (
    <>
      <form>
        <input
          type="text"
          required
          value={hashCode}
          onChange={(e) => setHashCode(e.target.value)}
        />
        <button onClick={handleCodeUnlock}>Unlock</button>
      </form>
      <button onClick={checkOwner}>Owner</button>
      <button onClick={isLocked}>locked</button>
      {/* <form></form> */}
      <button onClick={fallBack}>transact</button>
      <button onClick={balanceOf}>balance</button>
    </>
  );
};

export default Password;
