import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.dimension}</TableCell>
        <TableCell align="right">{row.area}</TableCell>
        <TableCell align="right">{row.sold ? 'Sold' : 'Not Sold'}</TableCell>
        <TableCell align="right">{row.facing}</TableCell>
        {/* <TableCell align="right">{row.leadsInfo.length}
        
        </TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                {row.leadsInfo?.length > 0 && (
                  <TableHead>
                    <TableRow>
                      <TableCell>Lead</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Managed By</TableCell>
                    </TableRow>
                  </TableHead>
                )}
                <TableBody>
                  {row.leadsInfo?.length === 0 && (
                    <h4
                      style={{
                        textAlign: 'center',
                        marginTop: '1rem',
                        marginBottom: '1rem',
                      }}
                    >
                      No Leads
                    </h4>
                  )}
                  {row.leadsInfo?.map((r) => (
                    <TableRow key={r.lead._id}>
                      <TableCell component="th" scope="row">
                        {r.lead.name}
                      </TableCell>
                      <TableCell>{r.lead.email}</TableCell>
                      <TableCell>{r.lead.phone}</TableCell>
                      <TableCell>{r.leadType}</TableCell>
                      <TableCell>{r.lead.assignedTo?.firstName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function PlotsTable({ plots }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Leads</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Dimensions</TableCell>
            <TableCell align="right">Area</TableCell>
            <TableCell align="right">Sold</TableCell>
            <TableCell align="right">Facing</TableCell>
            {/* <TableCell align="right">Leads</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {plots.map((plot) => (
            <Row key={plot.name} row={plot} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
