import {
  Avatar,
  Box,
  Divider,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react';
import { usePrivy } from '@privy-io/react-auth';
import {
  CachedMessageWithId,
  DecodedMessage,
  toCachedMessage,
  useMessages,
  useSendMessage,
  useStreamMessages,
} from '@xmtp/react-sdk';
import { useCallback, useContext, useEffect, useState } from 'react';
import {
  FaArrowLeft,
  FaArrowUp,
  FaBan,
  FaBars,
  FaCamera,
  FaEthereum,
  FaLocationArrow,
  FaSignature,
} from 'react-icons/fa';
import { base } from 'viem/chains';
import { AppContext } from '../../context/AppContext';
import Loading from '../Loading';
import MessageItem from '../MessageItem';

const ChatModal = ({
  conversation,
  isOpen,
  onClose,
}: {
  conversation: any;
  isOpen: boolean;
  onClose: any;
}) => {
  const { user } = useContext(AppContext);
  const toast = useToast();
  const { signMessage, sendTransaction } = usePrivy();
  const [message, setMessage] = useState<string>('');
  const { messages } = useMessages(conversation);
  const [history, setHistory] = useState<CachedMessageWithId[]>([]);
  const { sendMessage } = useSendMessage();

  useEffect(() => {
    if (messages && messages.length > 0) {
      setHistory(messages);
    }
  }, [messages]);

  const onMessage = useCallback(
    (message: DecodedMessage) => {
      setHistory((prevMessages) => {
        const msgsnew = [
          ...prevMessages,
          toCachedMessage(message, user!.address) as CachedMessageWithId,
        ];
        return msgsnew;
      });
    },
    [user!.address],
  );

  useStreamMessages(conversation, { onMessage });

  const signMessageAction = async () => {
    if (message.length === 0) return;

    const signMessageConfig = {
      title: 'Signed Message',
      buttonText: 'Sign and Send',
    };

    const signature = await signMessage(message, signMessageConfig);

    send(`Message: ${message}, Signature: ${signature}`);
  };

  const sendTransactionAction = async () => {
    const amount: number = parseFloat(message);

    if (isNaN(amount)) {
      toast({
        title: 'Invalid amount',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const sendTxConfig = {
      title: 'Ethereum TX',
      buttonText: `Sign and Send ${amount} ETH`,
    };

    const parsedAmount = BigInt(amount * 1e18);

    const unsignedTx = {
      to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      chainId: base.id,
      value: parsedAmount,
    };

    const txReceipt = await sendTransaction(unsignedTx, sendTxConfig);

    send(`Just send ${amount} ETH, tx: ${txReceipt}`);
  };

  const send = async (msg: string) => {
    await sendMessage(conversation, msg);
    setMessage('');
  };

  if (!user) return <Loading />;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Box>
            <Box p={3}>
              <HStack justify="space-between">
                <IconButton
                  aria-label="menu"
                  variant="ghost"
                  icon={<FaArrowLeft />}
                  onClick={onClose}
                />
                <Avatar />
                <VStack spacing={0.5}>
                  <Text fontSize="md">Jane Doe</Text>
                  <Text fontSize="xs" color="gray.500">
                    1km away
                  </Text>
                </VStack>
                <IconButton
                  icon={<FaBan />}
                  aria-label="Block"
                  variant="ghost"
                />
              </HStack>
            </Box>
            <Divider />
          </Box>
        </ModalHeader>
        <ModalBody>
          <VStack flex="1" overflowY="auto">
            {history.map((message) => (
              <MessageItem
                key={message.xmtpID}
                conversation={conversation}
                message={message}
                user={user}
              />
            ))}
            <Divider mb={100} />
          </VStack>
          <VStack p={5} position="fixed" bottom="0" bg="white" align="stretch">
            <Divider />
            <HStack>
              <Input
                placeholder="Type a message..."
                onChange={(e) => setMessage(e.target.value.trim())}
              />
              <IconButton
                icon={<FaArrowUp />}
                aria-label="Send"
                onClick={async () => send(message)}
              />
              <Menu>
                <MenuButton as={IconButton} icon={<FaBars />}>
                  Actions
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<FaCamera />}>Photo</MenuItem>
                  <MenuItem icon={<FaLocationArrow />}>Location</MenuItem>
                  <MenuItem
                    icon={<FaSignature />}
                    aria-label="Send signed message"
                    onClick={signMessageAction}
                  >
                    Send signed message
                  </MenuItem>
                  <MenuItem
                    icon={<FaEthereum />}
                    aria-label="Send ethers"
                    onClick={sendTransactionAction}
                  >
                    Send ethers
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ChatModal;
