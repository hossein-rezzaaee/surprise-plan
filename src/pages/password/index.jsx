import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CenteredBox } from '../../components/CenteredBox';
import { Box, Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';

export const Password = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (password === '26/5/1402') {
      navigate('/plan', { state: { isValid: true } });
    } else if (password === '4504%hossein') {
      navigate('/plans-list', { state: { isValid: true } });
    } else {
      toast.error('fuck you !!! 😡');
      setPassword('');
    }
  };

  const isValid = state?.isValid;
  useEffect(() => {
    if (!isValid) {
      navigate('/');
    }
  }, [navigate, isValid]);

  return (
    isValid && (
      <CenteredBox fullHeight>
        <Box
          p={5}
          display="flex"
          flexDirection="column"
          bgcolor="#aeaeae"
          borderRadius={4}
        >
          <TextField
            type="password"
            label="enter password 😈"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <Button sx={{ mt: 2 }} onClick={handleSubmit} variant="outlined">
            submit
          </Button>
        </Box>
      </CenteredBox>
    )
  );
};
