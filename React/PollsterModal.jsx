import React from 'react';
import debug from **proprietary**
import ReactDOM from 'react-dom';

const PollsterModal = ({ props, setOpen }) => {
    //const PollsterModal = ({ setOpen }) => {
    const _logger = debug.extend('ModalWindow');

    const [modalData, setLocalData] = React.useState();
    //const [modalData] = React.useState();

    function onModalFieldChange(e) {
        const target = e.target;
        const fieldValue = target.value;
        const fieldName = target.name;

        setLocalData((prevState) => {
            const updatedFormObj = { ...prevState };
            updatedFormObj[fieldName] = fieldValue;
            return updatedFormObj;
        });
    }

    function close() {
        setOpen(false);
    }

    function submit() {
        _logger('Modal button submit!');
    }

    _logger('modalData: ', modalData);

    return ReactDOM.createPortal(
        <React.Fragment>
            <div className="modal-shadow" onClick={close} />
            <div className="modal">
                <div className="modal-banner">Edit modal page {props.id}</div>
                {/* <div className="modal-banner">Edit modal page</div> */}
                <div className="modal-middle">
                    Modal middle
                    <h6>
                        <input
                            className="modal-input-box"
                            type="number"
                            placeholder="Id"
                            defaultValue=""
                            name="id"
                            value={modalData.id}
                            onChange={onModalFieldChange}
                        />
                    </h6>
                    <h6>
                        <input
                            className="modal-input-box"
                            type="text"
                            placeholder="Name"
                            defaultValue=""
                            name="name"
                            value={modalData.name}
                            onChange={onModalFieldChange}
                        />
                    </h6>
                    <h6>
                        <input
                            className="modal-input-box"
                            type="text"
                            placeholder="Logo URL"
                            defaultValue=""
                            name="logoUrl"
                            value={modalData.logoUrl}
                            onChange={onModalFieldChange}
                        />
                    </h6>
                    <h6>
                        <input
                            className="modal-input-box"
                            type="text"
                            placeholder="Site URL"
                            defaultValue=""
                            name="siteUrl"
                            value={modalData.siteUrl}
                            onChange={onModalFieldChange}
                        />
                    </h6>
                    <h6>
                        <input
                            className="modal-input-box"
                            type="text"
                            placeholder="Location"
                            defaultValue=""
                            name="location"
                            value={modalData.location}
                            onChange={onModalFieldChange}
                        />
                    </h6>
                </div>
            </div>
            <div className="modal-lower">
                <button className="modal-submit-button" onClick={submit}>
                    Submit
                </button>
                &nbsp;&nbsp;&nbsp;
                <button className="modal-cancel-button" onClick={close}>
                    Cancel
                </button>
            </div>
        </React.Fragment>,
        document.getElementById('modal-window-id')
    );
};

export const PollsterContainer = ({ ...props }) => {
    //export const PollsterContainer = () => {
    const _logger = debug.extend('PollsterModal');
    _logger('modal is running! ');

    const [open, setOpen] = React.useState(false);

    return (
        <>
            {open && <PollsterModal props={props} setOpen={setOpen} />}
            {/* {open && <PollsterModal setOpen={setOpen} />} */}
            <button
                className="modal-edit-button"
                type="button"
                onClick={() => {
                    setOpen(true);
                }}>
                OpenModal
            </button>
        </>
    );
};
