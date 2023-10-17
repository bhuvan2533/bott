import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios"
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(ntid, empName,projectName, teamName) {
  return { ntid, empName, projectName,teamName };
}

// const rows = [
//   createData(1, "BHS1HYD","Bhuvan","<project-name>", "EFV22"),
//   createData(2, "DGS1ADU","Adesh","<project-name>", "EFV22"),
//   createData(3, "KLA4KOR","Akhila","<project-name>", "EFV22"),
//   createData(4, "KKJ6ADU","Suman","<project-name>", "EFV22"),
//   createData(5, "LKJ9KOR","Ravikumar","<project-name>", "EFV22"),
//   createData(6, "DFS9DBS","Kaushik","<project-name>", "EFV22"),
//   createData(7, "FGH9DFS","Lakshmi","<project-name>", "EFV22"),
//   createData(8, "JOS9SDG","Pratik","<project-name>", "EFV22"),
//   createData(9, "HWW9SFS","Hemanth","<project-name>", "EFV22"),
//   createData(10, "IWJ8JLJ","Pradeepa","<project-name>", "EFV22"),
//   createData(11, "SSV9SDF","Bhavya","<project-name>", "EFV22"),
//   createData(12, "SSB9SBS","Sujay","<project-name>", "EFV22"),
// ];



async function deleteUser(ntid){
  const apiUrl = `http://localhost:5000/api/delete-user/${ntid}`;
    try {
      const {data} = await axios.get(apiUrl);
      if(data.success){  
        alert("User deleted !!");
        window.location.reload();
      }
        else alert("There was some problem while deleting the user :(, please try again later...")
    } catch (err) {
      console.error('Error fetching data:', err);
    }
}

export default function CreateTable(props) {
  let cnt=0;
  const rows = props.empTableData.map((ele)=>{
    return createData(ele.empNtid,ele.empName,ele.taskName,ele.teamName)
  })  
  rows.sort((a, b) => a.empName.localeCompare(b.empName));
  console.log(rows);
  //From here
  


  return (
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sl. No.</StyledTableCell>
            <StyledTableCell align="right">NTID</StyledTableCell>
            <StyledTableCell align="right">Employee Name</StyledTableCell>
            <StyledTableCell align="right">Project Name</StyledTableCell>
            <StyledTableCell align="right">Team Name</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.slNumber}>
              <StyledTableCell component="th" scope="row">
                {++cnt}
              </StyledTableCell>
              <StyledTableCell align="right">{row.ntid}</StyledTableCell>
              <StyledTableCell align="right">{row.empName}</StyledTableCell>
              <StyledTableCell align="right">{row.projectName}</StyledTableCell>
              <StyledTableCell align="right">{row.teamName}</StyledTableCell>
              <StyledTableCell align="right"><Button onClick={(e)=> deleteUser(row.ntid)} sx={{padding:"0",margin:"0"}}><DeleteIcon sx={{color:"rgba(255, 0, 0, 0.605)"}} /></Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
