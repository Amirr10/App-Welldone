import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

import { setCategoriesAction } from '../redux/actions'
import {checkLocalStorageExist, getLocalStorageData} from '../utils'

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "3%",
        marginLeft: "0",
        width: '83%'
      }
    
  }))

const AddCategory = (props) => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const [category, setCategory] = useState('')
    const [error, setError] = useState(false)

    
    const nameHandler = (e) => {
        setCategory(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        let arr = []
        let nameArr
        
        //handle error when user enter empty string
        if(category === ""){
            setError(true)
            return
        }

        let bool = checkLocalStorageExist()
            
        if(bool === null){
            let obj = {id:1, name: category, status:false}
            arr.push(obj)

            let str = JSON.stringify(arr)
            localStorage.setItem('names', str)
            dispatch(setCategoriesAction(arr))

        } else {
           nameArr = getLocalStorageData()
           let id = nameArr[nameArr.length - 1].id + 1 

           let obj = {id ,name: category, status:false}
           arr = [...nameArr, obj]

           let str = JSON.stringify(arr)
           localStorage.setItem('names', str)
           dispatch(setCategoriesAction(arr))
        }

        setCategory('')
        props.history.push("/")
    }

    return (
        <div className="addCategory-container">
            <div className="addCategory-form-wrapper">
                <form className="addCategory-form" >

                    <TextField
                        id="outlined-password-input"
                        label="Add Category"
                        autoComplete="current-password"
                        variant="outlined"
                        onChange={nameHandler}
                    />

                    { error ? 
                        <>
                            <Alert className={classes.root} severity="error">Enter a valid Category</Alert>
                        </>
                    : null
                    }

                    <Button style={{ marginTop: "4%" }}
                        variant="contained"
                        color="primary"
                        onClick={submitHandler}
                        href="#contained-buttons">
                        Add
                    </Button>

                </form>
            </div>
        </div>
    )
}

export default AddCategory