import {
  HStack,
  Avatar,
  Stack,
  Text,
  AvatarBadge,
  useDisclosure,
  Box,
} from '@chakra-ui/react';
import ChatModal from './modals/ChatModal';
import { useLastMessage } from '@xmtp/react-sdk';
import TimeAgo from 'react-timeago';
import { truncateEthereumAddress } from '../helpers';

const ConversationItem = ({ conversation }: { conversation: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const lastMessage = useLastMessage(conversation.topic);

  return (
    <>
      <ChatModal
        conversation={conversation}
        isOpen={isOpen}
        onClose={onClose}
      />
      <HStack
        align="flex-start"
        gap="3"
        px="4"
        py="3"
        _hover={{ bg: 'bg.muted' }}
        rounded="md"
        onClick={onOpen}
      >
        <Box pt="1">
          <Avatar size="sm" src="">
            <AvatarBadge />
          </Avatar>
        </Box>
        <Stack spacing="0" fontSize="sm" flex="1" isTruncated>
          <HStack spacing="1">
            <Text fontWeight="medium" flex="1">
              {truncateEthereumAddress(conversation.peerAddress)}
            </Text>
            {lastMessage && (
              <Text fontSize="xs" alignSelf="flex-start">
                <TimeAgo
                  date={lastMessage.sentAt}
                  component={Text}
                  minPeriod={60}
                />
              </Text>
            )}
          </HStack>
          <Box color="fg.subtle" isTruncated>
            {lastMessage?.content}
          </Box>
        </Stack>
      </HStack>
    </>
  );
};

export default ConversationItem;
