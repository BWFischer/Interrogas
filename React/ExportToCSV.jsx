import React, { useState, useEffect } from 'react';
import logger from 'sabio-debug';
import * as pollsterService from '../../services/pollstersService';
import { Button } from 'react-bootstrap';
import './pollster.css';
import { CSVLink } from 'react-csv';

const _logger = logger.extend('ExportCSV ');
const ExportCSV = () => {
    const fileName = 'users-detail';
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);

    const headers = [
        { label: 'Id', key: 'id' },
        { label: 'Name', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Phone', key: 'phone' },
    ];

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = () => {
        setLoading(true);
        pollsterService.getPPollsters(0, 100).then(onGetgetUserDataSuccess).catch(onGetgetUserDataError);
    };

    const onGetgetUserDataSuccess = (response, res) => {
        _logger('onGetgetUserDataSuccess', response);
        setUserData(res.data);
        setLoading(false);
    };

    const onGetgetUserDataError = (err) => {
        _logger('onGetgetUserDataError', err);
        setLoading(false);
    };

    return (
        <div className="container">
            <Button variant="contained" color="primary" className="export-btn">
                <CSVLink
                    headers={headers}
                    data={userData}
                    filename={fileName}
                    style={{ textDecoration: 'none', color: '#fff' }}>
                    {loading ? 'Loading csv...' : 'Export Data'}
                </CSVLink>
            </Button>
        </div>
    );
};

export default ExportCSV;
