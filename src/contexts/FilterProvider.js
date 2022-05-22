import { createContext, useContext, useState } from 'react';

export const FilterContext = createContext({
    filter: {},
    setFilter: (filter) => {},

    exists: false,
    setExists: (exists) => {},

    position: [0, 0],
    setPosition: (position) => {},

    radius: 0,
    setRadius: (radius) => {},

    existsAfter: false,
    setExistsAfter: (exists) => {},

    after: new Date(),
    setAfter: (after) => {}
});
export const useFilterState = () => useContext(FilterContext);

export function FilterProvider({children}){
    const [exists, setExists] = useState(false);
    const [position, setPosition] = useState([46.55372, 15.64767]);
    const [radius, setRadius] = useState(5_000);


    const [ existsAfter, setExistsAfter ] = useState(false);
    const [ after, setAfter ] = useState(new Date());

    const [filter, setFilter] = useState({});

    const value = {
        filter,
        setFilter: (filter) => setFilter(filter),
        //
        //
        //

        exists,
        setExists: (exists) => setExists(exists),

        position,
        setPosition: (position) => setPosition(position),

        radius,
        setRadius: (radius) => setRadius(radius),

        //
        //
        //

        existsAfter,
        setExistsAfter: (existsAfter) => setExistsAfter(existsAfter),

        after,
        setAfter: (after) => setAfter(after),
    };

    return (
       <FilterContext.Provider value={value}>
        {children}
       </FilterContext.Provider>
    )
}
export default FilterProvider;