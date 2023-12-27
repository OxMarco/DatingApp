import { Box, Divider, Stack } from '@chakra-ui/react';
import { useConversations } from '@xmtp/react-sdk';
import Loading from '../Loading';
import ConversationItem from '../ConversationItem';

const ChatTab = () => {
  const { conversations, isLoading } = useConversations();

  if (isLoading) return <Loading />;

  return (
    <Stack>
      {conversations.map((conversation: any) => (
        <Box key={conversation.id}>
          <ConversationItem conversation={conversation} />
          <Divider />
        </Box>
      ))}
    </Stack>
  );
};

export default ChatTab;
