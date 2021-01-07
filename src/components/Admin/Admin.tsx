import React, { useEffect, useState } from 'react';
import { AdminOrder, AdminOrderRows } from '../../Models/IAdmin';
import axios from 'axios';
import './Admin.scss'

export default function Admin(){
    const defaultOrderList:AdminOrder[] = [];
    const [orderList, setOrderList] = useState(defaultOrderList);
    const [orderDeleted, setOrderDeleted] = useState(false);

    useEffect(() => {
        getOrders();
     }, []);

    async function getOrders(){
        let result = await axios.get<AdminOrder[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=4265');
        let updateOrderList:AdminOrder[] = result.data.map((item:AdminOrder) => {
            return item;
        });
       setOrderList([...updateOrderList]);
    }

    async function deleteOrder(e:React.MouseEvent <HTMLButtonElement>) {
        setOrderDeleted(false);
        let getId = e.currentTarget.dataset.orderId;
        let result = await axios.delete(`https://medieinstitutet-wie-products.azurewebsites.net/api/orders/${getId}`)
        if(result.status === 200){
            getOrders();
            setOrderDeleted(true);
        }
    }

    function removeNotis(){
        setOrderDeleted(!orderDeleted);
    }

    let orderRemoved = orderDeleted ? <div id="order-notis"><h2>Order borttagen!</h2><a href='#' onClick={removeNotis}>Avvisa</a></div> : <React.Fragment></React.Fragment>

    let orderListHtml = orderList.map((order:AdminOrder, i:number) => {

        let getOrderItems = order.orderRows.map((item:AdminOrderRows) => {
        return (
        <li key={item.id} className="order-list-item">
            <p>Artikelnr: {item.productId}</p>
            <p>Antal: {item.amount}</p>
        </li>);
        });

        return(<React.Fragment>
        <div key={order.id} className="order-row">
            <div className="first-section">
                <p>Ordernr: {order.id}</p>
                <p>Datum: {order.created.substring(0, 10)}</p>
                <p>Kund: {order.createdBy}</p>
                <button type="button" data-order-id={order.id} onClick={deleteOrder}>Ta bort order</button>
            </div>
            <div className="items-section">
                <ul>
                {getOrderItems}
                </ul>
            </div>
            <div className="last-section">
                <p>Status: {order.status === 0 ? 'Under Behandling': 'Okänt'}</p>
                <p>Betal metod: {order.paymentMethod}</p>
                <p>Total Pris: {order.totalPrice}</p>
            </div>
        </div>
        <hr/>
        </React.Fragment>)
    });

    return(<div id="order-content">
        {orderRemoved}
        {orderListHtml}
        </div>)
}