import { getGasPrice, getGasFee } from "./index";

export const plus  = async (instance, web3, address, a, b) => {

  const prices = await getGasPrice();

  // Get gas limit
  const gasLimit = await instance.methods
    .plus(a, b)
    .estimateGas({ from: address });

  return await instance.methods
    .plus(a, b)
    .send({
      from: address,
      gasPrice: web3.utils.toWei(prices.medium.toString(), "gwei"),
      gas: getGasFee(gasLimit),
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const minus = async (instance, web3, address, a, b) => {

  const prices = await getGasPrice();

  // Get gas limit
  const gasLimit = await instance.methods
    .minus(a, b)
    .estimateGas({ from: address });

  return await instance.methods
    .minus(a, b)
    .send({
      from: address,
      gasPrice: web3.utils.toWei(prices.medium.toString(), "gwei"),
      gas: getGasFee(gasLimit),
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getLatestSum = async (instance) => {
  return await instance.methods
    .latestSumValue()
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
}

export const getLatestSubstract = async (instance) => {
  return await instance.methods
    .latestSubstractValue()
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
}
