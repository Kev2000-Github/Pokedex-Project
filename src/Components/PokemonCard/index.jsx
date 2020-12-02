import React, {useState, useEffect} from 'react'
import PokemonEllipse from '../../assets/images/Ellipse.svg'
import './style.scss'

const Card=({pokemon})=>{
    return(
        <div className="cardWrapper">
            <div className="cardGrid">
                <div className="pokemonCardBack">
                    <div className="backItem backArt">
                        <img src={pokemon.art} alt="backImage" className="backImage"/>
                    </div>
                    <div className="backItem backStats">
                        {pokemon.stats.map((stat,index)=>(
                            <div key={`${stat}-${index}`} className="statItem">
                                <span className="statName">{`${stat.stat.name}`}</span>
                                <div className="statBar" statwidth={parseInt(stat['base_stat'])}>
                                    <div style={{width: `${stat['base_stat']}%`}} className="statProgress"></div>
                                </div>
                                <span>{`${stat['base_stat']}`}</span>
                            </div>
                        ))}
                    </div>
                    <div className="backItem backWeight">
                        <span>{`Weight:  ${pokemon.weight}`}</span>
                    </div>
                </div>

                <div style={{backgroundImage: `url(${pokemon.art})`,
                backgroundSize: '150%',
                backgroundRepeat: 'no-repeat'
                }} className="pokemonCardFront">
                    <div className={`pokemonCardFrontBG ${pokemon.types[0].type.name}BGType`}></div>
                    <div className="pokemonArt pokemonItem">
                        <img src={pokemon.art} alt={pokemon.name}/>
                        <PokemonEllipse className="pokemonEllipse"/>
                    </div>
                    <div className="pokemonName pokemonItem">
                        <h2>{pokemon.name}</h2>
                        <h3>{`#${pokemon.id}`}</h3>
                    </div>
                    <div className="pokemonTypes pokemonItem">
                        {pokemon.types.map((tag,index)=>(
                            <span key={`${tag}#${index}`} className={`${tag['type']['name']}Tag`}>{tag['type']['name']}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;