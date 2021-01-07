import React, { useEffect, useState } from 'react';
import './Home.scss'
import axios from 'axios';
import { IMovie } from '../../Models/IMovie';

interface IHomeProps{
    updateCart(movie:IMovie):void;
    movieCategory:number;
    searchTerm: string;
    showAll: boolean;
}

export default function Home(props: IHomeProps){
    const defaultMovie:IMovie[] = [];
    const [movieList, setMovieList] = useState(defaultMovie);
    const [movieListCopy, setMovieListCopy] = useState(defaultMovie);


    useEffect(() => {
        getMovies();
    }, [props.showAll]);

    useEffect(() => {
        getMoviesByCategory(props.movieCategory);        
    }, [props.movieCategory]);

    useEffect(() => {
        searchRequest();
    },[props.searchTerm]);

    async function getMovies() {
        let result =
        await axios.get<IMovie[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/products');
        let updateMovies:IMovie[] = result.data.map((movie:IMovie) => {
            return movie;
        });
       setMovieList([...updateMovies]);
       setMovieListCopy([...updateMovies]); //Hela listan sparad ifall listan sorteras efter Genre
    }
    
    function getMoviesByCategory(id: number) {
        if(id !== 0) {
            let tempList = movieListCopy.map((movie:IMovie) => {
                return movie;
            });
            tempList.forEach((movie:IMovie, i:number) => {    
                let isInCategory = false;
                movie.productCategory.forEach((category) => {
                    if(category.categoryId === id){
                        isInCategory = true;
                    }
                });
                if(isInCategory){
                    return movie;
                }
                else{
                    tempList.splice(i, 1);
                }
            });
            setMovieList([...tempList]);
        }
    }

    function addToCart(e:React.MouseEvent <HTMLButtonElement>){
        let movieId = e.currentTarget.dataset.movieId;
        let newItem = movieList.find((movie:IMovie) => movie.id === parseInt(movieId!));
        props.updateCart(newItem!);
    }

    async function searchRequest() {
        if(props.searchTerm !== ''){
            let result =
            await axios.get<IMovie[]>(`https://medieinstitutet-wie-products.azurewebsites.net/api/search?searchText=${props.searchTerm}`);
            let updateMovies:IMovie[] = result.data.map((movie:IMovie) => {
                return movie;
            });  
        setMovieList([...updateMovies]);    
        }
    }

    let movieListHtml = movieList.map((movie:IMovie) => {
    return(
    <div className="movie-card" key={movie.id}>
        <img src={movie.imageUrl} alt=""/>
        <div className="movie-info">
            <h3>{movie.name}</h3>
            <h4>Action</h4>
            <span>Artikelnr: {movie.id}</span>
            <p>{movie.description}</p>
        </div>
        <div className="purchase-btn">
            <span>{movie.price}:-</span>    
            <button type="button" data-movie-id={movie.id} onClick={addToCart}>Köp</button>
        </div>
    </div>
        )
    });

return(<section id="movie-list">{movieListHtml}</section>)
}