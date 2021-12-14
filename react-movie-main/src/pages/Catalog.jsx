import React from 'react';

import { useParams } from 'react-router';

import PageHeader from '../components/page-header/PageHeader';

import { category as cate } from '../api/tmdbApi';
import MovieGrid from '../components/movie-grid/MovieGrid';

const Catalog = () => {
    const { category } = useParams();
    console.log("catalog : "+category)
    return (
        <>
            <PageHeader>
                {category === cate.movie ? 'Movies' : 'TV Series'} {/**if catgory got from para,s ids movies set the category to movies or Tv Series */}
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category={category}/> {/** pas the cateofy to MoveiGrid as the params */}
                </div>
            </div>
        </>
    );
}

export default Catalog;
