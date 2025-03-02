import axios from "axios";
import {useState} from "react"
import "./NewProduct.css"   
import { userRequest } from "../../requestMethods";

const NewProduct = () => {
    const [inputs, setInputs] = useState({details: {}})
    const [file, setFile] = useState(null)
    const [categories, setCategories] = useState([])
    const [size, setSize] = useState([])
    const [color, setColor] = useState([])

    const handleChange = (e) => {

        setInputs(prev => {
            if(["fit", "sleeveLength", "collar", "pattern", "occasion", "materialAndCare"].includes(e.target.name)){
                return{
                    ...prev,
                    details:{
                        ...prev.details,
                        [e.target.name]: e.target.value
                    }
                } 
            }
            return{...prev, [e.target.name]: e.target.value}
        })
    }

    const handleCategories = (e) => {
        setCategories(e.target.value.split(","))
    }

    const handleSize = (e) => {
        setSize(e.target.value.split(","))
    }

    const handleColor = (e) => {
        setColor(e.target.value.split(","))
    }

    async function uploadToCloudinary(file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default"); // Set in Cloudinary settings
    
        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/due8vzqzt/image/upload",
                formData, 
                { headers: { "Content-Type": "multipart/form-data" } } // Important for file upload
            );
    
            return response.data.secure_url; // Get uploaded image URL
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }

    }       

    const handleClick = async (e) => {
        e.preventDefault()
        if (!file) {
            console.log("No file selected");
            return;
        }
        console.log(file)
        const imgLink = await uploadToCloudinary(file);
        const product = {...inputs, img: imgLink, categories:categories, size: size, color: color}

        try{
            const response = await userRequest.post("products", product)
            console.log("Product Added:", response.data)
        }catch(error){
            console.error("Error adding product:", error.resonse?.data || error.message)
        }


    }
    
    return(
        <div className="newProduct">
            <h1 className="addProductTitle">New Product</h1>
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Image</label>
                    <input type="file" id="file" onChange={e => setFile(e.target.files[0])}></input>
                </div>
                <div className="addProductItem">
                    <label>Title</label>
                    <input name="title" type="text" placeholder="Tshirt" onChange={handleChange}></input>
                </div>
                <div className="addProductItem">
                    <label>Gender</label>
                    <select name="gender" onChange={handleChange} required>
                        <option value="">--Select--</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Boys">Boys</option>
                        <option value="Girls">Girls</option>
                        <option value="Unisex">Unisex</option>
                    </select>
                </div>
                <div className="addProductItem">
                    <label>Description</label>
                    <input name="desc" type="text" placeholder="Description.. " onChange={handleChange}></input>
                </div>
                <div className="details">
                    <label>Details</label>
                    <label>Fit</label>
                    <input name="fit" type="text" placeholder="Regular" onChange={handleChange}></input>
                    <label>Material & Care</label>
                    <input name="materialAndCare" type="text" placeholder="Polyester" onChange={handleChange}></input>
                    <label>Sleeve Length</label>
                    <input name="sleeveLength" type="text" placeholder="Half sleeves" onChange={handleChange}></input>
                    <label>Collar</label>
                    <input name="collar" type="text" placeholder="mandarin" onChange={handleChange}></input>
                    <label>Patterns</label>
                    <input name="pattern" type="text" placeholder="checks" onChange={handleChange}></input>
                    <label>Occasion</label>
                    <input name="occasion" type="text" placeholder="Casual" onChange={handleChange}></input>
                </div>
                <div className="addProductItem">
                    <label>Price</label>
                    <input name="price" type="number" placeholder="199" onChange={handleChange}></input>
                </div>
                <div className="addProductItem">
                    <label>Categories</label>
                    <input name="categories" type="text" placeholder="Jeans, Skirts" onChange={handleCategories}></input>
                </div>
                <div className="addProductItem">
                    <label>Size</label>
                    <input name="size" type="text" placeholder="XL,XXL,XXXL,L,M,S" onChange={handleSize}></input>
                </div>
                <div className="addProductItem">
                    <label>Colour</label>
                    <input name="color" type="text" placeholder="Blue,Olive green" onChange={handleColor}></input>
                </div>
                <div className="addProductItem">
                    <label>Stock</label>
                    <input name="stock" type="number" placeholder="24" onChange={handleChange}></input>
                </div>
                <button className="addProductButton" onClick={handleClick}>Create</button>
            </form>
        </div>
    )
}

export default NewProduct;