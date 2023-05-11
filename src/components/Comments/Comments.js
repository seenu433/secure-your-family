import React from 'react';
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
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';

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

export default function Comments() {
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

    const [openViewCommentDialog, setOpenViewCommentDialog] = React.useState(false);
    const [loadingComments, setLoadingComments] = React.useState(false);

    const handleViewCommentOpen = () => {
        setLoadingComments(true);
        fetch('/api/comments', {
            method: 'GET',
            mode: 'cors'
        }).then(response => {
            return response.json();
        }).then(text => {
            setLoadingComments(false);
            setComments(text);
        });

        setOpenViewCommentDialog(true);
    };

    const handleViewCommentClose = () => {
        setComments([]);
        setOpenViewCommentDialog(false);
        setLoadingComments(false);
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

    return (
        <Container>
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
                                label="Subject"
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
                        <Fade
                            in={loadingComments}
                            style={{
                                transitionDelay: loadingComments ? '800ms' : '0ms',
                            }}
                            unmountOnExit
                        >
                            <CircularProgress mt={2} />
                        </Fade>
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
        </Container>
    );
}