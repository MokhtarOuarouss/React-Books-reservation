import React from 'react';

type SearchComponentProps = {
    onSearch: (query: string) => void;
    searchName : string;
    handleChange:(e:any) => void;
    
};

const SearchComponent: React.FC<SearchComponentProps> = ({ searchName, handleChange, onSearch }) => {

    const handleSearch = () => {
        onSearch(searchName);
    };

    return (
        <div>
            
            <input
                type="text"
                placeholder="Search..."
                value={searchName}
                onChange={handleChange}
                name='search'
                autoComplete='on'

            />
                <button onClick={handleSearch}> Search </button>
            
        </div>
    );
};

export default SearchComponent;
