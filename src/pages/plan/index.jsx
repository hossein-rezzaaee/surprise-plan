import { Box, Button, SwipeableDrawer, Typography } from '@mui/material';
import { CenteredBox } from '../../components/CenteredBox';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PLANS } from './plans';

const createRandom = (arr) => {
  const pervs = localStorage.getItem('perv-plans');
  let random;
  try {
    if (
      pervs &&
      pervs !== 'undefined' &&
      pervs !== 'null' &&
      JSON.parse(pervs)
    ) {
      const pervsArr = JSON.parse(pervs);
      const newPlans = arr.filter((item) => {
        return !pervsArr.includes(item.id);
      });
      random = newPlans[Math.floor(Math.random() * newPlans.length)];
      pervsArr.push(random.id);
      localStorage.setItem('perv-plans', JSON.stringify(pervsArr));
    } else {
      random = arr[Math.floor(Math.random() * arr.length)];
      localStorage.setItem('perv-plans', JSON.stringify([random.id]));
    }

    return random;
  } catch (error) {
    console.log('error', error);
  }
};

export const Plan = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(false);
  const [random, setRandom] = useState('');

  const handleClose = () => {
    setOpen(false);
    setRandom('');
    setStart(false);
  };
  const handleOpen = () => {
    setOpen(true);
    setStart(true);
  };

  useEffect(() => {
    let timeOut;
    if (start) {
      timeOut = setTimeout(() => {
        setStart(false);
        setRandom(createRandom(PLANS));
      }, 10000);
    }

    return () => {
      if (timeOut) {
        clearTimeout(timeOut);
      }
    };
  }, [start]);

  const isValid = state?.isValid;
  useEffect(() => {
    if (!isValid) {
      navigate('/');
    }
  }, [navigate, isValid]);

  return (
    isValid && (
      <CenteredBox py={8}>
        <SwipeableDrawer
          anchor={'bottom'}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          PaperProps={{ sx: { bgcolor: 'transparent' } }}
        >
          <Box
            sx={{ height: '90vh' }}
            bgcolor="#777"
            borderRadius={'10px 10px 0 0'}
            p={2}
            pt={10}
          >
            {start && (
              <Box display="flex" alignItems="center" justifyContent="center">
                {['💫', '💥', '💖', '😈'].map((item) => (
                  <Typography
                    key={item}
                    variant="h1"
                    width={50}
                    fontSize={40}
                    className="spinner"
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            )}
            {random && (
              <Box>
                <Typography
                  dir="rtl"
                  color="#fff"
                  textAlign="center"
                  variant="h3"
                >
                  {random.text}
                </Typography>
                <CenteredBox mt={5}>
                  <Button
                    size="large"
                    fullWidth
                    color="secondary"
                    variant="contained"
                    onClick={handleClose}
                  >
                    {'ok :)'}
                  </Button>
                </CenteredBox>
              </Box>
            )}
          </Box>
        </SwipeableDrawer>
        <Box>
          <Typography textAlign="center" variant="h4">
            we have some surprise plans !!!
            <br />
            🎁🌟🔥
          </Typography>
          <br />

          <Typography textAlign="center" variant="h5">
            are you want a random one?
          </Typography>
          <br />

          <Typography textAlign="center" variant="h6">
            click on &quot;start&quot; button
          </Typography>
          <Button
            size="large"
            variant="outlined"
            fullWidth
            sx={{ color: 'orange', borderColor: 'orange !important', mt: 3 }}
            onClick={handleOpen}
          >
            START
          </Button>
        </Box>
      </CenteredBox>
    )
  );
};
