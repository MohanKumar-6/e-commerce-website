import { DataGrid } from '@mui/x-data-grid';
import "./UserList.css"
import { DeleteOutline } from '@mui/icons-material';
import {userRows} from '../../../dummydata';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const UserList = () => {

    const [data, setData] = useState(userRows)

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    }


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'user', headerName: 'User', width: 130, renderCell: (params) =>{
            return( 
                <div className="userListUser">
                    <img className="UserImage" src={params.row.avatar} alt="" />
                    {params.row.username}
                </div>
            )
        } },
        { field: 'email', headerName: 'email', width: 130 },
        { field: 'status', headerName: 'Status', width: 130 },
        { field: 'transaction', headerName: 'Transaction', width: 130 },
        { field: 'actions', hearderName: 'Action', width: 150, renderCell: (params)=>{
            return(
                <div className="userListAction">
                    <Link to={"/user/"+ params.row.id}>
                        <button className="userListEdit">Edit</button>
                    </Link>
                    <DeleteOutline className="userListDelete" onClick={()=>handleDelete(params.row.id)}/>
                </div>
            )
        }}
    ];


    
    const paginationModel = { page: 0, pageSize: 8 };




    return <div className="userlist">
        <DataGrid
        disableRowSelectionOnClick
        rows={data}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </div>
}

export default UserList;