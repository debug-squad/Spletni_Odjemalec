import { useEffect, useState } from "react";
import { useEventState } from "../contexts/EventProvider";
import { useInstractureState } from "../contexts/InfrastructureProvider";
import { useLocationState } from "../contexts/LocationProvider";

export default function Filter(props) {
    const { setEventParams } = useEventState();
    const { setInfrastructureParams } = useInstractureState();

    const { radius, setRadius, position, setPosition, exists: geoQuery, setExists  } = useLocationState();

    const [filter, setFilter] = useState({});
    const [canApply, setCanApply] = useState(false);

    const applyFilter = ()=> {
        setEventParams({
            ...(geoQuery ? {
                lat: position[0],
                long: position[1],
                dist: radius
            }: {})
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
            }: {})
        })
    }

    useEffect(()=> {
        if(!geoQuery && filter.lat !== undefined) return setCanApply(true);
        if(geoQuery
            && (
                filter?.lat !== position[0]
                    || filter?.long !== position[1]
                    || filter?.dist !== radius
            )) return setCanApply(true);
        return setCanApply(false)
    }, [filter, geoQuery, position, radius]);


    const getCurrentLoc = ()=> navigator.geolocation.getCurrentPosition((pos)=>{
        setPosition([pos.coords.latitude, pos.coords.longitude])
    });

	return (
		<div className="filter-panel">
            <div>
                <label>Geo Query: </label>
                <input type="checkbox" checked={geoQuery} onChange={e=>setExists(e.target.checked)}/>
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

                <button onClick={applyFilter} disabled={!canApply}>Apply</button>

                <br/>
                Applied Filter: { JSON.stringify(filter) }
            </div>
        </div>
	);
}
