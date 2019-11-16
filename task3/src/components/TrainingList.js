import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import {Button, SnackbarContent} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green } from '@material-ui/core/colors';

import AddTraining from './AddTraining';

const TrainingList = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [trainings, setTrainings] = useState([]);

    const url = 'https://customerrest.herokuapp.com/';

    //SNACKBAR
    const handleClose = () => {
        setOpen(false);
    }

    //BACKEND
    const getTrainings = () => {
        fetch(url + 'gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data));
    }

    const addTraining = (newTraining) => {
        var oldV = newTraining.customer;
        var oldD = newTraining.date;
        newTraining.customer = 'https://customerrest.herokuapp.com/api/customers/' + oldV;
        //newTraining.date = moment(oldD, "YYYYMMDD").fromNow()[0]
        //console.log(newTraining.date);

        fetch(url + 'api/trainings/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newTraining)
        })
        .then(response => {
            setMessage('Training added successfully.');
            setOpen(true);
        })
        .then(res => getTrainings())
        .catch(err => console.error(err))
    }

    const deleteTraining = (link) => {
        //Cambiar window.confirm por algo más bonito
        if(window.confirm('Are you sure you want to delete this training?')){
            fetch(url + 'api/trainings/'+ link, {method: 'DELETE'})
            .then(response => getTrainings())
            .then(response => {
                setMessage('Training deleted successfully.');
                setOpen(true);
            })
            .catch((err) => console.error(err))
        }
    };

    //TABLE COLUMNS
    const columns = [
        {
            Header: 'Id',
            accessor: 'id',
            width: 40
        },
        {
            Header: 'Date',
            accessor: 'date',
            Cell: row => moment(row.original.date).calendar()
        },
        {
            Header: 'Duration',
            accessor: 'duration',
            width: 100
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            Header: 'Customer name',
            accessor: 'customer.firstname'
        },
        {
            Header: 'Customer last name',
            accessor: 'customer.lastname'
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'id',
            Cell: ({value}) => <Button size='small' color='secondary' onClick={() => deleteTraining(value)}>Delete</Button>
        }
    ]

    useEffect(() => {getTrainings();}, []);

    return(
        <div>
            <Grid container style={{margin: 15}}>
                <Grid item>
                    <AddTraining saveTraining={addTraining}/>
                </Grid>
            </Grid>

            <ReactTable filterable={true} data={trainings} columns={columns}/>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={open}
                onClose={handleClose}
                autoHideDuration={4000}
            >
                <SnackbarContent
                    style={{backgroundColor: green[600]}}
                    message={
                        <div style={{display: 'flex', alignItems: "center"}}>
                            <CheckCircleIcon/>
                            {message}
                        </div>
                    }
                />
            </Snackbar>
        </div>
    );
}

export default TrainingList;