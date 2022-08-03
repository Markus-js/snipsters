import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
} from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchResult from './SearchResult';
import { getSorter } from '../utils/searchUtils';

export default function SerchResults({ snippets, previewSnippet, setPreviewSnippet }) {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('upvotes');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openSnippet, setOpenSnippet] = useState(null);
  
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - snippets.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = property => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Paper sx={{ height: '100%', width: '100%', overflowY: 'hidden', display: 'flex', flexDirection: 'column' }} elevation={4}>
      <TableContainer sx={{ height: '100%' }}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'title'}
                  direction={orderBy === 'title' ? order : 'asc'}
                  onClick={() => handleSort('title')}
                >
                  Title
                </TableSortLabel>
              </TableCell>
              <TableCell align='left'>
                <TableSortLabel
                  active={orderBy === 'language'}
                  direction={orderBy === 'language' ? order : 'asc'}
                  onClick={() => handleSort('language')}
                >
                  Language
                </TableSortLabel>
              </TableCell>
              <TableCell align='center'>Author</TableCell>
              <TableCell align='center' >
                <TableSortLabel
                  active={orderBy === 'upvotes'}
                  direction={orderBy === 'upvotes' ? order : 'asc'}
                  onClick={() => handleSort('upvotes')}
                  hideSortIcon
                >
                  <ThumbUpOffAltIcon />
                </TableSortLabel>
              </TableCell>
              <TableCell align='center' >
                <TableSortLabel
                  active={orderBy === 'favorites'}
                  direction={orderBy === 'favorites' ? order : 'asc'}
                  onClick={() => handleSort('favorites')}
                  hideSortIcon
                >
                  <FavoriteBorderIcon />
                </TableSortLabel>
              </TableCell>
              <TableCell align='center' />
            </TableRow>
          </TableHead>
          <TableBody>
          {snippets && snippets
            .sort((a, b) => order === 'asc' ? getSorter(a, b, orderBy) : -getSorter(a, b, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((snippet) => (
              <SearchResult
                key={snippet.id}
                result={snippet}
                setPreviewSnippet={setPreviewSnippet}
                previewSnippet={previewSnippet}
                openSnippet={openSnippet}
                setOpenSnippet={setOpenSnippet}
              />
            ))
          }
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={8} />
            </TableRow>
          )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 25, 100]}
        sx={{ height: '3.7rem' }}
        component='div'
        count={snippets?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

