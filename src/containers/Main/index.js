import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { getWeb3, Functions, Instances } from '../../contracts';

import { useWallet } from "use-wallet";

const Main = () => {
  const { account, connect } = useWallet();

  const [sum, setSum] = useState(0);
  const [substract, setSubstract] = useState(0);

  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const [plusLoading, setPlusLoading] = useState(false);
  const [minusLoading, setMinusLoading] = useState(false);

  useEffect(() => {
    const getValues = async () => {
      const web3 = await getWeb3();

      const plusContract = Instances.contractPlus(web3);
      const minusContract = Instances.contractMinus(web3);

      const _sum = await Functions.getLatestSum(plusContract.instance);
      const _substract = await Functions.getLatestSubstract(minusContract.instance);

      setSum(_sum);
      setSubstract(_substract);
    }

    getValues();
  }, [account]);

  const handlePlus = async () => {

    if (isNaN(a)) {
      console.log('<A> should be a number');
      return;
    }

    if (isNaN(b)) {
      console.log('<B> should be a number');
      return;
    }

    if (plusLoading) {
      return;
    }

    if (!account) {
      return;
    }

    setPlusLoading(true);

    const web3 = await getWeb3();
    const plusContract = Instances.contractPlus(web3);

    await Functions.plus(plusContract.instance, web3, account, a, b);

    const _sum = await Functions.getLatestSum(plusContract.instance);

    setSum(_sum);

    setPlusLoading(false);
  }

  const handleMinus = async () => {
    if (isNaN(a)) {
      console.log('<A> should be a number');
      return;
    }

    if (isNaN(b)) {
      console.log('<B> should be a number');
      return;
    }

    if (Number(a) < Number(b)) {
      console.log('<A> should greater than <B>');
      return;
    }

    if (minusLoading) {
      return;
    }

    if (!account) {
      return;
    }

    setMinusLoading(true);

    const web3 = await getWeb3();
    const minusContract = Instances.contractMinus(web3);

    await Functions.minus(minusContract.instance, web3, account, a, b);

    const _substract = await Functions.getLatestSubstract(minusContract.instance);

    setSubstract(_substract);

    setMinusLoading(false);
  }


  return (
    <>
      <Box m={3} display='flex' justifyContent='flex-end'>
        {!account && <Button variant="contained" size='large' color='primary' onClick={(e) => connect()}>Connect Wallet</Button>}
      </Box>
      {account && (
        <div className='form-container'>
          <div className='form-container__operation'>
            <TextField
              className='input'
              margin="dense"
              label="A"
              type="text"
              variant="outlined"
              value={a}
              onChange={(e) => setA(e.target.value)}
            />
            <TextField
              className='input'
              margin="dense"
              label="B"
              type="text"
              variant="outlined"
              value={b}
              onChange={(e) => setB(e.target.value)}
            />
            <Button
              className='button'
              onClick={(e) => {
                handlePlus();
              }}
              color="primary"
              variant="contained"
              disabled={plusLoading}
            >
              {plusLoading ? 'Waiting...' : 'Plus'}
            </Button>
            <Button
              className='button'
              onClick={(e) => {
                handleMinus();
              }}
              color="secondary"
              variant="contained"
              disabled={minusLoading}
            >
              {minusLoading ? 'Waiting...' : 'Minus'}
            </Button>
          </div>
          <hr/>
          <div className='form-container__result'>
            <span>Sum: {sum} </span>
          </div>
          <div className='form-container__result'>
           <span>Substract: {substract}</span>
          </div>
        </div>
      )}
    </>
  )
}

export default Main;
