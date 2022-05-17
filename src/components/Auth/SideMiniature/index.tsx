import React from 'react';

import Grid from '@mui/material/Grid';
import backImg from '../../../images/img.png';

const SideMiniature: React.FC = () => {
  return (
    <Grid
      item
      xs={false}
      sm={4}
      md={7}
      sx={{
        backgroundImage: `url(${backImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  );
};

export default SideMiniature;
