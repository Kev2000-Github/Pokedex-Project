import React from 'react'
import Logo from '../../assets/images/logoPokemon.png'
import './style.scss'

const Header=({innerRef})=>{
    return (
        <>
            <nav ref={innerRef} className="header">
                <div className="headerItem">
                    <img src={Logo} alt="headerLogo" className="headerLogo"/>
                </div>
            </nav>
        </>
    )
}

export default Header;