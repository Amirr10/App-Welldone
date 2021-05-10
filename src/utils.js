export const getLocalStorageData = () => {
    let str = localStorage.getItem('names')
    let data = JSON.parse(str)
   
    return data
}

export const saveDataLocalStorage = (arr) => {
    let str = JSON.stringify(arr)
    localStorage.setItem('names', str)
}

export const checkLocalStorageExist = () => {

    let data = localStorage.getItem('names')
    let bool = data === null ? null : false

    return bool
}

export const deleteLocalStorageItem = (categories) => {

    if (categories.length === 0) {
        localStorage.removeItem('names')
    } else {
        let str = JSON.stringify(categories)
        localStorage.setItem('names', str)
    }

}
