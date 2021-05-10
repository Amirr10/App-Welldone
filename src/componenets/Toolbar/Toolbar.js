import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { setTitle, setDelete, setEdit, setView } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import {deleteLocalStorageItem} from '../../utils'
import './Toolbar.css'

const useStyles = makeStyles((theme) => ({
    margin: {
      marginRight: '3%' 
    },
  }));

const Toolbar = (props) => {

    const classes = useStyles();
    let history = useHistory();
    const dispatch = useDispatch();

    const data = useSelector(state => state.categories.category)
    let title = useSelector(state => state.pageTitle.title)
    let edit = useSelector(state => state.editCategory.edit)
    let view = useSelector(state => state.viewLocation.view)

    const [category, setCategory] = useState({})

    useEffect(() => { 
        dispatch(setTitle('Categories'))
        let newCategory = data?.find(item => item.name === title)

        setTitle(newCategory)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let newCategory = data?.find(item => item.name === title)
        setCategory(newCategory)        
        dispatch(setEdit(false))
        dispatch(setView(false))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title])


    const editHandler = () => {
        dispatch(setEdit(!edit))
    }

    const viewLocation = () => {
        dispatch(setView(!view))
    }

    //delete a category from list of categories
    const deleteHandler = () => {

        let categories = [...data]
        let filteredArray = categories.filter(el => el.id !== category.id)

        deleteLocalStorageItem(filteredArray)

        dispatch(setTitle("Categories"))
        dispatch(setDelete(filteredArray))

        setCategory({})

        history.push("/")
    } 

    const navigate = () => {
        dispatch(setTitle('Categories'))
        history.push("/")
    }

    return (
        <div className="toolbar-container">
            <div className="toolbar-ul-wrapper">
                <ul className="toolbar-ul">
                    <li onClick={navigate}>Home</li>
                    <li onClick={() => history.push("/add")}>Add</li>
                </ul>
            </div>

            <div className="toolbar-title">
                <li>{title ? title : "Categories"}</li>
            </div>

            <div className="toolbar-buttons">
                {title !== "Categories" ?
                    <>
                        <Button className={classes.margin} variant="contained" onClick={editHandler}>Edit</Button>
                        <Button className={classes.margin} variant="contained" onClick={deleteHandler}>Delete</Button>
                        <Button className={classes.margin} variant="contained" onClick={viewLocation}>View</Button>
                    </>
                    : null
                }
            </div>

        </div>
    )
}

export default Toolbar