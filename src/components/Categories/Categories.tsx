import React, { useEffect, useState } from 'react';
import './Categories.scss'
import axios from 'axios'
import { ICategory } from '../../Models/ICategory';

interface ICategoryProps{
    sendCategoryIdToApp(categoryId: number):void;
    showAllMovies():void;
}

export default function Categories(props:ICategoryProps){
    const defaultCategory:ICategory[] = [];
    const [categoryList, setCategoryList] = useState(defaultCategory);

    useEffect(() => {
        getCategories();
    }, []);

    async function getCategories() {
        let result =
        await axios.get<ICategory[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/categories');
        let updateCategories:ICategory[] = result.data.map((category:ICategory) => {
            return category;
        });
       setCategoryList([...updateCategories]);       
    }

    function getCategoryId(e:React.MouseEvent <HTMLLIElement>){
        let categoriId = e.currentTarget.dataset.categoryId;
        props.sendCategoryIdToApp(parseInt(categoriId!));        
    }

    function showAll(){
        props.showAllMovies();
    }

    let categoriesHtml = categoryList.map((category:ICategory) => {
        return(
        <li key={category.id} data-category-id={category.id} onClick={getCategoryId}>
            <a href="#">{category.name}</a>
        </li>
        );
    })

    return(<ul>
        {categoriesHtml}
        <li>
            <a href="#" onClick={showAll}>Visa alla</a>
        </li>
    </ul>)
}