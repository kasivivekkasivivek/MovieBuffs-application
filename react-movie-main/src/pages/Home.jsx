import React from 'react';
import { Link } from 'react-router-dom';

import { OutlineButton } from '../components/button/Button';
import HeroSlide from '../components/hero-slide/HeroSlide';
import MovieList from '../components/movie-list/MovieList';
import MovieGrid from '../components/movie-grid/MovieGrid';

import { category, movieType, tvType } from '../api/tmdbApi';

const Home = () => {
    const popularMovies = ()=>{
        let category="populor";
        <MovieGrid category={category}/> // pass the category to the MovieGrid
    }
    return (
        <>
            <HeroSlide/>
            <div className="container">

                {/** Trending Movies in Home  */}
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending Movies</h2> {/** display the Trending Movies Text  */}
                        <Link to="/movie">
                            <OutlineButton className="small" onClick={popularMovies}>View more</OutlineButton> {/** add the view more button */}
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.popular}/> {/** pass the type of category selected to MovieList */}
                </div>
                 {/** Top Rated Movies Movies in Home*/}
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated Movies</h2> {/** display teh Top Rated Movies Text  */}
                        <Link to="/movie">
                            <OutlineButton className="small">View more</OutlineButton> {/** add the view more button */}
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.top_rated}/> {/** pass the type of category selected to MovieList */}
                </div>

                 {/** up comming Movies in Home  */}
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Up Comming Movies </h2> {/**display the Up Comping Movies text  */}
                        <Link to="/movie">
                            <OutlineButton className="small">View more</OutlineButton> {/** add the view more button */}
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.upcoming}/> {/** pass the type of category selected to MovieList */}
                </div>


                {/*--------------------------------------------------------------------------------------------- */}

                {/* Trending Tv in Home  */}
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending TV</h2> {/** display the Trending Tvtext  */}
                        <Link to="/tv">
                            <OutlineButton className="small">View more</OutlineButton>{/** add the view more button */}
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.popular}/> {/** pass the type of category selected to MovieList */}
                </div>

                {/**Top Rated Tv in Home  */}
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated TV</h2> {/**display the Top Rated Tv shows */}
                        <Link to="/tv">
                            <OutlineButton className="small">View more</OutlineButton> {/** add the view more button */}
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.top_rated}/> {/** pass the type of category selected to MovieList */}
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>On The Air</h2> {/**display the On the Air text  */}
                        <Link to="/tv">
                            <OutlineButton className="small">View more</OutlineButton> {/** add the view more button */}
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.on_the_air}/> {/** pass the type of category selected to MovieList */}
                </div>


            </div>
        </>
    );
}

export default Home;
