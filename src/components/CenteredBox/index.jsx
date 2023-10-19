import { Box } from '@mui/material';

export const CenteredBox = ({ fullHeight, ...props }) => {
  return (
    <Box
      display="flex"
      p={3}
      alignItems="center"
      justifyContent="center"
      height={fullHeight ? '100vh' : undefined}
      {...props}
    />
  );
};
