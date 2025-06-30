import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods"; // Axios instance
import Product from "../components/Product"; // Your product card component

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q")?.toLowerCase() || "";
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await publicRequest.get("/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredResults = products.filter((p) =>
      p.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
    setFiltered(filteredResults);
  }, [query, products]);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Search Results for "{query}"</h2>
      {filtered.length ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {filtered.map((product) => (
            <Product key={product._id} item={product} />
          ))}
        </div>
      ) : (
        <p>No matching products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
