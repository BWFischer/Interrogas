import React, { useState, useEffect } from 'react';
import logger from 'sabio-debug';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import * as pollsterService from '../../services/pollstersService';
import { deletePollster } from '../../services/pollstersService';
import PageTitle from './PollstersTitle';
import Table from './PollstersTable';
import './pollster.css';
import { PollsterUpdateContainer } from './PollsterModalUpdate';
import { PollsterAddContainer } from './PollsterModalAdd';
import 'toastr/build/toastr.css';
import Swal from 'sweetalert2';
import { CSVLink } from 'react-csv';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const _logger = logger.extend('Pollsters ');

const NameColumn = (props) => {
    return (
        <div className="table-user tableText20">
            <Link to="#" className="text-body fw-semibold">
                {props.row.original.name}
            </Link>
        </div>
    );
};

NameColumn.propTypes = {
    row: PropTypes.shape({
        original: PropTypes.shape({
            name: PropTypes.string,
        }),
    }),
};

const LocationColumn = (props) => {
    return <div className="table-user tableText20">{props.row.original.location}</div>;
};

LocationColumn.propTypes = {
    row: PropTypes.shape({
        original: PropTypes.shape({
            location: PropTypes.string.isRequired,
        }),
    }),
};

const Pollsters = () => {
    const [pollsterData, setPollsterData] = useState([]);

    useEffect(() => {
        _logger('useEffect');
        onGetPollsters();
    }, []);

    function onGetPollsters() {
        return pollsterService.getPPollsters(0, 100).then(onGetPollsterSuccess).catch(onGetPollstersError);
    }

    const onDeleteKey = (e) => {
        _logger('raw values', e);

        Swal.fire({
            title: 'Are you sure you wish to Delete this Pollster Record?',
            text: 'This Action Will Permamnently Delete This Record',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm Delete',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Deleted!', 'Pollster Record Deleted.', 'success');
                deletePollster(targetId).then(onDeletePollsterSuccess).catch(onDeletePollsterError);
            }
        });

        let targetId = e.target.parentElement.previousElementSibling;
        for (let i = 0; i < 4; i++) {
            targetId = targetId.previousElementSibling;
        }
        targetId = targetId.innerText;
        _logger('this is the value of the id to be deleted!', targetId);

        const onDeletePollsterSuccess = (succ) => {
            _logger(succ);

            onGetPollsters();
        };

        const onDeletePollsterError = (err) => {
            _logger(err);
        };
    };

    const ActionColumn = (props) => {
        return (
            <>
                <PollsterUpdateContainer props={props} onGetPollsters={onGetPollsters} />
                <Button className="btn btn-danger " onClick={onDeleteKey}>
                    <i className="mdi mdi-minus-circle me-2"></i>
                    Delete
                </Button>
            </>
        );
    };

    const columns = [
        {
            Header: 'Id',
            accessor: 'id',
            sort: true,
            classes: 'table-user',
        },
        {
            Header: 'Pollster',
            accessor: 'name',
            sort: true,
            Cell: NameColumn,

            classes: 'table-user',
        },
        {
            Header: 'Logo',
            accessor: 'logoUrl',
            sort: true,
            Cell: (tableProps) => <img src={tableProps.row.original.logoUrl} height={75} alt="Logo URL" />,
        },
        {
            Header: 'Website',
            filterable: false,
            accessor: 'siteUrl',
            sort: true,

            Cell: (e, tableProps, placement) => (
                <OverlayTrigger
                    trigger="hover"
                    key={placement}
                    placement={placement}
                    overlay={
                        <Popover id={`popover-positioned-${placement}`}>
                            {/* Pop-over becomes unstable when calling separate .css file */}
                            <Popover.Body style={{ color: 'rgb(255,255,255)' }}>
                                <a>
                                    {' '}
                                    {e.value}
                                    {tableProps.row} {placement}
                                </a>
                            </Popover.Body>
                        </Popover>
                    }>
                    <Button href={e.value} className="btn btn-info" target="_blank" rel="noreferrer">
                        <i className="mdi mdi-arrow-right-bold-circle me-2"></i>Website
                    </Button>
                </OverlayTrigger>
            ),
        },

        {
            Header: 'Location',
            accessor: 'location',
            sort: true,
            classes: 'tableText12',
            Cell: LocationColumn,
        },
        {
            Header: 'Action',
            accessor: 'action',
            sort: false,
            classes: 'table-action',
            Cell: ActionColumn,
        },
    ];

    const sizePerPageList = [
        {
            text: '10',
            value: 10,
        },
        {
            text: '25',
            value: 25,
        },
        {
            text: '50',
            value: 50,
        },
    ];

    const onGetPollsterSuccess = (response) => {
        _logger('onGetPollsterSuccess', response);
        const pollGet = response.item.pagedItems;

        setPollsterData(pollGet);
    };
    const onGetPollstersError = (err) => {
        _logger('onGetPollsterError', err);
    };

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
        data: pollsterData,
    };

    return (
        <React.Fragment>
            <div id="modal-window-id" />​
            <PageTitle
                breadCrumbItems={[
                    { label: 'Pollsters', path: '/pollsters' },
                    {
                        label: 'Pollsters',
                        path: '/components/pollsters/',
                        active: true,
                    },
                ]}
                title={'Interrogas Pollsters'}
            />
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col sm={5}>
                                    <PollsterAddContainer onGetPollsters={onGetPollsters} />
                                </Col>

                                <Col sm={7}>
                                    <div className="text-sm-end">
                                        <Link to="/filemanager">
                                            <Button className="btn btn-light  mb-2 me-2 ">
                                                <i className="mdi mdi-cloud-upload me-2"></i>
                                                Import Pollsters File
                                            </Button>
                                        </Link>

                                        <CSVLink {...csvReportPollsters}>
                                            <Button className="btn btn-light mb-2 me-2">
                                                <i className="mdi mdi-cloud-download me-2"></i>
                                                Export Pollsters File
                                            </Button>
                                        </CSVLink>
                                    </div>
                                </Col>
                            </Row>

                            <Table
                                columns={columns}
                                data={pollsterData}
                                pageSize={10}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSelectable={true}
                                isSearchable={true}
                                tableClass="table-striped"
                                searchBoxClass="mt-2 mb-3"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

Pollsters.defaultProps = {
    pollsters: '',
};
Pollsters.propTypes = {
    pollsters: PropTypes.string.isRequired,
};

export default Pollsters;
