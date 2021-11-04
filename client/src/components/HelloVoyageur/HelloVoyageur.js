import React, { useEffect, useState } from 'react';
import useGeoLocation from "../../hooks/useGeoLocation";
import userService from "../../services/UserServices";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import PersonPinCircleOutlinedIcon from '@mui/icons-material/PersonPinCircleOutlined';

const HelloVoyageur = () => {

    const [openMap, setOpenMap] = useState(false);
    const [travelersData, setTravelersData] = useState([]);
    const {location, callGeoLocation} = useGeoLocation();
    const [markers, setMarkers] = useState(<></>);
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        zoom: 10
    });

    const [selectedTraveler, setSelectedTraveler] = useState(null);

    useEffect(() => {
        callGeoLocation();
        const listener = e => {
            if (e.key === "Escape") {
            setSelectedTraveler(null);
            }
        };
        window.addEventListener("keydown", listener);
    
        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, []);

    useEffect(() => {
        console.log(location.loaded);
        if(location.loaded) {
            console.log(location.coordinates);
            setViewport((vp) => ({ ...vp, latitude: location.coordinates.lat, longitude: location.coordinates.lng }));
            userService.findTravelersAround(location.coordinates).then((travelers) => {
                console.log(travelers);
                setTravelersData(travelers.data);
            });
        }
    }, [location]);

    useEffect(() => {
        if(location.loaded && travelersData && Object.keys(travelersData).length !== 0) {
            console.log(travelersData);
            const myMarkers = travelersData.map(traveler => (
                <Marker key={traveler.id} latitude={traveler.lat} longitude={traveler.lng}>
                    <span onClick={e => { e.preventDefault(); setSelectedTraveler(traveler); }} >
                        <PersonPinCircleOutlinedIcon style={{ fontSize: 40 }} />
                    </span>
                </Marker>
            ));
            setMarkers(myMarkers);
            setOpenMap(true);
        }
    }, [travelersData, location]);

    return (
        <>
            {(openMap) && (
                <ReactMapGL
                   {...viewport}
                   mapboxApiAccessToken="pk.eyJ1IjoiamYtcHMiLCJhIjoiY2t2aHZ6a202MmdlbDMxcGd1czlsZGd6aSJ9.2WKXsUcIweQ1TTha53hBhg"
                   mapStyle="mapbox://styles/jf-ps/ckvdw1n4g25s915tfl6if73sd"
                   onViewportChange={viewport => { setViewport(viewport); }}
               >
                   {markers}
   
                   {selectedTraveler && (
                        <Popup
                            latitude={selectedTraveler.lat}
                            longitude={selectedTraveler.lng}
                            onClose={() => {
                                setSelectedTraveler(null);
                            }}
                        >
                            <div>
                                <h2>{`${selectedTraveler.first_name} ${selectedTraveler.last_name}`}</h2>
                                <p>{"Voici une description du voyageur sur le quel vous avez cliquer..."}</p>
                            </div>
                        </Popup>
                   )}
               </ReactMapGL>
            )}
        </>
    );
};

export default HelloVoyageur;
