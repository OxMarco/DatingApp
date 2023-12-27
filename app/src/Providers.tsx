import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import { base } from 'viem/chains';
import {
  XMTPProvider,
  attachmentContentTypeConfig,
  reactionContentTypeConfig,
} from '@xmtp/react-sdk';
import { AppProvider } from './context/AppContext';

export const Providers = ({ children }: { children: ReactNode }) => {
  const contentTypeConfigs = [
    attachmentContentTypeConfig,
    reactionContentTypeConfig,
  ];

  return (
    <ChakraProvider>
      <PrivyProvider
        appId={'clmvewkd2004kla0fgddnc6jj'}
        config={{
          appearance: {
            showWalletLoginFirst: true,
          },
          loginMethods: ['wallet', 'email', 'google', 'twitter'],
          embeddedWallets: {
            createOnLogin: 'all-users',
          },
          defaultChain: base,
          supportedChains: [base],
        }}
      >
        <XMTPProvider contentTypeConfigs={contentTypeConfigs}>
          <AppProvider>{children}</AppProvider>
        </XMTPProvider>
      </PrivyProvider>
    </ChakraProvider>
  );
};
