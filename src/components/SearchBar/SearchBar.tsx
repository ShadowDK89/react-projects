import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import './SearchBar.scss';

interface ISearchBarProps{
  searchRequest(search:string):void;
}

export default function SearchBar(props:ISearchBarProps){
  const [searchTerm, setSearchTerm] = useState('');

  function updateSearchTerm(e:ChangeEvent <HTMLInputElement>){
    setSearchTerm(e.target.value);
  }
  
  function sendSearchRequest(){
    props.searchRequest(searchTerm);   
  }

  function enterKeyPressed(e: KeyboardEvent){
    if(e.key === 'Enter'){
      sendSearchRequest();
    }
    else{
      return;
    }
  }

    return(
        <div>
        <input type="text" name="searchbar" onChange={updateSearchTerm} onKeyDown={enterKeyPressed}/>
        <button type="button" onClick={sendSearchRequest}>Sök</button>
      </div>
    )
}