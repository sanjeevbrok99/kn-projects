import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Backdrop, Chip } from '@mui/material';

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
  const { row, setLeadsInfoModal, setSelectedPlot, setCustomersInfoModal } =
    props;

  return (
    <React.Fragment>
      <TableRow sx={{}}>
        <TableCell scope="row">{row.name}</TableCell>
        <TableCell align="right">{row.dimension}</TableCell>
        <TableCell align="right">{row.area}</TableCell>
        <TableCell align="right">{row.cost}</TableCell>
        <TableCell align="right">{row.facing}</TableCell>
        <TableCell align="right">
          <Chip
            sx={{
              cursor: 'pointer',
            }}
            onClick={() => {
              setSelectedPlot(row);
              setLeadsInfoModal(true);
            }}
            color="primary"
            label={
              row.leadsInfo.length +
              ' Lead' +
              (row.leadsInfo.length !== 1 ? 's' : '  ')
            }
          />
        </TableCell>
        <TableCell align="right">
          <Chip
            color="info"
            label={
              row.leadsInfo.length +
              ' Customer' +
              (row.leadsInfo.length !== 1 ? 's' : '  ')
            }
          />
        </TableCell>
        <TableCell align="right">
          {row.sold ? (
            <Chip color="success" label={'Sold'} />
          ) : (
            <Chip color="warning" label={'Avaiable'} />
          )}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function PlotsTable({ plots }) {
  const [leadsInfoModal, setLeadsInfoModal] = React.useState(false);
  const [selectedPlot, setSelectedPlot] = React.useState(null);
  const [customersInfoModal, setCustomersInfoModal] = React.useState(false);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Dimensions</TableCell>
              <TableCell align="right">Area</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="right">Facing</TableCell>
              <TableCell align="right">
                Leads&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </TableCell>
              <TableCell align="right">
                Customer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </TableCell>
              <TableCell align="right">
                Status&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plots.map((plot) => (
              <Row
                key={plot.name}
                row={plot}
                setLeadsInfoModal={setLeadsInfoModal}
                setSelectedPlot={setSelectedPlot}
                setCustomersInfoModal={setCustomersInfoModal}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Backdrop
        sx={{
          zIndex: '99999999',
        }}
        open={leadsInfoModal && selectedPlot}
        onClick={() => {
          setLeadsInfoModal(false);
          setSelectedPlot(null);
        }}
      >
        {selectedPlot && (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            style={{
              width: '60%',
              height: '60%',
              backgroundColor: '#fff',
              padding: '2rem',
            }}
          >
            <h4
              style={{
                textAlign: 'center',
                fontWeight: 700,
                margin: '1rem',
              }}
            >
              Leads for Plot {selectedPlot.name}
            </h4>
            <hr />
            <TableContainer component={Paper}>
              <Table aria-label="table">
                <TableHead>
                  <TableRow>
                    <TableCell>Lead Name</TableCell>
                    <TableCell align="right">Plot</TableCell>
                    <TableCell align="right">Lead Phone</TableCell>
                    <TableCell align="right">Lead Status</TableCell>
                    <TableCell align="right">Manager By</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedPlot.leadsInfo.map((l) => (
                    <TableRow key={l._id}>
                      <TableCell>{l.lead.name}</TableCell>
                      <TableCell align="right">{selectedPlot.name}</TableCell>
                      <TableCell align="right">{l.lead.phone}</TableCell>
                      <TableCell align="right">{l.leadType}</TableCell>
                      <TableCell align="right">{l.lead.assignedTo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {selectedPlot.leadsInfo.length === 0 && (
                <div
                  style={{
                    height: '35vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <h4>No Leads</h4>
                </div>
              )}
            </TableContainer>
          </div>
        )}
      </Backdrop>
    </>
  );
}
