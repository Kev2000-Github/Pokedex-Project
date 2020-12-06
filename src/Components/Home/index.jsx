import React, {useState, useEffect, useCallback, useRef, Suspense, lazy} from 'react';
import './style.scss';
import 'react-toastify/dist/ReactToastify.css';
import data from './data';
import axios from 'axios';
import {toast} from 'react-toastify';
import SeeMore from '../../assets/images/seeMore.svg';
import SeeMore2 from '../../assets/images/seeMore2.svg';
const Header = lazy(()=>import('../header/index.jsx'));
const Card = lazy(()=>import('../PokemonCard/index.jsx'));
const SideNav = lazy(()=>import('../sideNav/index.jsx'));
const BerriesCard = lazy(()=>import('../BerriesCard/index.jsx'))
const ItemCard = lazy(()=>import('../ItemCard/index.jsx'))

toast.configure();

const App=()=>{
    const [apiURL, setApiURL] = useState(data.baseURL + 'pokemon' + data.limit);
    const [isLoading, setIsLoading] = useState(false);
    const [pokemons, setPokemons] = useState([]);
    const [nextBatch, setNextBatch] = useState("");
    const [visibleBanner, setVisibleBanner] = useState(true);
    const [clickMobileMenu, setClickMobileMenu] = useState(false);
    const observer = useRef();
    const bannerObserver = useRef();
    const banner = useCallback(node =>{
        if(bannerObserver.current) bannerObserver.current.disconnect();
        bannerObserver.current= new IntersectionObserver(entries=>{
            if(entries[0].isIntersecting){
                if(!visibleBanner) setVisibleBanner(true);
            }
            else{
                if(visibleBanner) setVisibleBanner(false);
            }
        })
        if(node) bannerObserver.current.observe(node);
    },[visibleBanner])

    const lastItem = useCallback(node=>{
        if(isLoading) return;
        if(observer.current) observer.current.disconnect();
        observer.current= new IntersectionObserver(entries =>{
            if(entries[0].isIntersecting){
                if(nextBatch) setApiURL(nextBatch);
            }
        })
        if(node) observer.current.observe(node);
    },[isLoading,nextBatch]);

    const updateBaseURL=(newLink)=>{
        setPokemons([]);
        setApiURL(data.baseURL + newLink + data.limit)
    }

    const handleSearch=(e)=>{
        e.preventDefault();
        const searchTerm=e.target.searchInput.value;
        if(searchTerm=='') return;
        const newURL= apiURL.split('/');
        newURL[6]=searchTerm;
        setApiURL(newURL.join('/'));
    }

    const renderSwitch=(link, data)=>{
        const option = link.split('/');
        if(option.length<6) return '';
        switch(option[5]){
            case 'pokemon':
                const pokemon=data;
                return(
                    <Suspense fallback={<div/>}>
                    <Card  
                                pokemon={{name:pokemon.name,
                                stats: pokemon?.stats,
                                art: pokemon.sprites?.other?.['official-artwork']?.['front_default'],
                                weight: pokemon?.weight,
                                types: pokemon?.types,
                                id: pokemon.id
                                }}
                            />
                    </Suspense>
                )
            case 'item':
                const item=data;
                return(
                    <Suspense fallback={<div/>}>
                    <ItemCard
                        item={{
                            name: item.name,
                            art: item.sprites.default,
                            id: item.id,
                            description: item['flavor_text_entries'][0].text
                        }}
                    />
                    </Suspense>
                )
            default:
                const berry=data;
                return(
                    <Suspense fallback={<div/>}>
                    <BerriesCard
                        berry={{
                            name: berry.name,
                            art: berry.sprite,
                            id: berry.id,
                            'growth_time': berry['growth_time'],
                            'max_harvest': berry['max_harvest'],
                            smoothness: berry.smoothness,
                            'soil_dryness': berry['soil_dryness'],
                            firmness: berry.firmness.name,
                            flavors: berry.flavors
                        }}
                    />
                    </Suspense>
                )
        }
    }

    const notify=(message)=>{
        toast.warn(message, {position: toast.POSITION.TOP_RIGHT});
    }

    const getPokemons=async (url,search=false)=>{
        setIsLoading(true);
        try{
            const response=await axios.get(url);
            const items=response.data.results;
            let itemDetails=[];
            if(search){
                itemDetails.push(response.data);
            }
            else{
                itemDetails = await Promise.all(items.map(async (item) => ((await axios.get(item['url'])).data)));
            } 
            if(apiURL.split('/')[5]=='berry'){
                for(let i=0;i<itemDetails.length;i++){
                    const res=await axios.get(itemDetails[i].item.url);
                    itemDetails[i]['sprite']= res.data.sprites.default;
                }
            }
            return {
                next: search?null:response.data.next,
                itemDetails
            } 
        }
        catch(error){
            if(axios.isCancel(error)){
                return;
            }
            if(error.response?.status==404){
                setPokemons([]);
                const urlParsed=url.split('/');
                const searchTerm = urlParsed[6];
                const category = urlParsed[5];
                notify(`El ${category}: ${searchTerm} no existe`);
            }
        }
        return;
    }

    useEffect(()=>{ //SET LOADING AS FALSE
        setIsLoading(false);
    },[pokemons])

    useEffect(()=>{ //GET POKEMON/ITEMS FROM API
        let ignore=false;
        const fetchInfo=async (clear=false, search=false)=>{
            const {next, itemDetails} = await getPokemons(apiURL, search);
            if(!ignore){
                if(!clear){
                    setPokemons(prevPokemons=> {
                        return [...prevPokemons, ...itemDetails];
                    });
                    setNextBatch(next==undefined?null:next);
                }
                else{
                    setNextBatch(next);
                    setPokemons(itemDetails);       
                }
            }
        }
        const query=apiURL.split('/')[6];
        const isNotSearch=/^\?/.test(query);
        const isOffset=/offset=/.test(query);
        console.log('serach',isNotSearch);
        if(isNotSearch){
            if(!isOffset) fetchInfo(true, false);
            else fetchInfo()
        }
        else{
            fetchInfo(true,true);
        }
        return ()=>{ignore=true}
    },[apiURL])

    return(
        <>
            <Suspense fallback={<div/>}>
                <Header innerRef={banner}/>
            </Suspense>
            <div className={`mobileMenu ${clickMobileMenu?'mobileMenuON':'mobileMenuOFF'}`}
            onClick={()=>{setClickMobileMenu(()=>clickMobileMenu?false:true)}}
            >
                {clickMobileMenu?<SeeMore2/>:<SeeMore/>}
            </div>
                <div className="grid">
                    <Suspense fallback={<div/>}>
                        <SideNav 
                        pressed={apiURL.split('/')[5]} 
                        visibleBanner={visibleBanner} 
                        updateURL={updateBaseURL}
                        handleSearch={handleSearch}
                        mobile={clickMobileMenu}
                        />
                        </Suspense>
                        {visibleBanner?'':(<div></div>)}
                    <div className="wrapper">
                        {pokemons.map((pokemon,index)=>{
                            if(pokemons.length === index + 1){
                                return (
                                <div ref={lastItem} key={`${pokemon.name}-ID${pokemon.id}`} className="itemPokemon">
                                {renderSwitch(apiURL,pokemon)}
                                </div>
                                )
                            }
                            else{
                                return (
                                <div key={`${pokemon.name}-ID${pokemon.id}`} className="itemPokemon">
                                {renderSwitch(apiURL,pokemon)}
                                </div>
                                )
                            }
                        })}
                    </div>
                </div>
            <div className={`loading ${isLoading?'show':'none'}`}>
                Loading...
            </div>
        </>
    )
}

export default App;