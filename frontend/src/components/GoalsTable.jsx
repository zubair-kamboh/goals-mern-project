import * as React from 'react'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Container, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { deleteGoal } from '../features/goals/goalsSlice'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export default function GoalsTable({ goals }) {
  const dispatch = useDispatch()

  const onDelete = (id) => {
    dispatch(deleteGoal(id))
  }

  return (
    <Container maxWidth="md">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="right">User</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Goal</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goals &&
              goals.map((goal) => (
                <StyledTableRow key={goal._id}>
                  <StyledTableCell component="th" scope="row">
                    {goal._id}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {goal.user.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {goal.user.email}
                  </StyledTableCell>
                  <StyledTableCell align="right">{goal.goal}</StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      color="primary"
                      aria-label="edit-goal"
                      component={Link}
                      to={`/update-goal/${goal._id}`}
                    >
                      <EditIcon />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      color="secondary"
                      aria-label="edit-goal"
                      component="span"
                      onClick={() => onDelete(goal._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
