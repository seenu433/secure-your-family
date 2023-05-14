import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Tab from '@mui/material/Tab';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SavingsIcon from '@mui/icons-material/Savings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PersonPinIcon from "@mui/icons-material/PersonPin";
import ErrorIcon from "@mui/icons-material/Error";

import Divider from '@mui/material/Divider';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        handleBenefitDetailsClose();
        handleLiabilitiesDetailsClose();
        handleExpensesDetailsClose();
    };

    const benefits = [
        { id: "1", value: "Life Insurance" },
        { id: "2", value: "Social Security" },
        { id: "3", value: "401K" },
        { id: "4", value: "IRA" },
        { id: "5", value: "Savings Accounts" },
        { id: "6", value: "Brokerage accounts" },
        { id: "7", value: "HSA accounts" },
        { id: "8", value: "FSA accounts" },
        { id: "9", value: "Real Estate" },
        { id: "10", value: "Accidental Death and Dismemberment" },
        { id: "11", value: "Term insurance" },
        { id: "12", value: "Mortgage Protection" }
    ];

    const handleDetailsShow = (key, setDetails, setAdditionalDetails, setRelatedDetails, setLoadingAdditionalDetails, setLoadingRelatedDetails) => {

        setLoadingAdditionalDetails(true);
        setLoadingRelatedDetails(true);

        var uri = '/api/details?category=details&key=' + key;
        fetch(uri, {
            method: 'GET',
            mode: 'cors'
        }).then(response => {
            return response.json();
        }).then(text => {
            setAdditionalDetails(text);
            setLoadingAdditionalDetails(false);
        });

        var productsUri = '/api/details?category=related&key=' + key;
        fetch(productsUri, {
            method: 'GET',
            mode: 'cors'
        }).then(response => {
            return response.json();
        }).then(text => {
            setRelatedDetails(text);
            setLoadingRelatedDetails(false);
        });

        setDetails(true);
    }

    const handleDetailsClose = (setDetails, setAdditionalDetails, setRelatedDetails) => {
        setRelatedDetails([]);
        setAdditionalDetails([]);
        setDetails(false);
    };

    const [benefitsDetails, setBenefitsDetails] = React.useState(false);

    const [benefitsAdditionalDetails, setBenefitsAdditionalDetails] = React.useState([]);
    const [benefitsRelatedDetails, setBenefitsRelatedDetails] = React.useState([]);

    const [loadingBenefitsAdditionalDetails, setLoadingBenefitsAdditionalDetails] = React.useState(false);
    const [loadingBenefitsRelatedDetails, setLoadingBenefitsRelatedDetails] = React.useState(false);

    const handleBenefitDetailsShow = (key) => {
        handleDetailsShow(key, setBenefitsDetails, setBenefitsAdditionalDetails, setBenefitsRelatedDetails, setLoadingBenefitsAdditionalDetails, setLoadingBenefitsRelatedDetails);
    };



    const handleBenefitDetailsClose = () => {
        handleDetailsClose(setBenefitsDetails, setBenefitsAdditionalDetails, setBenefitsRelatedDetails);
    };

    const liabilities = [
        { id: "1", value: "Home mortgage" },
        { id: "2", value: "Car Loans" },
        { id: "3", value: "Credit Card Bills" },
        { id: "4", value: "Personal Loans" },
        { id: "5", value: "Home Insurance" },
        { id: "6", value: "Car Insurance" },
        { id: "7", value: "Funeral expenses" }
    ];

    const [liabilitiesDetails, setLiabilitiesDetails] = React.useState(false);

    const [liabilitiesAdditionalDetails, setLiabilitiesAdditionalDetails] = React.useState([]);
    const [liabilitiesRelatedDetails, setLiabilitiesRelatedDetails] = React.useState([]);

    const [loadingLiabilitiesAdditionalDetails, setLoadingLiabilitiesAdditionalDetails] = React.useState(false);
    const [loadingLiabilitiesRelatedDetails, setLoadingLiabilitiesRelatedDetails] = React.useState(false);

    const handleLiabilitiesDetailsShow = (key) => {
        handleDetailsShow(key, setLiabilitiesDetails, setLiabilitiesAdditionalDetails, setLiabilitiesRelatedDetails, setLoadingLiabilitiesAdditionalDetails, setLoadingLiabilitiesRelatedDetails);
    };

    const handleLiabilitiesDetailsClose = () => {
        handleDetailsClose(setLiabilitiesDetails, setLiabilitiesAdditionalDetails, setLiabilitiesRelatedDetails);
    };

    const expenses = [
        { id: "1", value: "Housing" },
        { id: "2", value: "Transportation" },
        { id: "3", value: "Utilities" },
        { id: "4", value: "Survivor Life insurance" },
        { id: "5", value: "Healthcare" },
        { id: "6", value: "Education" },
        { id: "7", value: "Recreation" }
    ];

    const [expensesDetails, setExpensesDetails] = React.useState(false);

    const [expensesAdditionalDetails, setExpensesAdditionalDetails] = React.useState([]);
    const [expensesRelatedDetails, setExpensesRelatedDetails] = React.useState([]);

    const [loadingExpensesAdditionalDetails, setLoadingExpensesAdditionalDetails] = React.useState(false);
    const [loadingExpensesRelatedDetails, setLoadingExpensesRelatedDetails] = React.useState(false);

    const handleExpensesDetailsShow = (key) => {
        handleDetailsShow(key, setExpensesDetails, setExpensesAdditionalDetails, setExpensesRelatedDetails, setLoadingExpensesAdditionalDetails, setLoadingExpensesRelatedDetails);
    };

    const handleExpensesDetailsClose = () => {
        handleDetailsClose(setExpensesDetails, setExpensesAdditionalDetails, setExpensesRelatedDetails);
    };

    return (
        <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>

            </Typography>
            <Divider />
            <Typography gutterBottom>
                Managing finances after death is an important part of life. It is never an easy decision to sit down and think about your own death. But planning for it is something that could help you get to terms with your own mortality and help your family after you are gone. Investing for death benefit is a way to ensure that your loved ones are financially secure after you pass away. There are few important questions that you need to answer to make sure you do not add to your family grief over the loss of you.
            </Typography>
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
            <Typography gutterBottom>
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
                        <Box sx={{ display: "flex" }}>
                            <Collapse orientation="vertical" in={!benefitsDetails} timeout="auto" sx={benefitsDetails ? { width: 0 } : { width: "auto" }}>
                                <div>
                                    This section list various liabilities that you can leave behind which your survivor has to deal with or that will have to be paid from the money you left behind:
                                    <ul>
                                        {benefits.map((benefit) => (
                                            <li key={benefit.id}>{benefit.value} <MoreHorizIcon fontSize="small" color="secondary" sx={{ verticalAlign: "middle" }} onClick={() => handleBenefitDetailsShow(benefit.value)} /></li>
                                        ))}
                                    </ul>
                                    It is important to consider insurance on your high valued liabilities and make plans to reduce the other to as low as possible.
                                </div>
                            </Collapse>
                            <Collapse orientation="vertical" in={benefitsDetails} timeout="auto" sx={benefitsDetails ? { width: "auto" } : { width: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <KeyboardArrowDownIcon onClick={handleBenefitDetailsClose} style={{ alignContent: "center" }} />
                                </div>
                                <div>
                                    <Divider />
                                    {benefitsAdditionalDetails.map((benefit) => (
                                        <Typography mt={2} gutterBottom>
                                            {benefit.Text}
                                        </Typography>
                                    ))}
                                    <Fade
                                        in={loadingBenefitsAdditionalDetails}
                                        style={{
                                            transitionDelay: loadingBenefitsAdditionalDetails ? '800ms' : '0ms',
                                        }}
                                        unmountOnExit
                                    >
                                        <CircularProgress mt={2} />
                                    </Fade>
                                    <Typography variant='h6' mt={2} gutterBottom>
                                        Related Products:
                                    </Typography>
                                    <ul>
                                        {benefitsRelatedDetails.map((benefit) => (
                                            <li key={benefit.Id}><b>{benefit.Name}</b>: {benefit.Text}</li>
                                        ))}
                                    </ul>
                                    <Fade
                                        in={loadingBenefitsRelatedDetails}
                                        style={{
                                            transitionDelay: loadingBenefitsRelatedDetails ? '800ms' : '0ms',
                                        }}
                                        unmountOnExit
                                    >
                                        <CircularProgress mt={2} />
                                    </Fade>
                                </div>
                            </Collapse>
                        </Box>
                    </TabPanel>
                    <TabPanel value="2">
                        <Box sx={{ display: "flex" }}>
                            <Collapse orientation="vertical" in={!liabilitiesDetails} timeout="auto" sx={liabilitiesDetails ? { width: 0 } : { width: "auto" }}>
                                <div>
                                    This section lists various instruments that may be
                                    applicable as Survivor benefits
                                    <ul>
                                        {liabilities.map((liability) => (
                                            <li key={liability.id}>{liability.value} <MoreHorizIcon fontSize="small" color="secondary" sx={{ verticalAlign: "middle" }} onClick={() => handleLiabilitiesDetailsShow(liability.value)} /></li>
                                        ))}
                                    </ul>
                                    Each of the instrument has a death benefit which will
                                    be transferred to the survivor(s)
                                </div>
                            </Collapse>
                            <Collapse orientation="vertical" in={liabilitiesDetails} timeout="auto" sx={liabilitiesDetails ? { width: "auto" } : { width: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <KeyboardArrowDownIcon onClick={handleLiabilitiesDetailsClose} style={{ alignContent: "center" }} />
                                </div>
                                <div>
                                    <Divider />
                                    {liabilitiesAdditionalDetails.map((liability) => (
                                        <Typography mt={2} gutterBottom>
                                            {liability.Text}
                                        </Typography>
                                    ))}
                                    <Fade
                                        in={loadingLiabilitiesAdditionalDetails}
                                        style={{
                                            transitionDelay: loadingLiabilitiesAdditionalDetails ? '800ms' : '0ms',
                                        }}
                                        unmountOnExit
                                    >
                                        <CircularProgress mt={2} />
                                    </Fade>
                                    <Typography variant='h6' mt={2} gutterBottom>
                                        Related Products:
                                    </Typography>
                                    <ul>
                                        {liabilitiesRelatedDetails.map((liability) => (
                                            <li key={liability.Id}><b>{liability.Name}</b>: {liability.Text}</li>
                                        ))}
                                    </ul>
                                    <Fade
                                        in={loadingLiabilitiesRelatedDetails}
                                        style={{
                                            transitionDelay: loadingLiabilitiesRelatedDetails ? '800ms' : '0ms',
                                        }}
                                        unmountOnExit
                                    >
                                        <CircularProgress mt={2} />
                                    </Fade>
                                </div>
                            </Collapse>
                        </Box>
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
                        <Box sx={{ display: "flex" }}>
                            <Collapse orientation="vertical" in={!expensesDetails} timeout="auto" sx={expensesDetails ? { width: 0 } : { width: "auto" }}>
                                <div>
                                    Finally this is what is needed by your survivors to live comfortably for the rest of their life
                                    <ul>
                                        {expenses.map((expense) => (
                                            <li key={expense.id}>{expense.value} <MoreHorizIcon fontSize="small" color="secondary" sx={{ verticalAlign: "middle" }} onClick={() => handleExpensesDetailsShow(expense.value)} /></li>
                                        ))}
                                    </ul>
                                </div>
                            </Collapse>
                            <Collapse orientation="vertical" in={expensesDetails} timeout="auto" sx={expensesDetails ? { width: "auto" } : { width: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <KeyboardArrowDownIcon onClick={handleExpensesDetailsClose} style={{ alignContent: "center" }} />
                                </div>
                                <div>
                                    <Divider />
                                    {expensesAdditionalDetails.map((expense) => (
                                        <Typography mt={2} gutterBottom>
                                            {expense.Text}
                                        </Typography>
                                    ))}
                                    <Fade
                                        in={loadingExpensesAdditionalDetails}
                                        style={{
                                            transitionDelay: loadingExpensesAdditionalDetails ? '800ms' : '0ms',
                                        }}
                                        unmountOnExit
                                    >
                                        <CircularProgress mt={2} />
                                    </Fade>
                                    <Typography variant='h6' mt={2} gutterBottom>
                                        Related Products:
                                    </Typography>
                                    <ul>
                                        {expensesRelatedDetails.map((expense) => (
                                            <li key={expense.Id}><b>{expense.Name}</b>: {expense.Text}</li>
                                        ))}
                                    </ul>
                                    <Fade
                                        in={loadingExpensesRelatedDetails}
                                        style={{
                                            transitionDelay: loadingExpensesRelatedDetails ? '800ms' : '0ms',
                                        }}
                                        unmountOnExit
                                    >
                                        <CircularProgress mt={2} />
                                    </Fade>
                                </div>
                            </Collapse>
                        </Box>
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
                    <ErrorIcon  style={{verticalAlign:"middle"}}/> Disclaimer
                </Typography>
                <Typography  m={1}  gutterBottom>
                    The content discussed above is for education only, This is not a comprehensive list and it completely depends on the individuals situation. You should always consult with a licensed financial advisor.
                </Typography>
            </Box>
        </Grid>
    );
}