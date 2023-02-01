import { UseWalletProvider } from "use-wallet";

import Main from './containers/Main';
import { NETWORK } from './contracts';

import './App.css';

const App = () => {
  return (
    <UseWalletProvider chainId={NETWORK.RINKEBY}>
      <Main />
    </UseWalletProvider>
  );
}

export default App;
