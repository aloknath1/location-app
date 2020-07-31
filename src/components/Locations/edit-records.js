import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TimezoneSelect from 'react-timezone-select';
import SelectUSState from 'react-select-us-states';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

class EditRecords extends Component{
    constructor(props) {
        super(props);
        var location_data = "";

        if (localStorage.getItem('edit_locations') !== undefined) {
            location_data = JSON.parse(localStorage.getItem('edit_locations'));
        }

        this.state = {
            id:location_data.id,
            location_name: location_data.location_name,
            address_line1: location_data.address_line1,
            suite_no: location_data.suite_no,
            address_line2: location_data.address_line2,
            city: location_data.city,
            states: location_data.states,
            zipcode: location_data.zipcode,
            phone: location_data.phone,
            timezone: location_data.timezone,
            facility_times: location_data.facility_times,
            appointment_pool: location_data.appointment_pool
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (localStorage.getItem('edit_locations') !== undefined) {
            localStorage.setItem('edit_locations', JSON.stringify(this.state));
        }

        if (localStorage.getItem('locations') !== undefined) {
            var location_data = JSON.parse(localStorage.getItem('locations'));
            for (let i = 0; i < location_data.length; i++){
                if (location_data[i].id === this.state.id) {
                    location_data[i] = this.state;
                    break;
                }
            }

            localStorage.setItem('locations', JSON.stringify(location_data));
            localStorage.removeItem('edit_locations');
        }

        this.props.onClose(false);
        window.location.reload();
        return false;
    }

    render() {
        const { id } = this.state;
        return (
            <Dialog aria-labelledby="simple-dialog-title" open={this.props.open} onClose={this.props.handleClose}>
                <DialogTitle id="simple-dialog-title">Edit Location</DialogTitle>
                <form onSubmit={this.handleSubmit}>
                    <input type="hidden" value={id} readOnly />
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
                        <label>Timezone</label>
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
                        <Button type="submit" variant="contained" className="mr" onClick={this.props.onClose}>
                        Cancel
                        </Button>
                        <Button type="submit" variant="contained" className="mr" color="primary">
                        Save
                        </Button>
                    </div>
                </form>
            </Dialog>
        );
    }
}

export default EditRecords;