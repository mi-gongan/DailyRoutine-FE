import {
  WalletConnection,
  keyStores,
  connect,
  ConnectedWalletAccount,
} from 'near-api-js';
import React, { useEffect } from 'react';

function useNear() {
  const [walletConnection, setWalletConnection] =
    React.useState<WalletConnection>(null);
  const [account, setAccount] = React.useState<ConnectedWalletAccount>(null);
  const [accountId, setAccountId] = React.useState('');
  const [balance, setBalance] = React.useState('');
  useEffect(() => {
    if (window !== undefined) {
      const main = async () => {
        const connectionConfig = {
          networkId: 'testnet',
          keyStore: new keyStores.BrowserLocalStorageKeyStore(),
          nodeUrl: 'https://rpc.testnet.near.org',
          walletUrl: 'https://wallet.testnet.near.org',
          helperUrl: 'https://helper.testnet.near.org',
          explorerUrl: 'https://explorer.testnet.near.org',
        };

        const nearConnection = await connect(connectionConfig);

        const walletConnection = new WalletConnection(
          nearConnection,
          'daily_routine',
        );

        setWalletConnection(walletConnection);
      };
      main();
    }
  }, []);

  useEffect(() => {
    if (!walletConnection) return;
    if (!walletConnection.isSignedIn()) return;
    setAccountId(walletConnection.getAccountId());
    setAccount(walletConnection.account());
    walletConnection
      .account()
      .getAccountBalance()
      .then((res) => {
        setBalance(res.available);
      });
  }, [walletConnection]);

  return { balance, accountId, account, walletConnection };
}

export default useNear;
