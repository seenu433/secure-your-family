import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="#">
                Secure Your Family
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}
export default function Footer() {
    return (
        <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
            <Container maxWidth="lg">
                <Copyright />
            </Container>
        </Box>
    );
}
