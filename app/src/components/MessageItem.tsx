import { Box, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { useReactions, useSendMessage } from '@xmtp/react-sdk';
import { ContentTypeReaction, Reaction } from '@xmtp/content-type-reaction';
import TimeAgo from 'react-timeago';
import { User } from '../types';
import Loading from './Loading';

const MessageItem = ({
  conversation,
  message,
  user,
}: {
  conversation: any;
  message: any;
  user: User;
}) => {
  const reactions = useReactions(message);
  const messageBgColorYou = useColorModeValue('blue.100', 'blue.700');
  const messageBgColorOther = useColorModeValue('gray.100', 'gray.700');

  const { sendMessage } = useSendMessage();

  const handleClick = (emoji: string, messageId: string) => {
    console.log('messageId', messageId);
    void sendMessage<Reaction>(
      conversation,
      {
        content: emoji,
        schema: 'unicode',
        reference: messageId,
        action: 'added',
      },
      ContentTypeReaction,
    );
  };

  if (!message) return <Loading />;

  return (
    <Box
      onClick={() => handleClick('smile', message.xmtpID)}
      key={message.id}
      alignSelf={
        message.senderAddress === user.address ? 'flex-end' : 'flex-start'
      }
      bgColor={
        message.senderAddress === user.address
          ? messageBgColorYou
          : messageBgColorOther
      }
      borderRadius="lg"
      maxW="90%"
      p={3}
    >
      <Text>{message.content}</Text>
      <HStack>
        <Text fontSize="xs" alignSelf="flex-start">
          <TimeAgo date={message.sentAt} component={Text} minPeriod={60} />
        </Text>
        {reactions.length > 0 && <Box>Hi</Box>}
      </HStack>
    </Box>
  );
};

export default MessageItem;
