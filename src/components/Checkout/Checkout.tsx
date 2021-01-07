import React, { useState } from 'react';
import './Checkout.scss'
import axios from 'axios';
import { ICart } from '../../Models/ICart';
import UserInfoForm from '../UserInfoForm/UserInfoForm';
import { Order, OrderItems } from '../../Models/IOrder';
import { IUserForm } from '../../Models/IUserForm';

interface ICheckoutProps{
    cartInfo: ICart[];
    totalPrice: number;
}

export default function Checkout(props: ICheckoutProps){
    const [orderReceived, setOrderReceived] = useState(false);

    async function sendOrder(sendOrder: Order) {                       
       let result = await axios.post('https://medieinstitutet-wie-products.azurewebsites.net/api/orders', sendOrder);
       if(result.status === 201) {
           setOrderReceived(true);
       }
    }   

    function createOrder(form: IUserForm){
        const getCartItems:OrderItems[] = props.cartInfo.map((movie: ICart) => {
            return {productId: movie.id, amount: movie.quantity}
        });

        let getTimestamp = new Date();
        let setTimestamp =
        getTimestamp.toISOString().substring(0, getTimestamp.toISOString().length - 1);
        
        const newUserOrder:Order = {
            companyid: 4265,
            created: setTimestamp,
            createdBy: form.firstName + ' ' + form.lastName,
            paymentMethod: form.paymentMethod,
            totalPrice: props.totalPrice,
            status: 0,
            orderRows:getCartItems
        }
        sendOrder(newUserOrder);
    };
    
    let CheckoutHtml = !orderReceived ? <UserInfoForm sendToCheckout={createOrder}></UserInfoForm> : <h1>Din order har skickats!</h1>;


return(<div id="form-content">{CheckoutHtml}</div>)
}