import React, { ChangeEvent, useState } from 'react';
import './Cart.scss'
import { ICart } from '../../Models/ICart';
import Checkout from '../Checkout/Checkout';

interface ICartProps{
    Movies:ICart[];
    deleteItem(movieId: number):void;
    updateQuantity(movieId: number, quantity:number):void;
}

export default function Cart(props: ICartProps){
    const [openCheckout, setOpenCheckout] = useState(false);
    let getSum:number = 0;

    for(let i = 0; i < props.Movies.length; i++){
        getSum += props.Movies[i].price;
    }

    function toCheckout(){
        setOpenCheckout(!openCheckout);
    }

    function updateQuantity(e:ChangeEvent <HTMLInputElement>){
        //Jag hade gärna velat fixa denna funktion, men den funkar inte helt ännu :)
        let movieId = e.target.dataset.movieId;
        let quantity = e.target.value;
        props.updateQuantity(parseInt(movieId!), parseInt(quantity));
    }

    function deleteMovie(e:React.MouseEvent <HTMLButtonElement>){
        let targetMovie = e.currentTarget.dataset.movieId;   
        props.deleteItem(parseInt(targetMovie!));
    }

    let userCartHtml = props.Movies.length !== 0 ? props.Movies.map((movie:ICart) => {           
        return(
            <div key={movie.id} className="cart-row">
                <img src={movie.imageUrl} alt=""/>
                <div className="cart-title">
                    <h3>{movie.name}</h3>
                    <p>Artikelnr: {movie.id}</p>
                </div>
                <div>
                    <button type="button" data-movie-id={movie.id} onClick={deleteMovie}>Ta bort vara</button>
                </div>
                <div>
                    <input type="number" name="item-quantity" data-movie-id={movie.id} value={movie.quantity} onChange={updateQuantity}/>
                </div>
                <div>
                    <p>{movie.price}:-</p>
                </div>
            </div>
            );
        }) : <p id="empty-cart">Din varukorg är tom</p>;

        let totalSum = !openCheckout ?
        <span id="total-cost">Total kostnad: {getSum}:-</span> : <React.Fragment></React.Fragment>;

        let checkoutBtn = props.Movies.length !== 0 && !openCheckout ?
        <button id="checkout-btn" type="button" onClick={toCheckout}>Till Kassan</button> : <React.Fragment></React.Fragment>;

        let cartContainer = openCheckout ?
        <Checkout cartInfo={props.Movies} totalPrice={getSum}></Checkout> : userCartHtml;

    return(
        <section id="cart-section">
            <div id="cart-wrapper">
                <div id="cart-content">
                    {cartContainer}
                    {totalSum}
                    {checkoutBtn}
                </div>
            </div>
        </section>)
}