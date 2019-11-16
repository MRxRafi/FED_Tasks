import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import { SnackbarContent, Button } from '@material-ui/core';


const CustomerList = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [customers, setCustomers] = useState([]);

    const url = 'https://customerrest.herokuapp.com/';

    //SNACKBAR
    const handleClose = () => {
        setOpen(false);
    }

    //BACKEND
    const getCustomers = () => {
        fetch(url + 'api/customers/')
        .then(response => response.json())
        .then(data => setCustomers(data.content));
    }

    const addCustomer = (newCustomer) => {
        fetch(url + 'api/customers/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newCustomer)
        })
        .then(response => {
            setMessage('Customer added successfully.');
            setOpen(true);
        })
        .then(res => getCustomers())
        .catch(err => console.error(err))
    };

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            setMessage('Customer updated successfully.');
            setOpen(true);
        })
        .then(res => getCustomers())
        .catch(err => console.error(err))
    };

    const deleteCustomer = (link) => {
        //Cambiar window.confirm por algo más bonito
        if(window.confirm('Are you sure you want to delete this customer?')){
            console.log(link);
            fetch(link, {method: 'DELETE'})
            .then(response => getCustomers())
            .then(response => {
                setMessage('Customer deleted successfully.');
                setOpen(true);
            })
            .catch((err) => console.error(err))
        }
    };

    //TABLE COLUMNS
    const columns = [
        {
            Header: 'ID',
            accessor: 'links[0].href',
            width: 40,
            Cell: ({value}) => value.replace( /^\D+/g, '')
        },
        {
            Header: 'FirstName',
            accessor: 'firstname'
        },
        {
            Header: 'LastName',
            accessor: 'lastname'
        },
        {
            Header: 'StreetAddress',
            accessor: 'streetaddress'
        },
        {
            Header: 'PostCode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <EditCustomer updateCustomer={updateCustomer} customer={row.original}/>
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'links[0].href',
            Cell: ({value}) => <Button size='small' color='secondary' onClick={() => deleteCustomer(value)}>Delete</Button>
        }
    ]

    useEffect(() => {getCustomers();}, []);

    return(
        <div>
            <Grid container style={{margin: 15}}>
                <Grid item>
                    <AddCustomer saveCustomer={addCustomer}/>
                </Grid>
            </Grid>

            <ReactTable filterable={true} data={customers} columns={columns}/>

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

export default CustomerList;