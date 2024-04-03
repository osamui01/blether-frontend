import { useState } from "react"
import "../../styles/lists/SearchForm.css"

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
        <div className="searching">
        <form onSubmit={handleSubmit}>
        <input 
        type = "text"
        value = {searchInput}
        onChange={handleInputChange}
        placeholder="Search..."
         ></input>
         <input type = "submit" />
         </form>
         </div>
        </>
    )
}

export default SearchForm;