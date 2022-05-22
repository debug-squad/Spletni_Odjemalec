import { useClientState } from '../contexts/ClientProvider';
import { useEventState } from '../contexts/EventProvider';
import { useInstractureState } from '../contexts/InfrastructureProvider';
import { MapContainer, TileLayer, useMap, Marker, Popup, GeoJSON, Circle, CircleMarker } from 'react-leaflet'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Filter from '../components/Filter';
import LocationProvider, { useLocationState } from '../contexts/LocationProvider';
import L from 'leaflet';


const userIcon = L.divIcon({
    className: 'custom-div-icon',
    html: "<i class='material-icons' style='color:black;'>adjust</i>",
    iconSize: [30, 42],
    iconAnchor: [15, 42]
});

const infrastructureIcon = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:gray;' class='marker-pin'></div><i style='color:white;' class='material-icons'>store</i>",
    iconSize: [30, 42],
    iconAnchor: [15, 42]
});

const eventIcon = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:blue;' class='marker-pin'></div><i tyle='color:white;' class='material-icons'>event</i>",
    iconSize: [30, 42],
    iconAnchor: [15, 42]
});


const CITY_CENTER = [46.55372, 15.64767];

export default function MapView(){
    const {events} = useEventState();
    const {infrastructures} = useInstractureState();

    const { radius, position, exists, setPosition } = useLocationState();

    const onDragMe = (e) => setPosition([e.latlng.lat, e.latlng.lng]);

    return(
        <div className='map-container'>
            <Filter />
            <MapContainer
                center={CITY_CENTER}
                zoom={13}
                maxZoom={20}
                attributionControl={true}
                zoomControl={true}
                doubleClickZoom={true}
                scrollWheelZoom={true}
                dragging={true}
                animate={true}
                easeLinearity={0.35}
                className='map-view'
            >
                <TileLayer
                    noWrap={true}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {events.map(event=>
                    <Marker key={event._id} position={event.location.coordinates} icon={eventIcon}>
                        <Popup>
                            <Link to={ '/event/' + event._id }>E:{event.title}</Link>
                        </Popup>
                    </Marker>
                )}

                {infrastructures.map(infra=>
                    <Marker key={infra._id} position={infra.location.coordinates} icon={infrastructureIcon}>
                        <Popup>
                            <Link to={ '/infrastructure/' + infra._id }>I:{infra.title}</Link>
                        </Popup>
                    </Marker>
                )}

                {exists ? <>
                    <Marker key="you-marker" position={position} draggable eventHandlers={({ drag: onDragMe })} icon={userIcon}>
                        <Popup>
                            {JSON.stringify(position) }
                        </Popup>
                    </Marker>
                    <Circle key="you-rad" center={position} radius={radius}/>
                </>:null }

                </MapContainer>
        </div>
    );
}