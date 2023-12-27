import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Image,
  Box,
  Heading,
  VStack,
  Text,
  HStack,
  Icon,
  IconButton,
  ButtonGroup,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { useStartConversation, useCanMessage } from '@xmtp/react-sdk';
import {
  FaBan,
  FaLocationArrow,
  FaCommentAlt,
  FaWeight,
  FaVenusMars,
  FaRing,
  FaRegStar,
  FaArrowLeft,
} from 'react-icons/fa';

const ProfileModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: any;
}) => {
  const { startConversation } = useStartConversation();
  const { canMessage } = useCanMessage();

  const user = '0x937C0d4a6294cdfa575de17382c7076b579DC176';

  const talk = async () => {
    if (await canMessage(user)) {
      await startConversation(
        user,
        JSON.stringify({ msg: '', type: 'initial' }),
      );
    }
  };

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
          <HStack justify="space-between">
            <IconButton
              variant="ghost"
              aria-label="Close"
              icon={<FaArrowLeft />}
              onClick={onClose}
            />
            <ButtonGroup variant="ghost">
              <IconButton aria-label="Block" icon={<FaBan />} />
              <IconButton aria-label="Like" icon={<FaRegStar />} />
            </ButtonGroup>
          </HStack>
        </ModalHeader>
        <ModalBody>
          <VStack align="stretch">
            <Box position="relative" width="full">
              <Image
                src="https://picsum.photos/500/500"
                borderRadius="lg"
                width="full"
              />
              <Box position="absolute" bottom="0" width="full">
                <VStack p={4} align="start">
                  <HStack>
                    <Heading size="xl" fontWeight="bold" color="white">
                      Jane Doe
                    </Heading>
                    <Heading size="md" color="white">
                      24
                    </Heading>
                  </HStack>
                  <HStack>
                    <Text color="white">Online 16 min ago</Text>
                    <HStack>
                      <Icon as={FaLocationArrow} color="white" />
                      <Text color="white">1km away</Text>
                    </HStack>
                  </HStack>
                </VStack>
              </Box>
            </Box>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Box p={4}>
                <Heading size="md">About</Heading>
                <Text mt={2}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
              </Box>
            </Box>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Box p={4}>
                <List>
                  <ListItem>
                    <HStack>
                      <ListIcon as={FaWeight} color="green.500" />
                      <Text>85kg x 185cm</Text>
                    </HStack>
                  </ListItem>
                  <ListItem>
                    <HStack>
                      <ListIcon as={FaRing} color="green.500" />
                      <Text>Single</Text>
                    </HStack>
                  </ListItem>
                  <ListItem>
                    <HStack>
                      <ListIcon as={FaVenusMars} color="green.500" />
                      <Text>Straight</Text>
                    </HStack>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </VStack>
          <IconButton
            isRound={true}
            variant="solid"
            fontSize="20px"
            size="lg"
            aria-label="Chat"
            icon={<FaCommentAlt />}
            position="fixed"
            bottom={4}
            right={4}
            onClick={talk}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
