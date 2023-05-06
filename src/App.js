import * as React from 'react';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import { green, orange } from '@mui/material/colors';

import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import ErrorIcon from '@mui/icons-material/PersonPin';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const theme = createTheme({
    palette: {
      secondary: {
        main: orange[500],
      },
    },
  });

function App() {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
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
  
    return (
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
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
            <Grid
            container
            sx={{ mt: 3 }}
          >
             <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                
              </Typography>
              <Divider />
              <Typography gutterBottom>
                Managing finances after death is an important part of life. It is never an easy decision to sit down and think about your own death. But planning for it is something that could help you get to terms with your own mortality and help your family after you are gone. Investing for death benefit is a way to ensure that your loved ones are financially secure after you pass away. There are few important questions that you need to answer to make sure you do not add to your family grief over the loss of you.
  
                <ul>
                  <li>What is the amount of money they are going to get as a survivor benefit</li>
                  <li>
                  What are the my liabilities that will eat into the survivor benefit
                  </li>
                  <li>
                  How is the survivor benefit taxed so that you know what exactly will be left with
                  </li>
                  <li>
                  How easy or hard is to access the survivor benefit
                  </li>
                  <li>
                  How much do they need to live comfortably in your absence
                  </li>
                </ul>
                Below are some of the detail that will aid in answering/preparing for each of the questions
              </Typography>
              <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab icon={<PhoneIcon />} label="BENEFITS (A)" value="1" />
        <Tab icon={<FavoriteIcon />} label="LIABILITIES (B)"  value="2" />
        <Tab icon={<PersonPinIcon />} label="TAX (C)" value="3" />
        <Tab icon={<PersonPinIcon />} label="LEGAL" value="4" />
        <Tab icon={<PersonPinIcon />} label="EXPENSES (D)" value="5" />
            </TabList>
          </Box>
          <TabPanel value="1">
            This section lists various instruments that may be applicable as Survivor benefits
            <ul>
              <li>Life Insurance</li>
              <li>Social Security</li>
              <li>401K</li>
              <li>IRA</li>
              <li>Savings Accounts</li>
              <li>Brokerage accounts</li>
              <li>HSA accounts</li>
              <li>FSA accounts</li>
              <li>Real Estate</li>
              <li>AD&D</li>
              <li>Term insurance</li>
              <li>Mortgage Protection</li>
            </ul>
            Each of the instrument has a death benefit which will be transferred to the survivor(s)
          </TabPanel>
          <TabPanel value="2">
            This section list various liabilities that you can leave behind which your survivor has to deal with or that will have to be paid from the money you left behind:
            <ul>
              <li>Home mortgage</li>
              <li>Car Loans</li>
              <li>Credit Card Bills</li>
              <li>Personal Loans</li>
              <li>Home Insurance</li>
              <li>Car Insurance</li>
              <li>Funeral expenses</li>
            </ul>
            It is important to consider insurance on your high valued liabilities and make plans to reduce the other to as low as possible. 
          </TabPanel>
          <TabPanel value="3">
            It is important to understand the tax implication to the survivor on the passed assets. Understand which assets may attract tax and discount them appropriately.
            <ul>
              <li>Annuities will attract tax</li>
              <li>Death benefits from life insurance policies are not subject to ordinary income tax. </li>
            </ul>
  
          </TabPanel>
          <TabPanel value="4">
          While you have planned meticulously to financially secure your family, it is also important to explore ways to makes sure those benefits can be easily inherited or accessed by your survivor(s)
          <ul>
              <li><i>Living Trust :</i> You can place practically any asset you own in a revocable living trust, whether it consists of bank accounts, real estate, etc. This method allows you to avoid probate and transfer assets directly to your beneficiaries</li>
              <li><i>Joint ownership:</i> You can make property jointly owned with someone else. This method allows the property to pass directly to the surviving owner without going through probate2Add nominees in all accounts</li>
              <li><i>Payable-on-death (POD) or transfer-on-death (TOD) beneficiaries:</i> Adding POD or TOD beneficiaries to your account is the easiest way to ensure your heirs have easy access to your account after passing. This method is also the easiest way to pass your bank account on to your heirs after your passing</li>
            </ul> 
          </TabPanel>
          <TabPanel value="5">
            Finally this is what is needed by your survivors to live comfortably for the rest of their life
            <ul>
              <li>Housing</li>
              <li>Transportation</li>
              <li>Utilities</li>
              <li>Survivor Life insurance</li>
              <li>Healthcare</li>
              <li>Education</li>
              <li>Recreation</li>
            </ul> 
          </TabPanel>
        </TabContext>
      </Box>
      <Box>
        After evaluating the above options the sum of <b>A</b> less <b>B</b> and <b>C</b> should be greater than <b>D</b> for your family to be comfortable in your absence.
        </Box>
                <Box sx={{
                    marginTop: 5,
                    position: "relative",
                    p: { xs: 3 },
                    pr: { md: 0 },
                    background:
                      "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
                    color: "white"
                  }}>
                <Typography variant="h6" gutterBottom>
                  <ErrorIcon /> Disclaimer
                </Typography>
                <Typography>
                  The content discussed above is for education only, This is not a comprehensive list and it completely depends on the individuals situation. You should always consult with a licensed financial advisor.              </Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
              
            </Grid>
            </Grid>          
            </main>
            </Container>
  
          <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
          <Container maxWidth="lg">
            <Copyright />
          </Container>
        </Box>
        </ThemeProvider>
    );

}

export default App;