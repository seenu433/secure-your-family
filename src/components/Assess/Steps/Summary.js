import React from 'react';
import { useEffect } from 'react';
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

import { RadialBarChart, RadialBar } from 'recharts';


export default function Summary(props) {
  var inProps = props.inProps;
  const [summary, setSummary] = React.useState({});

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
        console.log(text);
        setSummary(text);
    });
  }, [inProps]);

  const data = [
    {
      name: 'A',
      x: 31.47,
      fill: '#8784d8',
    },
    {
      name: 'B',
      x: 26.69,
      fill: '#84a6ed',
    },
    {
      name: 'C',
      x: 15.69,
      fill: '#8ed1e1',
    },
    {
      name: 'D',
      x: 8.22,
      fill: '#82da9d',
    },
    {
      name: 'E',
      x: 8.63,
      fill: '#a2de6c',
    },
    {
      name: 'F',
      x: 2.63,
      fill: '#d0dd57',
    },
    {
      name: 'G',
      x: 6.67,
      fill: '#ffa658',
    },
  ];

  const data1 = [
    { name: 'A', x: 1, fill: "green" },
    { name: 'B', x: 2, fill: "yellow" },
    { name: 'C', x: 3, fill: "aqua" },
    { name: 'D', x: 4, fill: "blue" },
    { name: 'E', x: 5, fill: "orange" },
    { name: 'F', x: 6, fill: "red" },
    { name: 'G', x: 7, fill: "black" },
    { name: 'H', x: 8, fill: "purple" },
    { name: 'I', x: 9, fill: "gray" },
  ];

  const data2 = [
    { name: 'A', x: 1, fill: "green" },
    { name: 'B', x: 2, fill: "yellow" },
    { name: 'C', x: 3, fill: "aqua" },
    { name: 'D', x: 4, fill: "blue" },
    { name: 'E', x: 5, fill: "orange" },
    { name: 'F', x: 6, fill: "red" },
    { name: 'G', x: 7, fill: "black" },
    { name: 'H', x: 8, fill: "purple" },
    { name: 'I', x: 9, fill: "gray" },
  ];

  const rows = [
    { index: 1, item: "This is a positive recommendation", status: "green" },
    { index: 2, item: "This is a positive recommendation", status: "green" },
    { index: 4, item: "This is a positive recommendation", status: "red" },
  ];

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
            <RadialBarChart width={200} height={200} data={data}
              innerRadius="20%" outerRadius="70%">
              <RadialBar minAngle={30} dataKey="x" clockWise />
            </RadialBarChart>
          </Paper>

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
            <RadialBarChart width={200} height={200} data={data2}>
              <RadialBar minAngle={15} dataKey="x" />
            </RadialBarChart>
          </Paper>
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
            <RadialBarChart width={200} height={200} data={data1}>
              <RadialBar minAngle={15} dataKey="x" />
            </RadialBarChart>
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
                  {rows.map((row) => (
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
                  {rows.map((row) => (
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