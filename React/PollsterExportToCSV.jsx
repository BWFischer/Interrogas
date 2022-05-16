import React from 'react';
import { CSVLink } from 'react-csv';
import data from './data.json';

const current = new Date();
const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;

const polsterData = data;
const headers = [
    { id: 'id', key: 'id' },
    { id: 'name', key: 'name' },
    { id: 'logoUrl', key: 'logoUrl' },
    { id: 'siteUrl', key: 'siteUrl' },
    { id: 'location', key: 'location' },
];

const csvReportPollsters = {
    filename: 'PollstersReport.csv',
    headers: headers,
    data: polsterData,
};

function PollsterExportToCSV() {
    return (
        <React.Fragment>
            <div>
                <h1>Welcome the Pollster Data Export Page</h1>
                <h1>Data is current as of {date}</h1>
            </div>
            <div className="PollsterExportToCSV">
                <CSVLink style={{ fontSize: 50, color: 'red' }} {...csvReportPollsters}>
                    Click Here to Export/Download the Current Pollster Data to CSV a CSV File.
                </CSVLink>
            </div>
        </React.Fragment>
    );
}
export default PollsterExportToCSV;
