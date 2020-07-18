import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Pagination from '@material-ui/lab/Pagination';
import {getAllUsers} from "../../actions";
import UserItem from "./UserItem";

//material ui components
import { List } from "@material-ui/core";

const UsersList = () => {
    const {users, loading} = useSelector(state => state.crud);
    const dispatch = useDispatch();
    const [paginationData, setPaginationData] = useState({
        currentPage: 1,
        totalItems: 0,
        totalPages: 0,
        perPage: 5
    });
    const indexOfLastUser = paginationData.currentPage * paginationData.perPage;
    const indexOfFirstUser = indexOfLastUser - paginationData.perPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const handleChangePagination = (event, value) => {
        setPaginationData({...paginationData, currentPage: +value});
    }

    useEffect(() => {
        dispatch(getAllUsers())
    }, []);

    useEffect(() => {
        setPaginationData({...paginationData, totalItems: users.length, totalPages: Math.ceil(users.length / 5)})
    }, [users]);

    if(loading){
        return <div>ТУТ будет какой-то очень крутой спиннер</div>
    }

    return (
        <>

            <List>
                {currentUsers.map(item => (
                        <UserItem item={item} key={item.id}/>
                ))}
            </List>
            <Pagination
                count={paginationData.totalPages}
                page={paginationData.currentPage}
                onChange={handleChangePagination}
                style={{display:"flex", justifyContent: "center", alignItems: "center"}}
            />
        </>
    );
};

export default UsersList;