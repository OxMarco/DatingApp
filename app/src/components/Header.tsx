import {
  HStack,
  Avatar,
  Box,
  Button,
  IconButton,
  Divider,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { FaBars } from 'react-icons/fa';
import FiltersModal from './modals/FiltersModal';
import { AppContext } from '../context/AppContext';
import Loading from './Loading';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, removeUser } = useContext(AppContext);

  if (!user) return <Loading />;

  return (
    <>
      <FiltersModal isOpen={isOpen} onClose={onClose} />
      <Box p={5}>
        <Box mb={5}>
          <HStack justify="space-between">
            <Avatar src={user.pics ? user.pics[0] : ''} />
            <Button variant="outline" onClick={onOpen}>
              Filters
            </Button>
            <Menu>
              <MenuButton as={IconButton} icon={<FaBars />}>
                Actions
              </MenuButton>
              <MenuList>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Help</MenuItem>
                <MenuItem>Website</MenuItem>
                <MenuDivider />
                <MenuItem onClick={removeUser}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Box>
        <Divider />
      </Box>
    </>
  );
};

export default Header;
