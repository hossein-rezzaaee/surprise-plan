import { Box, Button, Checkbox, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PLANS } from '../plan/plans';

const allPlans = () => {
  const pervs = localStorage.getItem('perv-plans');
  try {
    if (
      pervs &&
      pervs !== 'undefined' &&
      pervs !== 'null' &&
      JSON.parse(pervs)
    ) {
      const pervsArr = JSON.parse(pervs);
      return PLANS.map((item) => {
        return { ...item, checked: pervsArr.includes(item.id) };
      });
    } else {
      return PLANS.map((item) => {
        return { ...item, checked: false };
      });
    }
  } catch (error) {
    console.log('error', error);
  }
};

export const PlansList = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [hide, setHide] = useState(true);
  const isValid = state?.isValid;
  useEffect(() => {
    if (!isValid) {
      navigate('/');
    }
  }, [navigate, isValid]);

  return (
    isValid && (
      <Box dir="rtl">
        <Box position="sticky" zIndex={99} top={0} bgcolor="#fff" p={3}>
          <Button
            variant="contained"
            color="warning"
            fullWidth
            onClick={() => setHide((p) => !p)}
          >
            {hide ? 'show' : 'hide'}
          </Button>
        </Box>
        <Box mt={3} p={3}>
          {allPlans().map((plan) => (
            <Box display="flex" alignItems="center" key={plan.id} mb={2}>
              <Checkbox checked={plan.checked} color="success" size="large" />
              &nbsp; &nbsp; &nbsp;
              <Typography variant="h5" color="white">
                {hide && !plan.checked
                  ? 'you can not see this item 🥴'
                  : plan.text}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box bgcolor="#fff" p={3}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={() => {
              localStorage.clear();
              navigate('/');
            }}
          >
            clear local storage
          </Button>
        </Box>
      </Box>
    )
  );
};
