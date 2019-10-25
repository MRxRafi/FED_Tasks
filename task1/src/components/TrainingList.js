import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';

const TrainingList = () => {
    const [trainings, setTrainings] = useState([]);

    const url = 'https://customerrest.herokuapp.com/';

    //BACKEND
    const getTrainings = () => {
        fetch(url + 'gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data));
    }

    //TABLE COLUMNS
    const columns = [
        {
            Header: 'Id',
            accessor: 'id'
        },
        {
            Header: 'Date',
            accessor: 'date',
            Cell: row => moment().subtract(row.original.date, 'milliseconds').calendar()
        },
        {
            Header: 'Duration',
            accessor: 'duration'
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
    ]

    useEffect(() => {getTrainings();}, []);

    return(
        <div>
            <ReactTable filterable={true} data={trainings} columns={columns}/>
        </div>
    );
}

export default TrainingList;