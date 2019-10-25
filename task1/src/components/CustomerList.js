import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    const url = 'https://customerrest.herokuapp.com/';

    //BACKEND
    const getCustomers = () => {
        fetch(url + 'api/customers/')
        .then(response => response.json())
        .then(data => setCustomers(data.content));
    }

    //TABLE COLUMNS
    const columns = [
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
    ]

    useEffect(() => {getCustomers();}, []);

    return(
        <div>
            <ReactTable filterable={true} data={customers} columns={columns}/>
        </div>
    );
}

export default CustomerList;