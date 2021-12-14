import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router';

import './movie-grid.scss';

import MovieCard from '../movie-card/MovieCard';
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/Input'

import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';

const MovieGrid = props => {

    const [items, setItems] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const { keyword } = useParams();

    useEffect(() => {
        const getList = async () => {
            let response = null;
            if (keyword === undefined) {
                const params = {};
                console.log("MovieGrid Props:"+props)
                switch(props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming, {params}); {/**based on the movie category pass the params */}
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, {params}); {/**based on the movie category pass the params */}
                }
            } else {
                const params = {
                    query: keyword
                }
                response = await tmdbApi.search(props.category, {params});
            }
            setItems(response.results); // set to state based upon changes so page renders
            setTotalPage(response.total_pages); // set tto state to chanes based upon which page stars rendering again 
        }
        getList();
    }, [props.category, keyword]);

    const loadMore = async () => {
        let response = null;
        if (keyword === undefined) { // id input is empty display page 1
            const params = {
                page: page + 1
            };
            switch(props.category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(movieType.upcoming, {params}); {/**based on the movie category pass the params */}
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular, {params}); {/**based on the movie category pass the params */}
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword
            }
            response = await tmdbApi.search(props.category, {params}); // pas the params to the search
        }
        setItems([...items, ...response.results]);
        setPage(page + 1);
    }

    return (
        <>
            <div className="section mb-3">
                <MovieSearch category={props.category} keyword={keyword}/>
            </div>
            {/** pass the data to the MovieCard using map function  */}
            <div className="movie-grid">
                {
                    items.map((item, i) => <MovieCard category={props.category} item={item} key={i}/>)
                }
            </div>
            {/* if page number is less than number of pages view loadmore less no  */}
            {
                page < totalPage ? (
                    <div className="movie-grid__loadmore">
                        <OutlineButton className="small" onClick={loadMore}>Load more</OutlineButton>
                    </div>
                ) : null
            }
        </>
    );
}

const MovieSearch = props => {

    const history = useHistory();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(
        () => {
            if (keyword.trim().length > 0) {
                history.push(`/${category[props.category]}/search/${keyword}`); // on selecting chnage url in the nav bar 
            }
        },
        [keyword, props.category, history]
    );

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) { // if key code is 13 ie in click enter call goToSearch 
                goToSearch();
            }
        } 
        document.addEventListener('keyup', enterEvent); // on keyup and ke down
        return () => {
            document.removeEventListener('keyup', enterEvent); // on keyup and ke down
        };
    }, [keyword, goToSearch]);

    return (
        <div className="movie-search">
            <Input
                type="text" 
                placeholder="Enter keyword" // display the plaveholder text 
                value={keyword} // from the state set the value to keyword that is ued to search the movie 
                onChange={(e) => setKeyword(e.target.value)} // take the input from the user to sarch the movie
            />
            <Button className="small" onClick={goToSearch}>Search</Button> {/** search button */}
        </div>
    )
}

export default MovieGrid;
