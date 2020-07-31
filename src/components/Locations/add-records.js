import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { v4 as uuidv4 } from 'uuid';
import TimezoneSelect from 'react-timezone-select';
import SelectUSState from 'react-select-us-states';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

class AddRecords extends Component{
    constructor(props) {
        super(props);

        this.state = {
            id: uuidv4(),
            location_name: "",
            address_line1: "",
            suite_no: "",
            address_line2: "",
            city: "",
            states: "",
            zipcode: "",
            phone: "",
            timezone: "",
            facility_times: "",
            appointment_pool: ""
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleClose = () => {
        this.props.onClose(false);
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (localStorage.getItem('locations') != null) {
            var location_data = JSON.parse(localStorage.getItem('locations'));
            location_data.push(this.state);
            localStorage.setItem('locations', JSON.stringify(location_data));
        } else {
            var locations_data = [];
            locations_data.push(this.state);
            localStorage.setItem('locations', JSON.stringify(locations_data));
        }
        this.props.onClose(false);
        window.location.reload();
        return false;
    }

    render() {
        return (
            <Dialog aria-labelledby="simple-dialog-title" open={this.props.open} onClose={this.props.handleClose}>
                <DialogTitle id="add-location">Add Location</DialogTitle>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <TextField
                            type="text"
                            name="location_name"
                            label="Location Name"
                            value={this.state.location_name}
                            onChange={this.onChange}
                            />
                    </div>
                    <div>
                        <TextField name="address_line1"
                            label="Address Line 1"
                            value={this.state.address_line1}
                            onChange={this.onChange} />
                    </div>
                    <div>
                        <TextField name="suite_no"
                            value={this.state.suite_no}
                            label="Suite No"
                            onChange={this.onChange} />
                    </div>
                    <div>
                        <TextField name="address_line2"
                            label="Address Line 2"
                            onChange={this.onChange}
                            value={this.state.address_line2}
                            />
                    </div>
                    <div>
                        <TextField name="city"
                            label="City"
                            value={this.state.city}
                            onChange={this.onChange}/>
                    </div>
                    <div>
                        <label className="input-lbl">States</label>
                        <SelectUSState
                            className="dropdown"
                            name="state"
                            value={this.state.states}
                            onChange={state =>
                        this.setState({ states: state })} />
                    </div>
                    <div>
                        <TextField label="Zipcode"
                            name="zipcode"
                            value={this.state.zipcode}
                            onChange={this.onChange}/>
                    </div>
                    <div>
                        <label className="input-lbl">Phone No</label>
                        <PhoneInput
                            country={'us'}
                            value={this.state.phone}
                            onChange={phone =>
                        this.setState({ phone })}
                        />
                    </div>
                    <div className="timezone-div">
                        <label className="input-lbl">Timezone</label>
                        <TimezoneSelect
                            name="timezone"
                            value={this.state.timezone}
                            onChange={tz =>
                        this.setState({timezone: tz})} />
                    </div>
                    <div>
                        <TextField name="facility_times"
                            label="Facility Times"
                            value={this.state.facility_times}
                            onChange={this.onChange}
                            />
                    </div>
                    <div>
                        <TextField name="appointment_pool"
                            label="Appointment Pool"
                            value={this.state.appointment_pool}
                            onChange={this.onChange}/>
                    </div>
                    <div className="buttons-div">
                        <Button type="submit" variant="contained" className="mr" onClick={this.handleClose}>
                        Cancel
                        </Button>
                        <Button type="submit" variant="contained" className="mr" color="primary">
                        Submit
                        </Button>
                    </div>
                </form>
            </Dialog>
        );
    }
}

export default AddRecords;