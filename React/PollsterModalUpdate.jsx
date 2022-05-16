import React, { useState, useEffect } from 'react';
import debug from 'sabio-debug';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import './pollster.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Swal from 'sweetalert2';
import formSchema from './pollsterSchema';
import PropTypes from 'prop-types';
import { updatePollster } from '../../services/pollstersService';
const PollsterModalUpdate = ({ onGetPollsters, setOpen, props }) => {
    const _logger = debug.extend('PollsterModalUpdate');
    _logger('!RUNNING!');
    useEffect(() => {
        document.addEventListener('keydown', handleEscapeKey);
        return () => document.removeEventListener('keydown', handleEscapeKey);
    }, []);
    const aProps = props.props.row.values;
    const [modalData] = React.useState();
    const [initalFormValues] = useState({
        id: aProps.id,
        name: aProps.name,
        logoUrl: aProps.logoUrl,
        siteUrl: aProps.siteUrl,
        location: aProps.location,
    });
    function close() {
        setOpen(false);
    }
    const submitForm = (values) => {
        const _logger = debug.extend('ModalWindow');
        Swal.fire({
            title: 'Update This Pollster Record?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update Record',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Excellente!', 'Pollster Record Was Modified.', 'success');
                updatePollster(values).then(onUpdatePollsterSuccess).catch(onUpdatePollsterError);
            }
        });
        const onUpdatePollsterSuccess = () => {
            onGetPollsters();
            close();
        };
        const onUpdatePollsterError = (data) => {
            _logger(data);
        };
    };
    function handleEscapeKey(event) {
        if (event.code === 'Escape') {
            setOpen(false);
        }
    }
    _logger('modalData: ', modalData);
    _logger('PROPS: ', props);
    return ReactDOM.createPortal(
        <React.Fragment>
            <div className="modal-shadow" onClick={close} />
            <div className="modal background-color">
                <div className="modal-banner"> {props.id}</div>
                <div className="modal-middle">
                    <Formik
                        initialValues={initalFormValues}
                        enableReinitialize={true}
                        validationSchema={formSchema}
                        onSubmit={submitForm}>
                        <Form>
                            <div className="form-group">
                                <h4 className="text-center">
                                    {aProps.name} - {aProps.location}
                                </h4>

                                <img className="ms-3" src={aProps.logoUrl} height="75" alt="Voto Mexico!" />

                                <div className="row col-3 mx-auto my-2" style={{ width: '500px' }}>
                                    <label
                                        htmlFor="name"
                                        style={{
                                            textAlign: 'left',
                                        }}>
                                        Id
                                    </label>
                                    <Field
                                        name={'id'}
                                        className="col fields"
                                        placeholder="Enter Id"
                                        display="inline-block"
                                    />

                                    <ErrorMessage
                                        name={'id'}
                                        component="div"
                                        className="mx-3"
                                        style={{ color: 'red' }}
                                        display="inline-block"
                                    />
                                </div>
                                <div className="row col-3 mx-auto my-2" style={{ width: '500px' }}>
                                    <label
                                        htmlFor="name"
                                        style={{
                                            textAlign: 'left',
                                        }}>
                                        Pollster Name
                                    </label>
                                    <Field
                                        name={'name'}
                                        className="col fields"
                                        placeholder="Enter Name"
                                        display="inline-block"
                                    />

                                    <ErrorMessage
                                        name={'name'}
                                        component="div"
                                        className="mx-3"
                                        style={{ color: 'red' }}
                                        display="inline-block"
                                    />
                                </div>

                                <div className="row col-3 mx-auto my-2" style={{ width: '500px' }}>
                                    <label
                                        htmlFor="logoUrl"
                                        style={{
                                            textAlign: 'left',
                                        }}>
                                        Pollster Logo
                                    </label>
                                    <Field
                                        name={'logoUrl'}
                                        className="col fields"
                                        placeholder="Enter Logo Url"
                                        display="inline-block"
                                    />
                                    <ErrorMessage
                                        name={'logoUrl'}
                                        component="div"
                                        className="mx-3"
                                        style={{ color: 'red' }}
                                        display="inline-block"
                                    />
                                </div>
                                <div className="row col-3 mx-auto my-2" style={{ width: '500px' }}>
                                    <label
                                        htmlFor="siteUrl"
                                        style={{
                                            textAlign: 'left',
                                        }}>
                                        Site Url
                                    </label>
                                    <Field
                                        name={'siteUrl'}
                                        className="col fields"
                                        placeholder="Enter Site Url"
                                        display="inline-block"
                                    />
                                    <ErrorMessage
                                        name={'siteUrl'}
                                        component="div"
                                        className="mx-3"
                                        style={{ color: 'red' }}
                                        display="inline-block"
                                    />
                                </div>
                                <div className="row col-3 mx-auto my-2" style={{ width: '500px' }}>
                                    <label
                                        htmlFor="location"
                                        style={{
                                            textAlign: 'left',
                                        }}>
                                        Location
                                    </label>
                                    <Field
                                        name={'location'}
                                        className="col fields"
                                        placeholder="Enter Location"
                                        display="inline-block"
                                    />
                                    <ErrorMessage
                                        name={'location'}
                                        component="div"
                                        className="mx-3"
                                        style={{ color: 'red' }}
                                        display="inline-block"
                                    />
                                </div>
                                <div className="modal-lower">
                                    <Button type submit className="btn btn-success mx-2 mb-2 shadow-success">
                                        Update
                                    </Button>
                                    &nbsp;&nbsp;&nbsp;
                                    <Button className="modal-cancel-button btn btn-light mb-2 mx-2" onClick={close}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </React.Fragment>,
        document.getElementById('modal-window-id')
    );
};

export const PollsterUpdateContainer = ({ onGetPollsters, ...props }) => {
    const _logger = debug.extend('PollsterModalUpdate');
    const [open, setOpen] = React.useState(false);
    _logger(props, 'modal is running!');
    const onUpdateClick = (e) => {
        _logger('synthetic event', e);
        setOpen(true);
    };
    return (
        <>
            {open && <PollsterModalUpdate props={props} onGetPollsters={onGetPollsters} setOpen={setOpen} />}
            <Button
                className="btn btn-success mx-2 shadow-success mdi mdi-plus-circle me-2  "
                type="button"
                onClick={onUpdateClick}>
                <i className="mdi me-2"></i>
                Update
            </Button>
        </>
    );
};
PollsterUpdateContainer.propTypes = {
    onGetPollsters: PropTypes.isRequired,
};
