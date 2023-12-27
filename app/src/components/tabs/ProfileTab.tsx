import {
  Avatar,
  Box,
  Text,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  Select,
  InputGroup,
  InputLeftAddon,
  Icon,
  Stack,
  VStack,
  Card,
  CardBody,
  CardHeader,
  Heading,
  EditableTextarea,
  Divider,
  Input,
  InputRightElement,
  IconButton,
  Image,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPlus,
  FaRing,
  FaTextHeight,
  FaTrash,
  FaTrashAlt,
  FaTwitter,
  FaVenusMars,
  FaWeight,
} from 'react-icons/fa';
import { AppContext } from '../../context/AppContext';
import { getAge, getBaseUrl, truncateEthereumAddress } from '../../helpers';
import Loading from '../Loading';
import { User } from '../../types';

const ProfileTab = () => {
  const { user, saveUser } = useContext(AppContext);
  const [newSocial, setNewSocial] = useState<string>('');
  const [currentPicIndex, setCurrentPicIndex] = useState<number>(0);
  const [newImageUrl, setNewImageUrl] = useState<string>('');

  if (!user) return <Loading />;

  const updateUser = (key: keyof User, value: any) => {
    const updatedUser = { ...user, [key]: value };
    saveUser(updatedUser);
  };

  const updateNick = (e: any) => updateUser('nick', e.target.value.trim());
  const updateAbout = (e: any) => updateUser('about', e.target.value.trim());
  const updateHeight = (e: any) =>
    updateUser('height', parseInt(e.target.value));
  const updateWeight = (e: any) =>
    updateUser('weight', parseInt(e.target.value));
  const updateMaritalStatus = (e: any) =>
    updateUser('maritalStatus', e.target.value);
  const updateOrientation = (e: any) =>
    updateUser('orientation', e.target.value);

  const updateSocials = (e: any) => {
    setNewSocial(e.target.value);
  };

  const addSocial = () => {
    if (newSocial === '') return;
    if (!newSocial.includes('http')) return alert('Please enter a valid URL');
    if (
      !newSocial.includes('twitter') &&
      !newSocial.includes('instagram') &&
      !newSocial.includes('facebook') &&
      !newSocial.includes('linkedin')
    )
      return alert('Please enter a valid social media URL');

    const newSocialTrimmed = newSocial.trim();
    if (newSocialTrimmed === '') return; // Avoid adding empty strings

    const newBaseUrl = getBaseUrl(newSocialTrimmed);
    if (!newBaseUrl) return; // Invalid URL

    let updatedSocials = user.socials ? [...user.socials] : [];

    const existingIndex = updatedSocials.findIndex(
      (social) => getBaseUrl(social) === newBaseUrl,
    );
    if (existingIndex !== -1) {
      // Replace existing social link with the same base URL
      updatedSocials[existingIndex] = newSocialTrimmed;
    } else {
      // Add new social link
      updatedSocials.push(newSocialTrimmed);
    }

    updateUser('socials', updatedSocials);
    setNewSocial(''); // Clear the input field after adding
  };

  const removeSocial = (social: string) => {
    if (!user.socials || user.socials.length === 0) return;

    const updatedSocials = user.socials.filter((value, _) => value !== social);
    updateUser('socials', updatedSocials);
  };

  const nextPic = () => {
    if (!user.pics || user.pics.length === 0) return;
    console.log('length', user.pics[currentPicIndex]);
    setCurrentPicIndex((prevIndex) => (prevIndex + 1) % user.pics!.length);
  };

  const prevPic = () => {
    if (!user.pics || user.pics.length === 0) return;
    setCurrentPicIndex(
      (prevIndex) => (prevIndex - 1 + user.pics!.length) % user.pics!.length,
    );
  };

  const addImage = () => {
    const trimmedUrl = newImageUrl.trim();
    if (trimmedUrl === '') return; // Avoid adding empty strings

    let updatedPics = user.pics ? [...user.pics, trimmedUrl] : [trimmedUrl];
    updateUser('pics', updatedPics);
    setNewImageUrl(''); // Clear the input field after adding
  };

  const removeImage = () => {
    if (!user.pics || user.pics.length === 0) return;

    const updatedPics = user.pics.filter(
      (_, index) => index !== currentPicIndex,
    );
    updateUser('pics', updatedPics);
  };

  const updateImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewImageUrl(e.target.value);
  };

  return (
    <VStack align="stretch">
      <Card>
        <CardBody textAlign="center">
          <Avatar
            size={'xl'}
            src={user.pics ? user.pics[0] : ''}
            pos={'relative'}
          />
          <Editable defaultValue={user.nick} fontWeight={600} fontSize={'xl'}>
            <EditablePreview />
            <EditableInput type="text" min="3" max="30" onChange={updateNick} />
          </Editable>
          <Text fontWeight={400} color={'gray.500'}>
            {getAge(user.dob)} yo
          </Text>
          <Text fontWeight={200} color={'gray.500'}>
            {truncateEthereumAddress(user.address)}
          </Text>
        </CardBody>
      </Card>

      <Card position="relative" width="full">
        <CardHeader>
          <Heading size="md">About</Heading>
        </CardHeader>
        <CardBody fontSize={'xs'} fontWeight={200}>
          <Editable
            defaultValue={
              user.about || 'Here you can write a little about yourself'
            }
            fontWeight={600}
          >
            <EditablePreview />
            <EditableTextarea onChange={updateAbout} />
          </Editable>
        </CardBody>
      </Card>

      <Card position="relative" width="full">
        <CardHeader>
          <Heading size="md">Info</Heading>
        </CardHeader>
        <CardBody>
          <Stack>
            <InputGroup>
              <InputLeftAddon>
                <Icon as={FaTextHeight} />
              </InputLeftAddon>
              <Select
                borderRadius={0}
                value={user.height}
                onChange={updateHeight}
              >
                <option></option>
                {Array.from({ length: 171 }, (_, i) => i + 50).map((value) => (
                  <option key={value} value={value}>
                    {value} cm
                  </option>
                ))}
              </Select>
            </InputGroup>

            <InputGroup>
              <InputLeftAddon>
                <Icon as={FaWeight} />
              </InputLeftAddon>
              <Select
                borderRadius={0}
                value={user.weight}
                onChange={updateWeight}
              >
                <option></option>
                {Array.from({ length: 151 }, (_, i) => i + 50).map((value) => (
                  <option key={value} value={value}>
                    {value} kg
                  </option>
                ))}
              </Select>
            </InputGroup>

            <InputGroup>
              <InputLeftAddon>
                <Icon as={FaRing} />
              </InputLeftAddon>
              <Select
                borderRadius={0}
                value={user.maritalStatus}
                onChange={updateMaritalStatus}
              >
                <option></option>
                <option value="single">Single</option>
                <option value="couple">Couple</option>
                <option value="open-relationship">Open Relationship</option>
              </Select>
            </InputGroup>

            <InputGroup>
              <InputLeftAddon>
                <Icon as={FaVenusMars} />
              </InputLeftAddon>
              <Select
                borderRadius={0}
                value={user.orientation}
                onChange={updateOrientation}
              >
                <option></option>
                <option value="straight">Straight</option>
                <option value="gay">Gay</option>
                <option value="bisex">Bisex</option>
              </Select>
            </InputGroup>
          </Stack>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Heading size="md">Socials</Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={4} align="center">
            {!user.socials || user.socials.length === 0 ? (
              <Text>Don't be shy, add some links!</Text>
            ) : (
              <>
                {user.socials.map((social: string, index: number) => (
                  <HStack key={index} justify="space-between">
                    {social.includes('twitter') && (
                      <HStack>
                        <Icon as={FaTwitter} />
                        <Text as="a" href={social}>
                          X (ex Twitter)
                        </Text>
                      </HStack>
                    )}

                    {social.includes('instagram') && (
                      <HStack>
                        <Icon as={FaInstagram} />
                        <Text as="a" href={social}>
                          Instagram
                        </Text>
                      </HStack>
                    )}

                    {social.includes('facebook') && (
                      <HStack>
                        <Icon as={FaFacebook} />
                        <Text as="a" href={social}>
                          Facebook
                        </Text>
                      </HStack>
                    )}

                    {social.includes('linkedin') && (
                      <HStack>
                        <Icon as={FaLinkedin} />
                        <Text as="a" href={social}>
                          LinkedIn
                        </Text>
                      </HStack>
                    )}

                    <IconButton
                      variant="ghost"
                      aria-label="Delete"
                      icon={<FaTrashAlt />}
                      onClick={() => removeSocial(social)}
                    />
                  </HStack>
                ))}
              </>
            )}
            <InputGroup>
              <Input
                pr="4.5rem"
                type="url"
                placeholder="paste your social links here"
                onChange={updateSocials}
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  aria-label="Add"
                  icon={<FaPlus />}
                  h="1.75rem"
                  size="sm"
                  onClick={addSocial}
                >
                  Add
                </IconButton>
              </InputRightElement>
            </InputGroup>
          </Stack>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Heading size="md">Pics</Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={4} align="center">
            {!user.pics || user.pics.length === 0 ? (
              <Text>Don't be shy, upload some pics!</Text>
            ) : (
              <Box position="relative">
                <HStack>
                  <IconButton
                    aria-label="Previous"
                    icon={<FaArrowLeft />}
                    onClick={prevPic}
                  />
                  <Box boxSize="200px">
                    <Image
                      src={user.pics[currentPicIndex]}
                      alt={`User Pic ${currentPicIndex + 1}`}
                      boxSize="full"
                      objectFit="cover"
                    />
                  </Box>
                  <IconButton
                    aria-label="Next"
                    icon={<FaArrowRight />}
                    onClick={nextPic}
                  />
                </HStack>
                <IconButton
                  aria-label="Delete"
                  icon={<FaTrash />}
                  onClick={() => removeImage()}
                  variant="ghost"
                  colorScheme="red"
                />
              </Box>
            )}
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                value={newImageUrl}
                onChange={updateImageUrl}
                placeholder="Paste your image URL here"
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  aria-label="Add"
                  icon={<FaPlus />}
                  h="1.75rem"
                  size="sm"
                  onClick={addImage}
                />
              </InputRightElement>
            </InputGroup>
          </Stack>
        </CardBody>
      </Card>

      <Divider mb={10} />
    </VStack>
  );
};

export default ProfileTab;
