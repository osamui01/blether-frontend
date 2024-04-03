import { useState } from "react"

const SearchForm = ({handleSearch}) => {

    const [searchInput, setSearchInput] = useState("")

    const handleInputChange = (event) => {
        const searchItem = event.target.value;
        setSearchInput(searchItem);
        if (searchItem === "")
        {
            handleSearch(searchItem);
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch(searchInput);
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
        <input 
        type = "text"
        value = {searchInput}
        onChange={handleInputChange}
        placeholder="Search..."
         ></input>
         <input type = "submit" />
         </form>
        </>
    )
}

export default SearchForm;