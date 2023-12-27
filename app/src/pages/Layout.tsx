import { Box } from '@chakra-ui/react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box mt={5} mb={5}>
      {children}
    </Box>
  );
};

export default Layout;
