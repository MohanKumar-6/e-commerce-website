import axios from "axios";
import {useState} from "react"
import "./NewProduct.css"   

const NewProduct = () => {
    const [inputs, setInputs] = useState({})
    const [file, setFile] = useState(null)
    const [categories, setCategories] = useState([])

    const handleChange = (e) => {
        setInputs(prev => {
            return{...prev, [e.target.name]: e.target.value}
        })
    }

    const handleCategories = (e) => {
        setCategories(e.target.value.split(","))
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
        const product = {...inputs,...categories, imgLink}
        console.log("product :", product)
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
                    <label>Description</label>
                    <input name="description" type="text" placeholder="Description.. " onChange={handleChange}></input>
                </div>
                <div className="addProductItem">
                    <label>Price</label>
                    <input name="price" type="number" placeholder="199" onChange={handleChange}></input>
                </div>
                <div className="addProductItem">
                    <label>Categories</label>
                    <input type="categories" placeholder="Jeans, Skirts" onChange={handleCategories}></input>
                </div>
                <div className="addProductItem">
                    <label>Stock</label>
                    <select name="inStock" onChange={handleChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <button className="addProductButton" onClick={handleClick}>Create</button>
            </form>
        </div>
    )
}

export default NewProduct;