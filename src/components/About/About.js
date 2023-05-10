import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

export default function About() {
    return (
        <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>

            </Typography>
            <Divider />
            <Grid container spacing={4} mt={2}>
                <Grid item xs={6} md={4}>
                    <Card className='clear'>
                        <CardMedia
                            sx={{ height: 280 }}
                            image="/author.png"
                        />
                    </Card>
                </Grid>
                <Grid item xs={6} md={8}>
                    <Typography variant='h6' gutterBottom>About the creator</Typography>
                    <Typography variant='body1' gutterBottom>
                        Hi! I am Srini Padala, a highly motivated individual with extensive experience in the field of information technology.
                        Throughout my professional journey, I worked with various technologies and gained expertise in areas such as software development, cloud computing, and project management.
                        In addition to my professional accomplishments, I am an avid learner and keep myself updated with the latest developments in the field. I am a strong believer in lifelong learning and constantly seeks opportunities to expand my knowledge and skills.
                    </Typography>
                    <Box mt={5}>
                        <Link href="https://www.linkedin.com/in/srinivasa-padala/" underline="always">
                            <GitHubIcon sx={{ mr: 2 }} fontSize="large" />
                        </Link>
                        <Link href="https://github.com/seenu433" underline="always">
                            <LinkedInIcon sx={{ mr: 2 }} fontSize="large" />
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6' gutterBottom>My Hosted Projects</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Solar Payback Calculator
                            </Typography>
                            <Typography variant="h5" component="div">

                            </Typography>

                            <Typography variant="body2">
                                The objective of this effort is to understand the economic aspects of going residential solar and the time it may take before my investment start paying for itself.
                            </Typography>
                        </CardContent>
                        <CardActions>
                        <Link href='https://kind-coast-02c5bcd0f.3.azurestaticapps.net/' size="small">Learn More</Link>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Secure Your Family
                            </Typography>
                            <Typography variant="h5" component="div">

                            </Typography>
                            <Typography variant="body2">
                                The objective of this effort is to curate a checklist of instruments / instructions to financially secure your family in your eternal absence.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link href='https://secureyourfamily.srinipadala.live/' size="small">Learn More</Link>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    );
}