import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SavingsIcon from '@mui/icons-material/Savings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PersonPinIcon from "@mui/icons-material/PersonPin";
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import ErrorIcon from "@mui/icons-material/Error";
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import Benefits from './Steps/Benefits';
import Expenses from './Steps/Expenses';
import Tax from './Steps/Tax';
import Summary from './Steps/Summary';
import Liabilities from './Steps/Liabilities';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <SavingsIcon />,
        2: <MonetizationOnIcon />,
        3: <AccountBalanceIcon />,
        4: <PersonPinIcon />,
        5: <FactCheckIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const steps = ['Benefits', 'Liabilities', 'Tax', 'Expenses', 'Summary'];

export default function Assess() {
    const [activeStep, setActiveStep] = React.useState(0);

    const getAssessmentDataStructure = () => {
        return {
            steps: {
                benefits: {
                    index: 1,
                },
                liabilities: {
                    index: 2,
                },
                tax: {
                    index: 3
                },
                expenses: {
                    index: 4
                },
                summary: {
                    index: 5
                }
            },
            details: {
                benefits: {
                    index: 1,
                },
                liabilities: {
                    index: 2,
                },
                tax: {
                    index: 3
                },
                expenses: {
                    index: 4
                }
            }
        }
    }

    const [assessmentData, setAssessmentData] = React.useState(getAssessmentDataStructure());

    const handleNext = (inProps) => {
        setAssessmentData(inProps);
        if (activeStep === 4) {
            setActiveStep(0);
            var assesmentStructure = getAssessmentDataStructure();
            assesmentStructure.details = inProps.details;
            setAssessmentData(assesmentStructure);
        }
        else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }

    }

    const handleBack = (inProps) => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (<>
                    <Benefits inProps={assessmentData} handleBack={handleBack} handleNext={handleNext} />
                </>);
            case 1:
                return (<>
                    <Liabilities inProps={assessmentData} handleBack={handleBack} handleNext={handleNext} />
                </>);
            case 2:
                return (<>
                    <Tax inProps={assessmentData} handleBack={handleBack} handleNext={handleNext} />
                </>);
            case 3:
                return (<>
                    <Expenses inProps={assessmentData} handleBack={handleBack} handleNext={handleNext} />
                </>);
            case 4:
                return (<>
                    <Summary inProps={assessmentData} handleBack={handleBack} handleNext={handleNext} />
                </>);
            default:
                return 'Unknown step';
        }
    }

    return (
        <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>

            </Typography>
            <Divider />
            <Stack sx={{ width: '100%' }} spacing={4}>
                <Box sx={{
                    marginTop: 5,
                    position: "relative",
                    p: { xs: 3 },
                    pr: { md: 0 },
                    background:
                        "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
                    color: "white"
                }}>
                    <Typography variant="h6" >
                        <ErrorIcon style={{ verticalAlign: "middle" }} /> Disclaimer
                    </Typography>
                    <Typography m={1} gutterBottom>
                        The assessments captures information about your current benefits, liabilities and expenses to summarize on your readiness.
                        The content presented here is for education only, this is not a comprehensive list and it completely depends on the individuals situation. You should always consult with a licensed financial advisor.
                    </Typography>
                </Box>
                <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Stack direction={{ md: 'row', xs: 'column' }} spacing={2} justifyContent='center'>
                    <Grid xs={12} md={7} item container>
                        <Paper
                            sx={{
                                p: 2,
                                flexGrow: 1,
                                backgroundColor: (theme) =>
                                    theme.palette.mode === '#fff',
                            }}
                        >
                            {getStepContent(activeStep)}
                        </Paper>
                    </Grid>
                    <Grid xs={12} md={3} item >
                        <Paper
                            sx={{
                                p: 2,
                                maxWidth: 500,
                                flexGrow: 1,
                                height: '100%',
                                backgroundColor: 'grey.200',
                            }}
                        >
                        </Paper>
                    </Grid>
                </Stack>
            </Stack>
        </Grid>
    );
}