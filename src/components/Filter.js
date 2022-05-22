import { useEffect, useState } from "react";
import { useEventState } from "../contexts/EventProvider";
import { useInstractureState } from "../contexts/InfrastructureProvider";
import { useFilterState } from "../contexts/FilterProvider";

export default function Filter(props) {
    const { setEventParams } = useEventState();
    const { setInfrastructureParams } = useInstractureState();

    const { 
        filter,
        setFilter,
        radius, 
        setRadius, 
        position, 
        setPosition, 
        exists: geoQuery, 
        setExists: setGeoQuery, 
        existsAfter: useAfter, 
        setExistsAfter: setUseAfter, 
        after, setAfter
    } = useFilterState();

    const [canApply, setCanApply] = useState(false);

    const applyFilter = ()=> {
        setEventParams({
            ...(geoQuery ? {
                lat: position[0],
                long: position[1],
                dist: radius
            }: {}),
            ...(useAfter ? {
                after
            }: {}),
        });
        setInfrastructureParams({
            ...(geoQuery ? {
                lat: position[0],
                long: position[1],
                dist: radius
            }: {})
        });
        setFilter({
            ...(geoQuery ? {
                lat: position[0],
                long: position[1],
                dist: radius
            }: {}),
            ...(useAfter ? {
                after
            }: {}),
        })
    }

    useEffect(()=> {
        if(!geoQuery && filter?.lat !== undefined) return setCanApply(true);
        if(geoQuery
            && (
                filter?.lat !== position[0]
                    || filter?.long !== position[1]
                    || filter?.dist !== radius
            )) return setCanApply(true);
        if(!useAfter && filter?.after !== undefined)
            return setCanApply(true);
        if(useAfter && filter?.after !== after)
            return setCanApply(true);
        return setCanApply(false)
    }, [filter, geoQuery, position, radius, useAfter, after]);


    const getCurrentLoc = ()=> navigator.geolocation.getCurrentPosition((pos)=>{
        setPosition([pos.coords.latitude, pos.coords.longitude])
    });

	return (
		<div className="filter-panel">
            <div>
                <label>Geo Query: </label>
                <input type="checkbox" checked={geoQuery} onChange={e=>setGeoQuery(e.target.checked)}/>
                {geoQuery ? <div>
                    <label>Latitide: </label><br/>
                    <input type="number" placeholer="Latitide" value={position[0]} onChange={(e) => setPosition([+e.target.value, position[1]])}/>
                    <br/>

                    <label>Longitude: </label><br/>
                    <input type="number" placeholer="Longitude" value={position[1]} onChange={(e) => setPosition([position[0], +e.target.value])}/>
                    
                    <button style={({ "marginLeft": '20px' })} onClick={getCurrentLoc}>Current Position</button><br/>

                    <label>Radius (meters): </label><br/>
                    <input type="number" placeholer="Radium in meters" value={radius} onChange={(e) => setRadius(+e.target.value)}/>
                </div>: null }
                <hr/>

                <label>After: </label>
                <input type="checkbox" checked={useAfter} onChange={e=>setUseAfter(e.target.checked)}/>
                {useAfter ? <div>
                    <input type="datetime-local" value={after.toISOString().slice(0,16)} onChange={e=>setAfter(new Date(e.target.value))}/>
                </div>: null }
                <hr/>
                

                <button onClick={applyFilter} disabled={!canApply}>Apply</button>

                <br/>
                Applied Filter: { JSON.stringify(filter) }
            </div>
        </div>
	);
}
