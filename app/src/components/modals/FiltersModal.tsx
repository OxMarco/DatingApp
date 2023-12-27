import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Heading,
  VStack,
  Text,
  HStack,
  IconButton,
  Switch,
  Select,
  Stack,
  Card,
  CardBody,
  CardHeader,
} from '@chakra-ui/react';
import { FaArrowLeft, FaQuestionCircle } from 'react-icons/fa';

const FiltersModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: any;
}) => {
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
            <Heading size="md">Filters</Heading>
            <IconButton
              icon={<FaQuestionCircle />}
              variant="ghost"
              aria-label="Help"
            />
          </HStack>
        </ModalHeader>
        <ModalBody>
          <VStack align="stretch">
            <Card>
              <CardHeader>
                <Heading size="sm">Show only</Heading>
              </CardHeader>
              <CardBody>
                <Stack>
                  <HStack>
                    <Text>Online now</Text>
                    <Switch />
                  </HStack>
                  <HStack>
                    <Text>Age</Text>
                    <Select></Select>
                    <Text>-</Text>
                    <Select></Select>
                  </HStack>
                  <HStack>
                    <Text>Sex</Text>
                    <Select></Select>
                  </HStack>
                  <HStack>
                    <Text>Distance</Text>
                    <Select></Select>
                  </HStack>
                </Stack>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <Heading size="sm">Hide from</Heading>
              </CardHeader>
              <CardBody>
                <Stack>
                  <HStack>
                    <Text>Over age range</Text>
                    <Switch />
                  </HStack>
                  <HStack>
                    <Text>Over distance range</Text>
                    <Switch />
                  </HStack>
                </Stack>
              </CardBody>
            </Card>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FiltersModal;
