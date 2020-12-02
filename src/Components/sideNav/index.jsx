import React, {useState} from 'react'
import './style.scss'
import Lupa from '../../assets/images/lupa.svg'
import Berries from '../../assets/images/berries.svg'
import PokeLogo from '../../assets/images/pokemonHover.svg'
import Potion from '../../assets/images/potion.svg'
import '../Home/data';

const SideNav=({visibleBanner, mobile, updateURL, pressed='', handleSearch})=>{
    const [lupaClicked, setLupaClicked] = useState(false);
    const [searchText, setSearchText] = useState('');
    const handleClick=(e)=>{
        if(!/(button|input)/i.test(e.target.tagName)){
            setLupaClicked(()=>lupaClicked?false:true);
        }
    }

    const handleInput=(e)=>{
        setSearchText(e.target.value);
    }

    return(
        <div className={`sideNav ${visibleBanner?'':'sticky'} ${mobile?'mobileON':'mobileOFF'}`}>
            <div onClick={handleClick} className={`sideNavItem search ${lupaClicked?'searchPressed':''}`}>
                <Lupa />
                <div className="searchBar">
                    <form onSubmit={handleSearch} className="searchBarContainer">
                        <input type="text" name="searchInput" onChange={handleInput} placeholder="Pokemon or its ID" value={searchText} className="searchInput"/>
                        <button >Go</button>
                    </form>
                </div>
            </div>
            <div className={`sideNavItem pokemon ${pressed=='pokemon'?'pokemonPressed':''}`} onClick={()=>updateURL("pokemon")}>
                <PokeLogo/>
            </div>
            <div className={`sideNavItem berries ${pressed=='berry'?'berriesPressed':''}`} onClick={()=>updateURL("berry")}>
                <Berries/>
            </div>
            <div className={`sideNavItem objects ${pressed=='item'?'objectsPressed':''}`} onClick={()=>updateURL("item")}>
                <Potion/>
            </div>
        </div>
    )
}

export default SideNav;