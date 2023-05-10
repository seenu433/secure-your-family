import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AssessmentIcon from '@mui/icons-material/Assessment';

export default function Navigation() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Typography align="left" variant="subtitle2">
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'right',
                        typography: 'body1',
                        '& > :not(style) + :not(style)': {
                            ml: 2,
                        },
                    }}
                >
                    <Link href="/" underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit">
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />Home
                    </Link>
                    <Link href="/assess" underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit">
                        <AssessmentIcon sx={{ mr: 0.5 }} fontSize="inherit" />Assess
                    </Link>
                    <Link href="/about" underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit">
                        <InfoIcon sx={{ mr: 0.5 }} fontSize="inherit" />About
                    </Link>
                </Box>
            </Grid>
        </Grid>
    );
}