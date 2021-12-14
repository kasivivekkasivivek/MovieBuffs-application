import React, { useState, useEffect, useRef } from 'react';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Button, { OutlineButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';

import tmdbApi, { category, movieType } from '../../api/tmdbApi'; // call from the tmdb api 
import apiConfig from '../../api/apiConfig'; //call from api config

import './hero-slide.scss';
import { useHistory } from 'react-router';

const HeroSlide = () => {

    SwiperCore.use([Autoplay]);

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = {page: 1} // get the data from the page 1
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, {params}); // pass the params to the api
                setMovieItems(response.results.slice(1, 10)); // top 10 movies in the gero slide
                //console.log(response);
            } catch {
                console.log('error');
            }
        }
        getMovies();
    }, []);

    return (
        <div className="hero-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                // autoplay={{delay: 3000}}
            >
                {
                    movieItems.map((item, i) => ( 
                        <SwiperSlide key={i}> 
                            {({ isActive }) => (
                                <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} /> 
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {
                movieItems.map((item, i) => <TrailerModal key={i} item={item}/>) // call the map function to display TrailerMode
            }
        </div>
    );
}

const HeroSlideItem = props => {

    let hisrory = useHistory();

    const item = props.item;

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path); // get the backtrop image based on the api. and condition to display

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);

        const videos = await tmdbApi.getVideos(category.movie, item.id);

        if (videos.results.length > 0) {
            const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key; // add the video embeded code and pass the video code
            modal.querySelector('.modal__content > iframe').setAttribute('src', videSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer'; // if no trailer is availabe then display no trailer availabe
        }

        modal.classList.toggle('active'); // is active toggle 
    }

    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{backgroundImage: `url(${background})`}} //backgroud image 
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2> {/**get the title of the movie */}
                    <div className="overview">{item.overview}</div> {/**get the overview of the movie from the apis */}
                    <div className="btns">
                        <Button onClick={() => hisrory.push('/movie/' + item.id)}> {/** add watch now button */}
                            Watch now
                        </Button>
                        <OutlineButton onClick={setModalActive}> {/** add the watch trailer button*/}
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" /> {/* set images got the data from apis*/}
                </div>
            </div>
        </div>
    )
}

// On click watch Trailer 
const TrailerModal = props => { // this is the model of the appliucation
    const item = props.item;       // get the props to the application

    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src', ''); // method to close the model on clicking the closse bvutton

    return (
        <Modal active={false} id={`modal_${item.id}`}>  {/**set the active model to true or false */}
            <ModalContent onClose={onClose}> {/**onClose method is called */}
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe> {/**set the styling to the model componet */}
            </ModalContent>
        </Modal>
    )
}

export default HeroSlide;
