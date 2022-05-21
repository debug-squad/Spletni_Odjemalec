import { useClientState } from '../contexts/ClientProvider';
import { useEventState } from '../contexts/EventProvider';
import { useInstractureState } from '../contexts/InfrastructureProvider';
import { MapContainer, TileLayer, useMap, Marker, Popup, GeoJSON } from 'react-leaflet'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CITY_CENTER = [46.55372, 15.64767];

export default function MapView(){
    const {client, token} = useClientState();
    const {events} = useEventState();
    const {infrastructures} = useInstractureState();

    return(
        <>
            <MapContainer
                center={CITY_CENTER}
                zoom={12}
                maxZoom={20}
                attributionControl={true}
                zoomControl={true}
                doubleClickZoom={true}
                scrollWheelZoom={true}
                dragging={true}
                animate={true}
                easeLinearity={0.35}
            >
                <TileLayer
                    noWrap={true}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {events.map(event=>
                    <Marker key={event._id} position={event.location.coordinates} draggable>
                        <Popup>
                            <Link to={ '/event/' + event._id }>E:{event.title}</Link>
                        </Popup>
                    </Marker>
                )}

                {infrastructures.map(infra=>
                    <Marker key={infra._id} position={infra.location.coordinates} draggable>
                        <Popup>
                            <Link to={ '/infrastructure/' + infra._id }>I:{infra.title}</Link>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </>
    );
}