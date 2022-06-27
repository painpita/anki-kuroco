import SearchBar from "material-ui-search-bar";
import React, {useState} from "react"
// *snip*
 
const KanjiSearchBar = () => {

    const [ value, setValue ] = useState()
    const doSomethingWith = (value) => {

    }
    return (
        <SearchBar
          value={value}
          onChange={(newValue) => setValue(newValue)}
          onRequestSearch={() => doSomethingWith(value)}
        />
      );
}

export default KanjiSearchBar
