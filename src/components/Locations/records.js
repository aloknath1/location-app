import React, {useState} from 'react';
import './records.css';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import EditRecords from './edit-records';

const Records = (props) => {
    const [editOpen, setEditOpen] = useState(false);

    const removeByAttr = function(arr, attr, value){
        var i = arr.length;
        while(i--){
           if( arr[i]
               && arr[i].hasOwnProperty(attr)
               && (arguments.length > 2 && arr[i][attr] === value ) ){

               arr.splice(i,1);

           }
        }
        return arr;
    }

    const deleteRecord = (loc) => {
        if (localStorage.getItem('locations') !== undefined) {
            var location_data = JSON.parse(localStorage.getItem('locations'));
            var newArr = removeByAttr(location_data, 'location_name', loc);
            //setting up the localStorage
            localStorage.setItem('locations', JSON.stringify(newArr));
            window.location.reload();
            return false;
        }
    }

    const editRecord = (record) => {
        localStorage.setItem('edit_locations', JSON.stringify(record));
        setEditOpen(true);
    }

    const handleClose = () => {
        setEditOpen(false);
    };

    if (editOpen) {
        return (<EditRecords open={editOpen} onClose={handleClose} />);
    }

    return (
        <TableRow id={props.id}>
            <TableCell>{props.location_name}</TableCell>
            <TableCell>{props.address_line1} {props.address_line2}</TableCell>
            <TableCell>{props.phone}</TableCell>
            <TableCell><CreateIcon className="button edit_icon" onClick={() => editRecord(props)}>Edit</CreateIcon>&nbsp;<DeleteOutlineIcon className="button delete_icon" onClick={() => deleteRecord(props.location_name)}>Delete</DeleteOutlineIcon></TableCell>
        </TableRow>
        );
}

export default Records;