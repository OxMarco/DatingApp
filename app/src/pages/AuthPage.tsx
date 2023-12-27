import {
  Divider,
  Heading,
  Stack,
  Text,
  Button,
  VStack,
  useToast,
  Input,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useLogin, usePrivy, useWallets } from '@privy-io/react-auth';
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { dateStringToTimestamp, isOver18, now } from '../helpers';
import Loading from '../components/Loading';
import { User } from '../types';

const AuthPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { saveUser, removeUser } = useContext(AppContext);
  const [nick, setNick] = useState<string>('');
  const [nickError, setNickError] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [dobError, setDobError] = useState<string>('');
  const [orientation, setOrientation] = useState<string>('');
  const [orientationError, setOrientationError] = useState<string>('');
  const { wallets } = useWallets();
  const { ready } = usePrivy();
  const { login } = useLogin({
    onComplete: (user, isNewUser: boolean) => {
      user;
      if (isNewUser) {
        console.log('new user');
        signUp();
        navigate('/');
      } else {
        console.log('already authenticated');
        navigate('/home');
      }
    },
    onError: (error) => {
      toast({
        title: 'Login failed',
        description: error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      removeUser();
    },
  });

  const invalidInputs = () => {
    if (!nick || !dob || !orientation) return true;
    if (nick.length < 3 || nick.length > 30) return true;
    if (!isOver18(dateStringToTimestamp(dob))) return true;

    return false;
  };

  const changeNick = (e: any) => {
    const newNick = e.target.value.trim();
    setNick(newNick);
    if (newNick.length < 3 || newNick.length > 30)
      setNickError('Nickname must be between 3 and 30 characters');
    else setNickError('');
  };

  const changeDob = (e: any) => {
    const newDob = e.target.value.trim();
    setDob(newDob);
    if (newDob && !isOver18(dateStringToTimestamp(newDob)))
      setDobError('You must be over 18 years old');
    else setDobError('');
  };

  const changeOrientation = (e: any) => {
    const newOrientation = e.target.value;
    setOrientation(newOrientation);
    if (!newOrientation) setOrientationError('Orientation is required');
    else setOrientationError('');
  };

  const signUp = () => {
    const embeddedWallet = wallets.find(
      (wallet) => wallet.walletClientType === 'privy',
    );
    if (!embeddedWallet) {
      alert('No embedded wallet found');
      toast({
        title: 'Login failed',
        description: 'No wallet found',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });

      return false;
    }

    const newUser: User = {
      nick,
      dob: dateStringToTimestamp(dob),
      orientation,
      address: embeddedWallet.address,
      lastOnline: now(),
    };
    saveUser(newUser);

    alert('Signed up successfully');

    toast({
      title: 'Login successful',
      description: 'You are now logged in',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    return true;
  };

  if (!ready) return <Loading />;

  return (
    <Stack>
      <Heading alignSelf="center" p={5} mt={5}>
        Welcome
      </Heading>
      <Divider />

      <VStack flex="1" align="stretch" p={4}>
        <Text>
          Sign in with your wallet or create a new one using social login
        </Text>

        <FormControl isInvalid={nickError.length > 0}>
          <FormLabel>Nickname</FormLabel>
          <Input
            type="string"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            autoComplete="off"
            value={nick}
            min="3"
            max="30"
            onChange={changeNick}
          />
          <FormErrorMessage>{nickError}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={dobError.length > 0}>
          <FormLabel>Date of Birth</FormLabel>
          <Input type="date" value={dob} onChange={changeDob} />
          <FormErrorMessage>{dobError}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={orientationError.length > 0}>
          <FormLabel>Sexual Orientation</FormLabel>
          <Select
            placeholder="Orientation"
            value={orientation}
            onChange={changeOrientation}
          >
            <option value="straight">Straight</option>
            <option value="gay">Gay</option>
            <option value="bisex">Bisex</option>
          </Select>
          <FormErrorMessage>{orientationError}</FormErrorMessage>
        </FormControl>

        <Button isDisabled={invalidInputs()} colorScheme="blue" onClick={login}>
          Enter now
        </Button>
      </VStack>
    </Stack>
  );
};

export default AuthPage;

/*
        <Tabs isFitted flexDirection="column" height="100%">
          <TabList>
            <Tab>Login</Tab>
            <Tab>Register</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Stack>
                <Stack>
                  <InputGroup>
                    <Input placeholder="email" type="email" />
                  </InputGroup>
                  <InputGroup>
                    <Input placeholder="password" />
                  </InputGroup>
                  <Button colorScheme="blue">Sign in with Google</Button>
                </Stack>
                <HStack>
                  <Divider />
                  <Text textStyle="md" fontWeight="medium" whiteSpace="nowrap">
                    or
                  </Text>
                  <Divider />
                </HStack>
                <Button colorScheme="blue" variant="outline" onClick={login}>
                  Sign in with Google
                </Button>
                <Button colorScheme="blue" variant="outline">
                  Sign in with Google
                </Button>
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack>
                <Stack>
                  <InputGroup>
                    <Input placeholder="email" type="email" />
                  </InputGroup>
                  <InputGroup>
                    <Input
                      type={show ? 'text' : 'password'}
                      placeholder="password"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <InputGroup>
                    <Input placeholder="confirm password" type="password" />
                  </InputGroup>
                  <InputGroup>
                    <Input placeholder="23/10/2003" type="date" />
                  </InputGroup>
                  <Button colorScheme="blue">Sign in with Google</Button>
                </Stack>
                <HStack>
                  <Divider />
                  <Text textStyle="md" fontWeight="medium" whiteSpace="nowrap">
                    or
                  </Text>
                  <Divider />
                </HStack>
                <Button colorScheme="blue" variant="outline">
                  Sign up with Google
                </Button>
                <Button colorScheme="blue" variant="outline">
                  Sign up with Facebook
                </Button>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Layout>
  );
};
*/
