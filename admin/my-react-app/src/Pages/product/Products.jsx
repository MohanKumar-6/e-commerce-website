import { Link, useLocation} from 'react-router-dom';
import './products.css'
import Chart from '../../components/Chart/Chart';
import { productData } from '../../../dummydata';
import { Publish } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const Products = () => {
    const location = useLocation()
    const productId = location.pathname.split("/")[2]

    const product = useSelector((state) => state.product.products.find((item) => item._id === productId))



    return(
        <div className="product">
            <div className="productTitleContainer">
                <h1 className='ProductTitle'>Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className='productTop'>
                <div className='productTopLeft'>
                    <Chart data={productData} dataKey="Sales" title="Sales performance" grid/>
                </div>
                <div className='productTopRight'>
                    <div className="productInfoTop">
                        <img src={product.img} alt="" className="productInfoImg"/>
                        <span className='productName'>{product.title}</span>
                    </div>
                    <div className="productInfoBottom"></div>
                        <div className='productInfoItem'>
                            <span className='productInfoKey'>id:</span>
                            <span className='productInfoValue'>{productId}</span>
                        </div>
                        <div className='productInfoItem'>
                            <span className='productInfoKey'>price:</span>
                            <span className='productInfoValue'>{product.price}</span>
                        </div>
                        <div className='productInfoItem'>
                            <span className='productInfoKey'>active:</span>
                            <span className='productInfoValue'>{product.createdAt}</span>
                        </div>
                        <div className='productInfoItem'>
                            <span className='productInfoKey'>in stock:</span>
                            <span className='productInfoValue'>{product.inStock}</span>
                        </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className='productFormLeft'>
                        <label>Product Name</label>
                        <input type="text" placeholder={product.title}/>
                        <label>Product Description</label>
                        <input type="text" placeholder={product.desc}/> 
                        <label>Price</label>
                        <input type="text" placeholder={product.price}/>
                        <label>In Stock</label>
                        <select name="inStock" id="idStock">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        <label>Active</label>
                        <select name="active" id="active">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>  
                        </select>
                    </div>
                    <div className='productFormRight'>
                        <div className="productUpload">
                            <img src={product.img} alt ="" className='productUploadImg' />
                            <label for="file"><Publish/></label>
                        </div>
                        <input type="file" id="file" style={{display: "none"}} />
                        <button className='productButton'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Products;