import React, {useState} from 'react';
import {deleteUser} from "../../actions";
import PropTypes from 'prop-types';
import {useDispatch} from "react-redux";
import ChangeUserModal from "./ChangeUserModal";

//material items
import {
    Divider,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    IconButton
} from '@material-ui/core';
import {Delete as DeleteIcon, Face as FaceIcon, Edit as EditIcon  } from '@material-ui/icons';

const UserItem = ({item}) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const handleCLickOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleDeleteUser = e => {
        dispatch(deleteUser(item.id))
    };

    return (
        <>
            <ChangeUserModal user={item} open={isOpen} onClose={handleClose}/>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <FaceIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={`${item.name} ${item.surname}`}
                    secondary={item.desc}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={handleCLickOpen}>
                        <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={handleDeleteUser}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />
        </>

    )
};

UserItem.propTypes = {
    item: PropTypes.object.isRequired
}

export default UserItem;