import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function Header() {
    return (
        <Paper
            sx={{
                position: "relative",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center"
            }}
        >
            <Grid container>
                <Grid item>
                    <Box
                        sx={{
                            position: "relative",
                            p: { xs: 3 },
                            pr: { md: 0 },
                            background:
                                "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                            color: "white"
                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h3"
                            color="inherit"
                            gutterBottom
                        >
                            How secure is my family?
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            The objective of this effort is to curate a checklist of instruments / instructions to financially secure your family in your eternal absence.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}
