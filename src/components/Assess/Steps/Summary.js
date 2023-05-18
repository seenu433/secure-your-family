import React from 'react';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import ReactSpeedometer from "react-d3-speedometer";
import GaugeChart from "react-gauge-chart";
import Stack from '@mui/material/Stack';

import { PieChart } from "react-minimal-pie-chart";

export default function Summary(props) {

  const useCheckMobileScreen = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    }

    useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
      }
    }, []);

    return (width <= 768);
  }

  console.log(useCheckMobileScreen());

  var inProps = props.inProps;
  const [summary, setSummary] = React.useState({
    "index": 4,
    "status": " ",
    "totalbenefits": 0,
    "totalliabilities": 0,
    "totaltaxes": 0,
    "networth": 0,
    "totalexpenses": 0,
    "survivalYears": 0,
    "securescore": 0,
    "movers": [],
    "recommendations": [],
    "dataNetWorth": []
  });

  useEffect(() => {
    // call api or anything
    var productsUri = '/api/assess';
    fetch(productsUri, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(inProps.steps)
    }).then(response => {
      return response.json();
    }).then(text => {

      var dataNetWorth = [
        { title: 'Liabilities', value: 10, color: 'grey', label: 'L' },
        { title: 'Net Worth', value: 6, color: '#E38627', label: 'N' },
      ];

      dataNetWorth[0].value = text.totalliabilities + text.totaltaxes;
      dataNetWorth[1].value = text.networth;
      text.dataNetWorth = dataNetWorth;

      setSummary(text);
      setSelected(1);
    });

  }, [inProps]);

  const [selected, setSelected] = React.useState(2);

  const lineWidth = 60;

  const getStatusIcon = (status) => {
    if (status === "green") {
      return (<ArrowDropUpIcon color="success" />);
    }
    else {
      return (<ArrowDropDownIcon color="error" />);
    }
  }

  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>{summary.status}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              maxWidth: 500,
              flexGrow: 1,
              backgroundColor: (theme) =>
                theme.palette.mode === '#eaeaf0',
            }}
          >
            <PieChart
              style={{
                fontFamily:
                  '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                fontSize: '8px',
              }}
              data={summary.dataNetWorth}
              radius={35}
              lineWidth={60}
              segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
              segmentsShift={(index) => (index === selected ? 6 : 1)}
              animate
              label={({ dataEntry }) => dataEntry.value + ' (' + dataEntry.label + ')'}
              labelPosition={100 - lineWidth / 2}
              labelStyle={{
                fill: '#fff',
                opacity: 0.75,
                pointerEvents: 'none',
              }}
            />
            <Stack direction='row' justifyContent='center'><Typography variant='h6' gutterBottom>Net Worth</Typography></Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              maxWidth: 500,
              flexGrow: 1,
              paddingTop: 3,
              height: '100%',
              backgroundColor: (theme) =>
                theme.palette.mode === '#eaeaf0',
            }}
          >
            <ReactSpeedometer
              maxValue={25}
              minValue={0}
              width={useCheckMobileScreen() ? 300 : 200}
              height={useCheckMobileScreen() ? 160 : 110}
              value={summary.survivalYears}
              needleHeightRatio={0.7}
              needleTransition="easeQuadIn"
              needleTransitionDuration={1000}
              needleColor="black"
              colors={["#ff0000", "#00ffff", "#00cccc"]}
              segments={5}
            />
            <Stack direction='row' justifyContent='center' paddingTop={8}><Typography variant='h6' gutterBottom>Years Secured</Typography></Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              maxWidth: 500,
              flexGrow: 1,
              height: '100%',
              backgroundColor: (theme) =>
                theme.palette.mode === '#eaeaf0',
            }}
          >
            <Box mb={2} paddingTop={3.5}>
              <GaugeChart
                id="mileage-gauge-chart"
                nrOfLevels={30}
                colors={["#ff0000", "#00ffff", "#00cccc"]}
                percent={summary.securescore / 100}
                arcWidth={0.5}
                marginInPercent={0.01}
                textColor={"black"}
                formatTextValue={(value) => value}
              />
            </Box>
            <Box>
              <Stack direction='row' justifyContent='center'  paddingTop={7}><Typography variant='h6' gutterBottom>Secure Score</Typography></Stack>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <Typography sx={{ flex: '1 1 100%', ml: 2 }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Movers and Shakers
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  {summary.movers.map((row) => (
                    <TableRow
                      key={row.index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.item}
                      </TableCell>
                      <TableCell align="right">{getStatusIcon(row.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <Typography sx={{ flex: '1 1 100%', ml: 2 }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Recommendations
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  {summary.recommendations.map((row) => (
                    <TableRow
                      key={row.index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.item}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }} justifyContent="space-between">
        <Button onClick={() => props.handleBack(inProps)} sx={{ mr: 1 }}>
          Back
        </Button>
        <Button onClick={() => props.handleNext(inProps)}>
          Reset
        </Button>
      </Box>
    </Grid>
  );
}