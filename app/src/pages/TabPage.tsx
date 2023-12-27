import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Icon,
  Box,
  Divider,
  Stack,
} from '@chakra-ui/react';
import GridTab from '../components/tabs/GridTab';
import ChatTab from '../components/tabs/ChatTab';
import Header from '../components/Header';
import { FaComment, FaUserAlt, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import ProfileTab from '../components/tabs/ProfileTab';
import Loading from '../components/Loading';
import { useEffect } from 'react';
//import IPFS from 'ipfs-core'
//import { createOrbitDB } from '@orbitdb/core'

const TabPage = () => {
  const navigate = useNavigate();
  const { ready, authenticated } = usePrivy();

  useEffect(() => {
    if (ready && !authenticated) {
      navigate('/auth');
    }
  }, [ready, authenticated]);

  useEffect(() => {
    let locationInterval: ReturnType<typeof setInterval> | null = null;
  
    const sendLocation = (latitude: number, longitude: number) => {
      console.log('Sending location: ', latitude, longitude);
    };
  
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            sendLocation(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.error('Error getting location: ', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };
  
    if (ready && authenticated) {
      locationInterval = setInterval(getLocation, 60000); // every 60 seconds
    }
  
    return () => {
      if (locationInterval !== null) {
        clearInterval(locationInterval);
      }
    };
  }, [ready, authenticated]);

  useEffect(() => {
    const init = async () => {
      //const ipfs = await IPFS.create()
      //const orbitdb = await createOrbitDB({ ipfs })
    }

    init()
  }, [])

  if (!ready) return <Loading />;

  return (
    <Tabs
      isFitted
      variant="soft-rounded"
      flex="1"
      flexDirection="column"
      height="100%"
    >
      <TabPanels flex="1" overflowY="auto">
        <TabPanel>
          <Stack>
            <Header />
            <GridTab />
          </Stack>
        </TabPanel>
        <TabPanel>
          <Header />
          <ChatTab />
        </TabPanel>
        <TabPanel>
          <ProfileTab />
        </TabPanel>
      </TabPanels>
      <Box position="fixed" bottom="0" w="full" left="0">
        <Divider />
        <TabList p={5} bg="white">
          <Tab>
            <Icon as={FaUsers} />
          </Tab>
          <Tab>
            <Icon as={FaComment} />
          </Tab>
          <Tab>
            <Icon as={FaUserAlt} />
          </Tab>
        </TabList>
      </Box>
    </Tabs>
  );
};

export default TabPage;
