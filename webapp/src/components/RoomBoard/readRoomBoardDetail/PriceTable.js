import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const PriceTable = (props) => {
  const completeData = props.completeData;

  return (
    <TableContainer component={Paper}>
      {(!(completeData.length === 0)) ? (
        <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell align="right">거래금액(원)</TableCell>
              <TableCell align="right">거래보증금(원)</TableCell>
              <TableCell align="right">거래기간(시작)</TableCell>
              <TableCell align="right">거래기간(종료)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {completeData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.deposit}</TableCell>
                <TableCell align="right">{row.startDate}</TableCell>
                <TableCell align="right">{row.endDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        "거래 가격 정보 없음."
      )}
    </TableContainer>
  );
}

export default PriceTable