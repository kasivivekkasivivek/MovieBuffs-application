import axiosClient from "./axiosClient";

// based on the catedory of the movie i.e wether it is tv show are movie
export const category = {
    movie: 'movie',
    tv: 'tv',
    popular:'popular'
}


// what type of movie it is i.e wherther it is trending, top rated or popular
export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated'
}

// similarly with the tv show wheather it is popular or top-rated
export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air'
}

const tmdbApi = {
    
    // on navigating to the /movie we will get all the list of movies with search bar
    getMoviesList: (type, params) => {
        //console.log("tmdbapi:"+movieType[type])
        const url = 'movie/' + movieType[type];
        return axiosClient.get(url, params);
    },

    // on navigating to movie/popular we will get all the populat movie
    getPopularMoviesList:(type,params)=>{
        const url = 'movie/' + 'popular';
        return axiosClient.get(url, params);
    },
    getTvList: (type, params) => {
        const url = 'tv/' + tvType[type];
        return axiosClient.get(url, params);
    },
    getVideos: (cate, id) => {
        const url = category[cate] + '/' + id + '/videos';
        return axiosClient.get(url, {params: {}});
    },
    search: (cate, params) => {
        const url = 'search/' + category[cate];
        return axiosClient.get(url, params);
    },
    detail: (cate, id, params) => {
        const url = category[cate] + '/' + id;
        return axiosClient.get(url, params);
    },
    credits: (cate, id) => {
        const url = category[cate] + '/' + id + '/credits';
        return axiosClient.get(url, {params: {}});
    },
    similar: (cate, id) => {
        const url = category[cate] + '/' + id + '/similar';
        return axiosClient.get(url, {params: {}});
    },
}

export default tmdbApi;