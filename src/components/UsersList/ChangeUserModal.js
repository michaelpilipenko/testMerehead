import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from "react-redux";
import {changeUserInfo} from "../../actions";

//material ui components
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@material-ui/core';

const ChangeUserModal = ({user, open, onClose}) => {
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
        name: user.name,
        surname: user.surname,
        desc: user.desc
    })

    const handleChange = e => {
        const { name, value } = e.target;
        userInfo[name] = value;
        setUserInfo({...userInfo});
    };

    const handleSubmit = e => {
        e.preventDefault();
        const { id } = user;
        dispatch(changeUserInfo({...userInfo, id}))
    };

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="form-dialog-title">Edit user info</DialogTitle>
                    <DialogContent style={{display:"flex", justifyContent:"center", alignItems:"center", flexFlow: "column wrap"}}>
                        <TextField
                            variant="outlined"
                            value={userInfo.name}
                            onChange={handleChange}
                            autoFocus
                            margin="dense"
                            name="name"
                            label="Name"
                            type="text"
                        />
                        <TextField
                            variant="outlined"
                            value={userInfo.surname}
                            onChange={handleChange}
                            margin="dense"
                            name="surname"
                            label="Surname"
                            type="text"
                        />
                        <TextField
                            variant="outlined"
                            value={userInfo.desc}
                            onChange={handleChange}
                            margin="dense"
                            name="desc"
                            label="Desc"
                            type="text"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" color="primary">Accept</Button>
                        <Button onClick={onClose} color="secondary">Cancel</Button>
                    </DialogActions>
                </form>
            </Dialog>

        </>

    );
};

ChangeUserModal.propTypes = {
    user: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ChangeUserModal;