import React from 'react';
import Grid from "@material-ui/core/Grid";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Customclasses from "../FaultIdentificationAnalysis.css";

interface predictionElementProperties {
    dateTime: string;
    head: number;
    speed: number;
    flow: number;
    torque: number;
    faultStatus: string;
}

interface AnalyticsPredictionComponentProps {
    analyticalPredictionList: predictionElementProperties[],
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props: AnalyticsPredictionComponentProps) {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>            
        <h2 className={Customclasses.chartHeading}>Last 10 Predictions</h2>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>DATETIME</StyledTableCell>
                <StyledTableCell align="left">HEAD</StyledTableCell>
                <StyledTableCell align="left">FLOW</StyledTableCell>
                <StyledTableCell align="left">SPEED</StyledTableCell>
                <StyledTableCell align="left">TORQUE</StyledTableCell>
                <StyledTableCell align="left">FAULT STATUS</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.analyticalPredictionList.map((row,index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="left">{row.dateTime}</StyledTableCell>
                  <StyledTableCell align="left">{row.head}</StyledTableCell>
                  <StyledTableCell align="left">{row.flow}</StyledTableCell>
                  <StyledTableCell align="left">{row.speed}</StyledTableCell>
                  <StyledTableCell align="left">{row.torque}</StyledTableCell>              
                  <StyledTableCell align="left">{row.faultStatus}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
    
    
  );
}