import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from '@mui/material';
import SnippetListItem from './SnippetListItem';

export default function SnippetList({ snippets }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - snippets.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column' }} elevation={4}>
      <TableContainer sx={{ height: '100%' }}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell size='small'>Title</TableCell>
              <TableCell size='small' align='center'>Language</TableCell>
              <TableCell size='small' align='center'><ThumbUpAltIcon /></TableCell>
              <TableCell size='small' align='center'><FavoriteIcon /></TableCell>
              <TableCell size='small' align='center'/>
            </TableRow>
          </TableHead>
          <TableBody>
            {snippets && snippets
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(snippet => (
              <SnippetListItem key={snippet.id} snippet={snippet} />
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={8} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        sx={{ height: '3.7rem' }}
        component='div'
        count={snippets?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        size='small'
      />
    </Paper>
  )
}
