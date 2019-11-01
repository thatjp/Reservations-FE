import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

const GET_ALL_RESERVATIONS = gql`
  query getAllReservations {
    getAllReservations {
      _id
      firstName
      lastName
      arrivalDate
      departureDate
    }
  }
`

const AppTable: React.FC = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_ALL_RESERVATIONS);
  if (loading) return <p>loading...</p>;
  if (error) return <p>ERROR</p>;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Arrival Date</TableCell>
            <TableCell align="left">Departure Date</TableCell>
            <TableCell align="left">id</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.getAllReservations.map((row: any) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.firstName}
              </TableCell>
              <TableCell align="left">{row.lastName}</TableCell>
              <TableCell align="left">{row.arrivalDate}</TableCell>
              <TableCell align="left">{row.departureDate}</TableCell>
              <TableCell align="left">{row._id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default AppTable
export { GET_ALL_RESERVATIONS }