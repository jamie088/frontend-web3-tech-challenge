import PLUS_ABI from './abis/plus_abi.json';
import MINUS_ABI from './abis/minus_abi.json';

const PLUS_CONTRACT_ADDRESS = '0x3E9d3731f41Cc616a09828b6864FcB1Ee116b1fe';
const MINUS_CONTRACT_ADDRESS = '0x10A082679A90E693f181332a999030713463faD4';

export const contractPlus = (web3) => {
  const address = PLUS_CONTRACT_ADDRESS;
  const abi = PLUS_ABI;
  const instance = new web3.eth.Contract(abi, address);

  return {
    address,
    abi,
    instance,
  };
};

export const contractMinus = (web3) => {
  const address = MINUS_CONTRACT_ADDRESS;
  const abi = MINUS_ABI;
  const instance = new web3.eth.Contract(abi, address);

  return {
    address,
    abi,
    instance,
  };
};
