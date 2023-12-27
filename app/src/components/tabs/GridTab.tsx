import { SimpleGrid } from '@chakra-ui/react';
import UserThumb from '../UserThumb';

const users = [
  {
    name: 'John Doe',
    avatar: 'https://picsum.photos/300/300',
    lastOnline: 1703251453567,
  },
  {
    name: 'Jane Doe',
    avatar: 'https://picsum.photos/300/300',
    lastOnline: 1703251451567,
  },
  {
    name: 'John Doe',
    avatar: 'https://picsum.photos/300/300',
    lastOnline: 1703251423567,
  },
  {
    name: 'Jane Doe',
    avatar: 'https://picsum.photos/300/300',
    lastOnline: 1703251403567,
  },
];
const GridTab = () => {
  return (
    <SimpleGrid columns={3} spacing={1}>
      {users.map((user, index) => (
        <UserThumb key={index} user={user} />
      ))}
    </SimpleGrid>
  );
};

export default GridTab;
