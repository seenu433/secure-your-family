import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function GenericStep(props) {
    var inProps = props.inProps;
    var category = props.category;
    var categoryItems = props.categoryItems;
    const [relatedProducts, setRelatedProducts] = React.useState([]);

    const showDetails = (event) => {
        console.log(event.target.name);
        if (event.target.name === "others") {
            setRelatedProducts([]);
        } else {
            getDetails(event.target.name);
        }
    }

    const changeDetails = (event) => {
        if (event.target.type === "checkbox") {
            inProps.steps[category][event.target.name] = event.target.checked;
        }
        else {
            inProps.steps[category][event.target.name] = event.target.value;
        }

    }

    const getDetails = (key) => {
        if (inProps.details[category][key + "Details"] === undefined) {

            var categoryKey = categoryItems.find(item => item.key === key).value;
            var productsUri = '/api/details?category=related&key=' + categoryKey;
            fetch(productsUri, {
                method: 'GET',
                mode: 'cors'
            }).then(response => {
                return response.json();
            }).then(text => {
                inProps.details[category][key + "Details"] = text;
                setRelatedProducts(text);
            });
        }
        else {
            setRelatedProducts(inProps.details[category][key + "Details"]);
        }
    }

    const getField = (item) => {
        var name = item.value;
        var id = name.replace(/\s/g, "").toLowerCase();
        if (item.type === "check") {
            return (<>
                <FormControlLabel
                    control={<Checkbox color="secondary" name={id} onFocus={showDetails} onChange={changeDetails} defaultChecked={inProps.steps[category][id]} />}
                    label={name}
                />
            </>);
        }
        else {
            return (<>
                <TextField id={id}
                    name={id}
                    label={name}
                    fullWidth
                    variant="standard"
                    type="number"
                    defaultValue={inProps.steps[category][id]}
                    onChange={changeDetails}
                    onFocus={showDetails}
                    inputProps={{
                        step: 1,
                        min: 0,
                        max: 10000000,
                        type: "number"
                    }} />
            </>);
        }

    }

    return (
        <Grid item xs={12}>
            <Grid container>
                <Grid item xs={6}>
                    {categoryItems.map((benefit) => (
                        <Grid item xs={12}>
                            {getField(benefit)}
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }} justifyContent="space-between">
                            <Button disabled={props.isFirst} onClick={() => props.handleBack(inProps)} sx={{ mr: 1 }}>
                                Back
                            </Button>
                            <Button onClick={() => props.handleNext(inProps)}>
                                Continue
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <ul>
                        {relatedProducts.map((expense) => (
                            <li key={expense.Id}><b>{expense.Name}</b>: {expense.Text}</li>
                        ))}
                    </ul>
                </Grid>
            </Grid>
        </Grid>
    );
}