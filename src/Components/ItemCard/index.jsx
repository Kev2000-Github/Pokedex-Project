import React from 'react'
import './style.scss'

const ItemCard=({item})=>{
    return (
        <div className="cardWrapper">
            <div className="itemCardGrid">
                <div className="itemCardFront">
                    <div className="itemArt itemItem">
                        <img src={item.art} alt={item.name}/>
                    </div>
                    <div className="itemName itemItem">
                        <h2>{item.name}</h2>
                        <h3>{`#${item.id}`}</h3>
                    </div>
                    <div className="itemDescription itemItem">
                        <span>{item.description}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemCard;