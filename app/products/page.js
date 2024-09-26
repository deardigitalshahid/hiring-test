"use client";
import { useEffect, useState } from "react";
import classes from "./page.module.css";
import ProductCard from "@/components/ProductCard";
import Wishlist from "@/components/Wishlist";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);

    // Toggle wishlist for a product
    const toggleWishlist = (productId) => {
        setWishlist((prevWishlist) =>
            prevWishlist.includes(productId)
                ? prevWishlist.filter((id) => id !== productId)
                : [...prevWishlist, productId]
        );
    };

    // Toggle the wishlist panel visibility
    const toggleWishlistPanel = () => {
        setIsWishlistOpen(!isWishlistOpen);
    };

    useEffect(() => {
        async function fetchData() {
            let data = await fetch("https://hiring-workspace.vercel.app/api/v1/furniture");
            data = await data.json();
            console.log(data);
            setProducts(data);
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>Our Products</h1>
            <div className={classes.product_list}>
                {products.map((product) => (
                    <ProductCard 
                        product={product} 
                        key={product.id} 
                        wishlist={wishlist}
                        toggleWishlist={toggleWishlist} 
                    />
                ))}
            </div>

            {/* Wishlist Panel */}
            <Wishlist
                wishlist={wishlist}
                products={products}
                toggleWishlist={toggleWishlist}
                isWishlistOpen={isWishlistOpen}
                toggleWishlistPanel={toggleWishlistPanel}
            />
        </div>
    );
}
