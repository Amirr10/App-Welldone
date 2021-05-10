import React from 'react'
import { useState, useEffect } from  'react'
import { useDispatch } from 'react-redux'
import { setTitle, setCategoriesAction, setEdit } from '../../redux/actions'
import './Categories.css'

const Categories = (props) => {

    const dispatch = useDispatch();
    const [data, setData] = useState([])

    //Get data from localStorage(DB)
    useEffect(() => {
        let jsonData = localStorage.getItem('names')

        if(jsonData !== ""){
            setData(JSON.parse(jsonData))
            dispatch(setCategoriesAction(JSON.parse(jsonData)))
        }

        dispatch(setEdit(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    
    //render the category that the user clicked on and move navigate to the page
    const renderCategory = (category) => {

        dispatch(setTitle(category.name))
        dispatch(setEdit())
        props.history.push("category/" + category.id)
    }

    return (
        <div className="categories-container">
            <div className="categories-list-wrapper">
                <h2>Category  List</h2>
                
                { data?.map((category, index) => {
                    return <div key={index} className="categories-list" onClick={() => renderCategory(category)}>

                        <p className="categories-item">{category.name}</p>
                    </div>
                })
                }

            </div>
        </div>
    )
}

export default Categories