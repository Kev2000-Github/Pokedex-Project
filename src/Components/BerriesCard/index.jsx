import React from 'react'
import './style.scss'

const BerryCard=({berry})=>{
    return (
        <div className="cardWrapper">
            <div className="berryCardGrid">
                <div className="berryCardFront">
                    <div className="berryArt berryItem">
                        <img src={berry.art} alt={berry.name}/>
                    </div>
                    <div className="berryName berryItem">
                        <h2>{berry.name}</h2>
                        <h3>{`#${berry.id}`}</h3>
                    </div>
                    <div className="berryInformation berryItem">
                        <div className="berryInfoLeft">
                            <span> <h2>growth time:</h2> {berry['growth_time']}</span>
                            <span> <h2>max harvest:</h2> {berry['max_harvest']}</span>
                            <span> <h2>smoothness:</h2> {berry['smoothness']}</span>
                            <span> <h2>soil dryness:</h2>  {berry['soil_dryness']}</span>
                        </div>
                        <div className="berryInfoRight">
                        <span> <h2>firmness:</h2> {berry['firmness']}</span>
                        <span>flavors</span>
                        <div className="flavorTags">
                            {berry.flavors.map(flavor=>(
                                <div key={`ID${flavor.flavor.name}-${flavor.potency}`} className={`flavorTagItem ${flavor.flavor.name}Tag`}>{flavor.flavor.name}</div>
                            ))}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BerryCard;