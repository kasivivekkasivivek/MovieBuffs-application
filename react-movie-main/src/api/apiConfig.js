const apiConfig = {
    // the api to get the data from the data base 
    baseUrl: 'https://api.themoviedb.org/3/',
    // the api key for the validation of the api request.
    apiKey: 'abecefb9de76235e74628a19f8aac338',
    // to get the image from the api based on the user request movie
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;