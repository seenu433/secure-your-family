import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

import Tab from '@mui/material/Tab';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SavingsIcon from '@mui/icons-material/Savings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PersonPinIcon from "@mui/icons-material/PersonPin";
import ErrorIcon from "@mui/icons-material/Error";

import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AssessmentIcon from '@mui/icons-material/Assessment';

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

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PublishIcon from '@mui/icons-material/Publish';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const theme = createTheme({
    palette: {
        secondary: {
            main: orange[500],
        },
    },
});

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(firstName, lastName) {
    return {
        sx: {
            bgcolor: stringToColor(firstName),
        },
        children: `${firstName[0]}${lastName[0]}`,
    };
}

function App() {

    const [value, setValue] = React.useState('1');

    const [comments, setComments] = React.useState([]);
    const [comment, setComment] = React.useState({
        firstName: {
            value: '',
            error: false,
            errorMessage: 'First name is required'
        },
        lastName: {
            value: '',
            error: false,
            errorMessage: 'Last name is required'
        },
        title: {
            value: '',
            error: false,
            errorMessage: 'Title is required'
        },
        text: {
            value: '',
            error: false,
            errorMessage: 'Comment is required'
        }
    });

    const handleTextChange = (prop) => (event) => {
        if (prop === 'firstName') {
            setComment({ ...comment, firstName: { ...comment.firstName, value: event.target.value } });
        } else if (prop === 'lastName') {
            setComment({ ...comment, lastName: { ...comment.lastName, value: event.target.value } });
        } else if (prop === 'title') {
            setComment({ ...comment, title: { ...comment.title, value: event.target.value } });
        }
        else {
            setComment({ ...comment, text: { ...comment.text, value: event.target.value } });
        }
    };

    function handleSubmitComment() {
        //return ((str || '').match(/[^\w\\.@-]/g) || []).length

        var isValid = true;
        if (comment.firstName.value === '' || comment.lastName.value === '' || comment.title.value === '' || comment.text.value === '') {
            setComment({ ...comment, firstName: { ...comment.firstName, error: comment.firstName.value === '' }, lastName: { ...comment.lastName, error: comment.lastName.value === '' }, title: { ...comment.title, error: comment.title.value === '' }, text: { ...comment.text, error: comment.text.value === '' } });
            isValid = false;
        }

        if (isValid) {

            var validComment = {
                firstName: comment.firstName.value,
                lastName: comment.lastName.value,
                title: comment.title.value,
                text: comment.text.value
            }

            // Send data to the backend via POST
            fetch('/api/comments', {  // Enter your IP address here

                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(validComment)
            });

            handleSubmitCommentClose();
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openSubmitCommentDialog, setOpenSubmitCommentDialog] = React.useState(
        false
    );

    const handleSubmitCommentOpen = () => {
        handleClose();
        setOpenSubmitCommentDialog(true);
    };

    const handleSubmitCommentClose = () => {

        comment.firstName = {
            value: '',
            error: false,
            errorMessage: ''
        };
        comment.lastName = {
            value: '',
            error: false,
            errorMessage: ''
        };
        comment.title = {
            value: '',
            error: false,
            errorMessage: ''
        };
        comment.text = {
            value: '',
            error: false,
            errorMessage: ''
        };

        setOpenSubmitCommentDialog(false);
    };

    const [openViewCommentDialog, setOpenViewCommentDialog] = React.useState(
        false
    );

    const handleViewCommentOpen = () => {

        fetch('/api/comments', {
            method: 'GET',
            mode: 'cors'
        }).then(response => {
            return response.json();
        }).then(text => {
            setComments(text);
        });

        setOpenViewCommentDialog(true);
    };

    const handleViewCommentClose = () => {
        setComments([]);
        setOpenViewCommentDialog(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (openViewCommentDialog) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openViewCommentDialog]);

    const actions = [
        {
            icon: <PublishIcon />,
            name: "Submit",
            onClick: handleSubmitCommentOpen
        },
        {
            icon: <RemoveRedEyeIcon />,
            name: "View",
            onClick: handleViewCommentOpen
        }
    ];

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
                                        <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/">
                                            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />Home
                                        </Link>
                                        <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/">
                                            <AssessmentIcon sx={{ mr: 0.5 }} fontSize="inherit" />Assess
                                        </Link>
                                        <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/">
                                            <InfoIcon sx={{ mr: 0.5 }} fontSize="inherit" />About
                                        </Link>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>

                            </Typography>
                            <Divider />
                            <Typography gutterBottom>
                                Managing finances after death is an important part of life. It is never an easy decision to sit down and think about your own death. But planning for it is something that could help you get to terms with your own mortality and help your family after you are gone. Investing for death benefit is a way to ensure that your loved ones are financially secure after you pass away. There are few important questions that you need to answer to make sure you do not add to your family grief over the loss of you.

                                <ul>
                                    <li>What is the amount of money they are going to get as a survivor benefit</li>
                                    <li>
                                        What are my liabilities that will eat into the survivor benefit
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
                                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                        <TabList
                                            onChange={handleChange}
                                            aria-label="lab API tabs example"
                                            variant="scrollable"
                                            scrollButtons
                                            allowScrollButtonsMobile
                                        >
                                            <Tab
                                                icon={<SavingsIcon />}
                                                label="BENEFITS (A)"
                                                value="1"
                                            />
                                            <Tab
                                                icon={<MonetizationOnIcon />}
                                                label="LIABILITIES (B)"
                                                value="2"
                                            />
                                            <Tab icon={<AccountBalanceIcon />} label="TAX (C)" value="3" />
                                            <Tab icon={<PersonPinIcon />} label="LEGAL" value="4" />
                                            <Tab
                                                icon={<FactCheckIcon />}
                                                label="EXPENSES (D)"
                                                value="5"
                                            />
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
                                After evaluating the above options, the sum of <b>A</b> less <b>B</b> and <b>C</b> should be greater than <b>D</b> for your family to be comfortable in your absence.
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
                                    The content discussed above is for education only, This is not a comprehensive list and it completely depends on the individuals situation. You should always consult with a licensed financial advisor.
                                </Typography>
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
            <SpeedDial
                FabProps={{ variant: "extended" }}
                ariaLabel="SpeedDial tooltip example"
                sx={{ position: "fixed", bottom: 16, right: 16 }}
                icon={
                    <Box sx={{ display: "flex" }}>
                      <ChatBubbleOutlineIcon sx={{ mr: 0.5 }} />
                      <Typography>Comments</Typography>
                    </Box>
                  }
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={action.onClick}
                    />
                ))}
            </SpeedDial>
            <Dialog open={openSubmitCommentDialog} onClose={handleSubmitCommentClose}>
                <DialogTitle>Submit Comment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please share your comments/suggestion to improve the content.
                    </DialogContentText>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="firstname"
                                label="First Name"
                                type="email"
                                fullWidth
                                variant="standard"
                                onChange={handleTextChange("firstName")}
                                inputProps={{ maxLength: 25 }}
                                required={true}
                                error={comment.firstName.error}
                                helperText={comment.firstName.error && comment.firstName.errorMessage}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="lastname"
                                label="Last Name"
                                type="email"
                                fullWidth
                                variant="standard"
                                onChange={handleTextChange("lastName")}
                                inputProps={{ maxLength: 25 }}
                                required={true}
                                error={comment.lastName.error}
                                helperText={comment.lastName.error && comment.lastName.errorMessage}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="title"
                                label="Title"
                                type="email"
                                fullWidth
                                variant="standard"
                                onChange={handleTextChange("title")}
                                inputProps={{ maxLength: 50 }}
                                required={true}
                                error={comment.title.error}
                                helperText={comment.title.error && comment.title.errorMessage}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="comment"
                                fullWidth
                                margin="dense"
                                label="Comment"
                                multiline
                                rows={4}
                                variant="standard"
                                onChange={handleTextChange("text")}
                                inputProps={{ maxLength: 500 }}
                                required={true}
                                error={comment.text.error}
                                helperText={comment.text.error && comment.text.errorMessage}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmitCommentClose}>Cancel</Button>
                    <Button onClick={handleSubmitComment}>Submit</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openViewCommentDialog}
                onClose={handleViewCommentClose}
                scroll="paper"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Comments</DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>

                            {comments.map((commentItem) => (
                                <div>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar  {...stringAvatar(commentItem.firstName, commentItem.lastName)} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={commentItem.title}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {commentItem.firstName} {commentItem.lastName}
                                                    </Typography> - {commentItem.text}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </div>
                            ))}
                        </List>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleViewCommentClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider >
    );

}

export default App;