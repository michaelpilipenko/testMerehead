import React, {useState} from 'react';
import {createUser} from "../actions";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";

//material ui components
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const CreateUser = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const classes = useStyles();
    const [user, setUser] = useState({
        name: '',
        surname: '',
        desc: ''
    })

    const handleChange = e => {
        const { name, value } = e.target;
        user[name] = value;
        setUser({...user});
    };

    const handleSubmit = e => {
        e.preventDefault();
        if(user.name && user.surname && user.desc){
            dispatch(createUser({...user}));
            alert('successfully created new user')
        } else {
            alert('Заполните все поля')
        }
    }


    return (
        <>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Creating a new user
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        value={user.name}
                        onChange={handleChange}
                        type="text"
                        name="name"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Name"
                        autoFocus
                    />
                    <TextField
                        type="text"
                        value={user.surname}
                        onChange={handleChange}
                        name="surname"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Surname"
                    />
                    <TextField
                        type="text"
                        value={user.desc}
                        onChange={handleChange}
                        name="desc"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Desc"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Ok
                    </Button>
                </form>
            </div>
        </>

    );
};

export default CreateUser;