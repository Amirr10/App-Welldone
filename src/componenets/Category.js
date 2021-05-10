import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

import { setTitle, setEdit, setCategoriesAction } from '../redux/actions'

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "3%",
        marginLeft: "0",
        width: '55%'
      },
     margin: {
        marginBottom:"3%"
     }  
  }))

const Category = (props) => {

    const classes = useStyles();

    const data = useSelector(state => state.categories.category)
    const title = useSelector(state => state.pageTitle.title)
    const edit = useSelector(state => state.editCategory.edit)
    const view = useSelector(state => state.viewLocation.view)

    const [category, setCategory] = useState({})
    const [name, setName] = useState(title)
    const [error, setError] = useState(false)
    const [id, setId] = useState(parseInt(props.match.params.id))

    const dispatch = useDispatch();


    useEffect(() => {

        //Get the category that the user clicked and store it in local state
        let filtered = data?.find(el => el.id === parseInt(props.match.params.id))
        setCategory(filtered)
    
        if(name === "Categories"){
            dispatch(setEdit(false))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const moveBackPage = () => {
        dispatch(setTitle("Categories"))
        props.history.push("/")
    }

    const nameHandler = (e) => {
        setName(e.target.value)
    }

    //edit the name of the category and save in DB (LocalStorage)
    const editName = () => {

        if(name === ""){
            setError(true)
            return
        }
        
        const index = data.findIndex(el => el.id === id)
        let tempArr = [...data]

        tempArr[index].name = name

        let str = JSON.stringify(tempArr)
        localStorage.setItem('names', str)

        dispatch(setTitle(name))
        dispatch(setCategoriesAction(tempArr))
    }

    return (
        <div className="category-container">
            <div className="category-wrapper">
                <h1>Category - {category?.name}</h1>

                {
                    view ? 
                        <div>
                            Location - Name , Address, Coordinates, Category
                        </div>
                    :
                    null
                }

                {edit !== false?
                    <div className="category-btns">
                        <TextField onChange={nameHandler} id="outlined-basic" defaultValue={name} label="Update" variant="outlined" />
                        {error ?
                            <>
                                <Alert className={classes.root} severity="error">Enter a valid Category</Alert>
                            </>
                            : null
                        }

                        <Button style={{marginTop:"4%"}} variant="contained" color="primary" onClick={editName} href="#contained-buttons">
                            Update
                        </Button>
                    </div>
                : null
                }
            <br />

                <div className="category-back">
                    <Button className={classes.margin}
                            variant="contained"
                            onClick={moveBackPage}
                            color="primary">
                            Back
                    </Button>
                </div>
            </div>
            {/* <Locations /> */}


        </div>
    )
}

export default Category