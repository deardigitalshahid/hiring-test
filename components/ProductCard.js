"use client";
import { useState } from "react";
import classes from "./ProductCard.module.css";
import Image from "next/image";
import heartImg from "@/public/images/wishlist.png"

// Function to format the price with thousand separators and Euro sign
const formatPrice = (price) => {
    // Format number with thousand separators and two decimal places
    const formattedPrice = new Intl.NumberFormat('de-DE', {
        maximumFractionDigits: 2
    }).format(price);

    // Return price with Euro sign at the beginning
    return `€${formattedPrice}`;
};

export default function ProductCard({ product, wishlist, toggleWishlist }) {
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

    const handleVariantChange = (variant) => {
        setSelectedVariant(variant);
    };

    // Check if the product is in the wishlist
    const isInWishlist = wishlist.includes(product.id);

    const discountBadgeAvailable = selectedVariant.reducedPrice;

    return (
        <div className={classes.product_card} key={product.id}>
            <div className={classes.product_card_top}>
                <div className={classes.badges}>
                    {product.tags?.map((tag,index)=>(
                        <span key={index} className={classes.tag_badge}>{tag}</span>
                    ))}
                    {discountBadgeAvailable ? <span className={classes.discount_badge}>-{ Math.round(((selectedVariant.price-selectedVariant.reducedPrice)/selectedVariant.price)*100) }%</span> : <span style={{ display:"none" }}></span>} 
                </div>
                <Image src={"https://hiring-workspace.vercel.app/" + selectedVariant.image} alt={selectedVariant.label} fill />
            </div>
            <div className={classes.product_card_bottom}>
                <h3 style={{ textTransform: 'uppercase',fontSize:'16px',lineHeight:'20px'}}>{product.title}</h3>
                <p className={classes.multi_line_truncate}>{product.description}</p>
                <div style={{margin:'20px 0px'}}>
                    {product.variants.map((variant) => (
                        <button
                            key={variant.sku}
                            onClick={() => handleVariantChange(variant)}
                            style={{
                                backgroundColor: variant.color,
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                margin: '0 5px',
                                border:
                                    selectedVariant.sku === variant.sku
                                        ? '2px solid black'
                                        : '2px solid transparent',
                                cursor: 'pointer',
                            }}
                            aria-label={variant.label}
                        />
                    ))}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {selectedVariant.reducedPrice ? (
                        <div>
                            {/* Show the striked original price and the reduced price */}
                            <span style={{ textDecoration: 'line-through', color: '#999', marginRight: '10px' }}>
                                {formatPrice(selectedVariant.price)}
                            </span>
                            <span style={{ color: '#d9534f' }}>{formatPrice(selectedVariant.reducedPrice)}</span>
                        </div>
                    ) : (
                        // Show only the regular price if no discount
                        <span>{formatPrice(selectedVariant.price)}</span>
                    )}
                    {/* Wishlist Button */}
                    <button
                        style={{
                            width: '60px',
                            height: '40px',
                            padding: '10px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            backgroundColor: isInWishlist ? '#d9534f' : '#1F2A37',
                            color: '#fff',
                            border: isInWishlist ? '#d9534f' : '1px solid #fff',
                            fontSize: '14px'
                        }}
                        onClick={() => toggleWishlist(product.id)}
                    >
                        <Image src={heartImg} width={20} height={20} alt="wishlist" />
                    </button>
                </div>
            </div>
        </div>
    );
}
