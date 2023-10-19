import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CenteredBox } from '../../components/CenteredBox';

export const Home = () => {
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (clickCount >= 12) {
      navigate('/password', { state: { isValid: true } });
    }
  }, [clickCount, navigate]);

  return (
    <CenteredBox fullHeight>
      <Typography textAlign="center" variant="h4">
        ... it&apos;s a simple surprise project ...
        <br />
        <br />
        <Typography
          component="span"
          fontSize={60}
          onClick={() => setClickCount((p) => ++p)}
        >
          💋
        </Typography>
      </Typography>
    </CenteredBox>
  );
};
