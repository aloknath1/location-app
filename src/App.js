import React, {Component, Fragment} from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';

import './App.css';
import Records from './components/Locations/records';
import AddRecords from './components/Locations/add-records';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      rowsPerPage: 10,
      page: 0
    };

    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });

  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ page: 0, rowsPerPage: parseInt(event.target.value, 10) });
  };

  render() {
    const { open, page, rowsPerPage } = this.state;
    const no_location = require('./images/no-location.jpg');

    if (localStorage.getItem('locations') !== undefined) {
      var locations = JSON.parse(localStorage.getItem('locations'));
    }
    let dom = '';
      if(locations && locations.length > 0)
      {
        dom =
          <Fragment>
          <Button variant="outlined" variant="contained" className="add-location" color="primary" onClick={this.handleClickOpen} className="float-right">Add location</Button>
          <TableContainer>
          <Table stickyHeader aria-label="sticky table" cellPadding="0" cellSpacing="0" width="100%">
              <TableHead>
                  <TableRow>
                    <TableCell>Location Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Phone No</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {
                  locations && locations
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((location, index) => <Records key={index} {...location} />)
                  }

              </TableBody>
              </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={locations.length}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </TableContainer>

          </Fragment>
      }else{
        dom =<Fragment>
              <Button variant="contained" className="add-location" color="primary" onClick={this.handleClickOpen}>Add location</Button>
              <img src={no_location} className="no-image" alt="No location" />
             </Fragment>
      }
    return (
      <div className="container-fluid App">
        <header className="row App-header">
          <p>Coding Test</p>
        </header>
        <div className="row">
          <div className="users">
            <div className="content">
              {dom}

              {
                (open && <AddRecords  open={open} onClose={this.handleClose}  />)
              }

            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;