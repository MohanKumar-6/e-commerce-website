import './productList.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {getProducts, deleteProducts} from "../../redux/apiCalls"
import { useSelector } from 'react-redux';


const ProductList = () => {
    const products = useSelector((state) => state.product.products)
    console.log(products)

    const dispatch = useDispatch()

    useEffect(()=>{
        getProducts(dispatch)
    },[dispatch])

    const handleDelete = (id) => {
        deleteProducts(dispatch, id)
    };

    const columns = [
        { field: '_id', headerName: 'ID', width: 220 },
        { field: 'product', headerName: 'Product', width: 250, renderCell: (params) =>{
            return( 
                <div className="productListItem">
                    <img className="productListImg" src={params.row.img} alt="" />
                    {params.row.title}
                </div>
            )
        } },
        { field: 'inStock', headerName: 'Stock', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        { field: 'actions', hearderName: 'Action', width: 150, renderCell: (params)=>{
            return(
                <div className="userListAction">
                    <Link to={"/product/"+ params.row._id}>
                        <button className="productListEdit">Edit</button>
                    </Link>
                    <DeleteOutline className="productListDelete" onClick={()=>handleDelete(params.row._id)}/>
                </div>
            )
        }}
    ];

    const paginationModel = { page: 0, pageSize: 8 };

    return (
        <div className='productList'>
            <DataGrid
                disableRowSelectionOnClick
                rows={products}
                columns={columns}
                getRowId = {(row) => row._id}
                initialState={{ pagination: { paginationModel } }}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </div>
    )
}

export default ProductList;