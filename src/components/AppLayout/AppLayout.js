import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Comments from '../Comments/Comments';

import Home from '../Home/Home';
import About from '../About/About';
import Assess from '../Assess/Assess';

import { Route, Routes } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

const theme = createTheme({
    palette: {
        secondary: {
            main: orange[500],
        },
    },
});

export default function AppLayout(props) {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <main>
                    <Header />
                    <Grid container sx={{ mt: 3 }}>
                        <Grid item xs={12}>
                            <Navigation />
                        </Grid>
                        <Grid item xs={12}>
                            <Routes>
                            <Route  path="/" element={<Home/>} />
                            <Route  path="/assess" element={<Assess />} />
                            <Route  path="/about" element={<About />} />
                            </Routes>
                        </Grid>
                    </Grid>
                </main>
            </Container>
            <Footer />
            <Comments />
        </ThemeProvider >
    );
}