import { Box, HStack, Image, Text, useDisclosure } from '@chakra-ui/react';
import ProfileModal from './modals/ProfileModal';

const UserThumb = ({ user }: { user: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const oneHourAgo = Date.now() - 60 * 60 * 1000; // 60 minutes * 60 seconds * 1000 milliseconds

  return (
    <>
      <ProfileModal isOpen={isOpen} onClose={onClose} />
      <Box
        maxW="sm"
        borderRadius="lg"
        overflow="hidden"
        position="relative"
        onClick={onOpen}
      >
        <Image
          src={user.avatar}
          alt="cover image"
          objectFit="cover"
          width="100%"
          height="100%"
        />
        <Box position="absolute" bottom="0" width="100%" p={1}>
          <HStack justify="left">
            {user.lastOnline && user.lastOnline < oneHourAgo && (
              <Box
                width="10px"
                height="10px"
                bg="green.500"
                borderRadius="50%"
              />
            )}
            <Text
              color="white"
              textAlign="left"
              fontWeight="bold"
              fontSize="sm"
            >
              {user.name}
            </Text>
          </HStack>
        </Box>
      </Box>
    </>
  );
};

export default UserThumb;
