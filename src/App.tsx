import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.scss'
import Admin from './components/Admin/Admin';
import Home from './components/Home/Home';
import Categories from './components/Categories/Categories';
import SearchBar from './components/SearchBar/SearchBar';
import { IMovie } from './Models/IMovie';
import Cart from './components/Cart/Cart';
import { ICart } from './Models/ICart';

function App() {

  const defaultCart: ICart[] = [];
  const [userCart, setUserCart] = useState(defaultCart);
  const [movieByCategory, setMovieByCategory] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllMovies, setShowAllMovies] = useState(false);

  function updateMovieList(){
    setShowAllMovies(!showAllMovies);
  }

  function addToCart(getMovie:IMovie){
    let newMovie:ICart = {
      id: getMovie.id,
      name: getMovie.name,
      imageUrl: getMovie.imageUrl,
      quantity: 1,
      price: getMovie.price
    }; 
    
      let tempCart = userCart.map((movie: ICart) => {
        return movie;
      });

      tempCart.forEach((movie:ICart, i:number) => {
        if(movie.id === newMovie.id){
          newMovie.quantity += tempCart[i].quantity;
          newMovie.price = getMovie.price * newMovie.quantity;          
          tempCart.splice(i, 1);
        }
      })
      setUserCart([...tempCart, newMovie]);
  }

  function deleteItem(movieId: number) {
    let tempList = userCart.map((movie:ICart) => {
      return movie;
    });

    tempList.forEach((movie:ICart, i:number) => {
      if(tempList[i].id === movieId){
        tempList.splice(i, 1);
      }
    });
      setUserCart(tempList);
  }

  function updateQuantity(movieId: number, quantity:number){
    //Jag hade gärna velat fixa denna funktion, men den funkar inte helt ännu :)
    let tempCart = userCart.map((movie: ICart) => {
      return movie;
    });
    tempCart.forEach((movie:ICart, i:number) => {
      if(movie.id === movieId){
        quantity >= movie.quantity ?
        tempCart[i].price = tempCart[i].price + tempCart[i].price: 
        tempCart[i].price -= tempCart[i].price / quantity;
        
        tempCart[i].quantity = quantity;
      }
    });
    setUserCart(tempCart);
  }

  function recieveCategoryId(categoryId: number){    
    setMovieByCategory(categoryId);    
  }

  function handleSearch(search: string){
    setSearchTerm(search);
  }

  return (
    <Router>
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/" onClick={updateMovieList}>Home</Link>
              </li>
            </ul>
            <SearchBar searchRequest={handleSearch} />
            <Link to='/cart'>
              <span id="cart-button">
                <span id="cart-icon">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </span>
                <span id="cart-count">{userCart.length}</span>
              </span>
            </Link>
          </nav>
          </header>
          <main>
            <aside>
              <Categories
              sendCategoryIdToApp={recieveCategoryId}
              showAllMovies={updateMovieList} />
            </aside>
          <Switch>
            <Route path='/' exact={true}>
              <Home
              showAll={showAllMovies}
              searchTerm={searchTerm}
              movieCategory={movieByCategory}
              updateCart={addToCart} />
            </Route>
            <Route path='/cart'>
              <Cart
              Movies={userCart}
              updateQuantity={updateQuantity}
              deleteItem={deleteItem} />
            </Route>
            <Route path='/admin'>
              <Admin />
            </Route>
            <Route path='*'>Does not exist</Route>
          </Switch>
          </main>
        </Router>
      

  );
}

export default App;
