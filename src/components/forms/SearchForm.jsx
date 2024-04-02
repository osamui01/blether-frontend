import { useState } from "react"
const SearchForm = () => {

    const [searchInput, setSearchInput] = useState("")

    const handleInputChange = (event) => {
        const searchItem = event.target.value;
        setSearchInput(searchItem);
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