import { Box, Spinner, Stack } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      w="full"
      h="full"
      zIndex="9999"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack>
        <Spinner size="xl" />
      </Stack>
    </Box>
  );
};

export default Loading;
