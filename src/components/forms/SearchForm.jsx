import { useState } from "react"

const SearchForm = ({handleSearch}) => {

    const [searchInput, setSearchInput] = useState("")

    const handleInputChange = (event) => {
        const searchItem = event.target.value;
        setSearchInput(searchItem);
        handleSearch(searchInput);
    }


    return (
        <>
        <input 
        type = "text"
        value = {searchInput}
        onChange={handleInputChange}
        placeholder="Search..."
         ></input>
        
        </>
    )
}

export default SearchForm;