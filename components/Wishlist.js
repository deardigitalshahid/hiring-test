import React from "react";
import classes from "./Wishlist.module.css";
import Image from "next/image";
import heartImg from "@/public/images/wishlist.png"

// Function to format the price with thousand separators and Euro sign
const formatPrice = (price) => {
    const formattedPrice = new Intl.NumberFormat('de-DE', {
        maximumFractionDigits: 2
    }).format(price);
    return `€${formattedPrice}`;
};

export default function Wishlist({ wishlist, products, toggleWishlist, isWishlistOpen, toggleWishlistPanel }) {
    // Get the wishlist products from the product list
    const wishlistItems = products.filter(product => wishlist.includes(product.id));

    return (
        <div className={`${classes.wishlist} ${isWishlistOpen ? classes.open : classes.closed}`}>
            {/* Wishlist Header */}
            <div className={classes.wishlistHeader} onClick={toggleWishlistPanel}>
                <div style={{ display:"flex",gap:"5px",alignItems:"center" }}>
                    <span>Knoll</span>
                    <span className={classes.wishlistCount}>{wishlist.length}</span>
                </div>
                <span className={classes.wishlistIcon}><Image src={heartImg} alt="wishlist button" width={20} height={20} /></span>
            </div>

            {/* Wishlist Items */}
            {isWishlistOpen && (
                <div className={classes.wishlistItems}>
                    {wishlistItems.map((item) => (
                        <div className={classes.wishlistItem} key={item.id}>
                            <Image src={"https://hiring-workspace.vercel.app/" + item.variants[0].image} alt={item.title} width={50} height={50} />
                            <div className={classes.wishlistInfo}>
                                <span>{item.title}</span>
                                <span>{formatPrice(item.variants[0].reducedPrice || item.variants[0].price)}</span>
                            </div>
                            <button
                                className={classes.removeButton}
                                onClick={() => toggleWishlist(item.id)}
                            >
                                🗑️
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
