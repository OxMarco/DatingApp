import { usePrivy, useWallets } from '@privy-io/react-auth';
import { createContext, useEffect, useState } from 'react';
import { Client, useClient } from '@xmtp/react-sdk';
import { User } from '../types';

export const AppContext = createContext<{
  user: User | null;
  saveUser: (user: User) => void;
  removeUser: () => void;
  signer: any;
  saveSigner: () => Promise<void>;
}>({
  user: null,
  saveUser: () => {},
  removeUser: () => {},
  signer: null,
  saveSigner: async () => {},
});

export interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [signer, setSigner] = useState<any>(null); // Set to null initially
  const { logout } = usePrivy();
  const { wallets } = useWallets();
  const { initialize } = useClient();

  const saveUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const removeUser = () => {
    localStorage.removeItem('keys');
    localStorage.removeItem('user');
    setUser(null);
    setSigner(null);
    logout();
  };

  const saveSigner = async () => {
    try {
      const embeddedWallet = wallets.find(
        (wallet) => wallet.walletClientType === 'privy',
      );
      if (!embeddedWallet) return;

      const provider = await embeddedWallet.getEthersProvider();
      setSigner(provider.getSigner());
    } catch (error) {
      console.error('Error in saveSigner:', error);
    }
  };

  const initXMTP = async () => {
    try {
      let keys = localStorage.getItem('keys');
      let keyArray: Uint8Array;
      if (!keys) {
        keyArray = await Client.getKeys(signer, {
          skipContactPublishing: true,
          persistConversations: true,
        });
        const keyArrayString = JSON.stringify(Array.from(keyArray));
        localStorage.setItem('keys', keyArrayString);
      } else {
        keyArray = new Uint8Array(JSON.parse(keys));
      }

      const options = {
        persistConversations: true,
        env: 'dev' as any,
      };
      await initialize({ keys: keyArray, options, signer });
    } catch (error) {
      console.error('Error in initXMTP:', error);
    }
  };

  useEffect(() => {
    const init = async () => {
      if (!user) return;

      if (signer) {
        await initXMTP();
      } else {
        await saveSigner();
      }
    };

    init().catch((error) => console.error('Initialization error:', error));
  }, [signer, wallets]);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{ user, saveUser, removeUser, signer, saveSigner }}
    >
      {children}
    </AppContext.Provider>
  );
};
