import React, { useState, useEffect } from 'react';
import debug from ** PROPRIETARY FILE **;
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import './pollster.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Swal from 'sweetalert2';
import formSchema from './pollsterSchema';
import { addPollster } from '../../services/pollstersService';
import PropTypes from 'prop-types';
import votoMX from '../../../src/assets/images/mexico-flag-male-hand-voting-with-mexico-flag-concept-idea-background-free-vector.jpg';

const PollsterModalAdd = ({ onGetPollsters, setOpen, props }) => {
    const _logger = debug.extend('PollsterModalAdd');
    _logger('!RUNNING!');
    useEffect(() => {
        document.addEventListener('keydown', handleEscapeKey);
        return () => document.removeEventListener('keydown', handleEscapeKey);
    }, []);

    const [initalFormValues] = useState({ name: '', logoUrl: '', siteUrl: '', location: '' });

    function close() {
        setOpen(false);
    }

    const submitForm = (values) => {
        const _logger = debug.extend('ModalWindow');
        Swal.fire({
            title: 'Add This New Pollster Record?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Add New Record',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Excellente!', 'A New Pollster Record Was Added.', 'success');
                addPollster(values).then(onAddPollsterSuccess).catch(onAddPollsterError);
            }
        });
        const onAddPollsterSuccess = () => {
            onGetPollsters();
            close();
        };
        const onAddPollsterError = (err) => {
            _logger(err);
        };
        _logger('Payload: ', values);
    };
    function handleEscapeKey(event) {
        if (event.code === 'Escape') {
            setOpen(false);
        }
    }
    return ReactDOM.createPortal(
        <React.Fragment>
            <div className="modal-shadow" onClick={close} />
            <div className="modal background-color">
                <div className="modal-banner"> {props.id}</div>
                <div className="modal-middle">
                    <Formik initialValues={initalFormValues} validationSchema={formSchema} onSubmit={submitForm}>
                        <Form>
                            <div className="form-group">
                                <img className="ms-3" src={votoMX} height="100px" alt="Voto Mexico!" />

                                <div className="row col-3 mx-auto my-2" style={{ width: '500px' }}>
                                    <label
                                        htmlFor="name"
                                        style={{
                                            textAlign: 'left',
                                        }}>
                                        Pollster
                                    </label>
                                    <Field
                                        name={'name'}
                                        placeholder="Enter Name"
                                        className="col fields"
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
                                        Logo URL
                                    </label>
                                    <Field
                                        name={'logoUrl'}
                                        placeholder="Enter Logo URL"
                                        className="col fields"
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
                                        Website URL
                                    </label>
                                    <Field
                                        name={'siteUrl'}
                                        placeholder="Enter Website URL"
                                        className="col fields"
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
                                        placeholder="Enter Location"
                                        className="col fields"
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
                                    <Button type submit className="btn btn-success mb-2 mx-2 shadow-success">
                                        Add
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

export const PollsterAddContainer = ({ onGetPollsters, ...props }) => {
    const _logger = debug.extend('PollsterModal');
    const [open, setOpen] = React.useState(false);
    _logger(props, 'modal is running!');

    return (
        <>
            {open && <PollsterModalAdd props={props} onGetPollsters={onGetPollsters} setOpen={setOpen} />}
            <Button
                className="btn btn-warning mb-2 mx-2 mdi mdi-plus-circle me-2"
                type="button"
                onClick={() => {
                    setOpen(true);
                }}>
                <i className="mdi me-2"></i>
                Add Pollster
            </Button>
        </>
    );
};
PollsterAddContainer.propTypes = {
    onGetPollsters: PropTypes.isRequired,
};
