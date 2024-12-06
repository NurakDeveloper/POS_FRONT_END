import React from "react";
import "./ProductCard.css";
import { hostName } from "../../api/host";

const ProductCard = ({ image, name, price, category, onClick }) => {
    const domainName = hostName();
    const imageUrl = `http://${domainName}:8085/api/images/`
    return (
        <div className="product-card pb-3" onClick={onClick}>
            <div className="center p-2 rounded" style={{ height: '120px', overflow: 'hidden' }}>
                <img src={`${imageUrl}${image}`} alt={name} className="h-100 rounded" />
            </div>
            <div className="card-body p-2">
                <div className="product-name f-12">{name}</div>

                <p className="product-price f-16">${price ? price.toFixed(2) : ''}</p>
            </div>
        </div>
    );
};

export default ProductCard;
