import React, { ChangeEvent, useState } from 'react';
import { IUserForm } from '../../Models/IUserForm';

interface IUserFormProps{
    sendToCheckout(form: IUserForm):void;
}

export default function UserInfoForm(props: IUserFormProps){
    const defaultForm:IUserForm = {firstName: '', lastName:'', paymentMethod: ''};
    const [userForm, setUserForm] = useState(defaultForm);

    function handleInput(e:ChangeEvent <HTMLInputElement>){
        const name = e.target.name;
        const value = e.target.value;

        setUserForm({...userForm, [name]: value});
    }

    function saveToCheckout(){
        props.sendToCheckout(userForm);
    }

    return(
        <form>
        <label htmlFor="firstName">Förnamn</label>
        <input type="text" name="firstName" id="" className="form-input" onChange={handleInput}/>
        <label htmlFor="lastName">Efternamn</label>
        <input type="text" name="lastName" id="" className="form-input" onChange={handleInput}/>
        <label htmlFor="payment">Betalmetod:</label>
        <div id="pay-method">
            <label htmlFor="paypal">Paypal</label>
            <input type="radio" name="paymentMethod" id="" value="paypal" onChange={handleInput}/>
            <label htmlFor="debit-card">Visa</label>
            <input type="radio" name="paymentMethod" id="" value="visa" onChange={handleInput}/>
            <label htmlFor="debit-card">Master card</label>
            <input type="radio" name="paymentMethod" id="" value="mastercard" onChange={handleInput}/>
        </div>
        <button type="button" onClick={saveToCheckout}>Betala</button>
    </form>
    )
}