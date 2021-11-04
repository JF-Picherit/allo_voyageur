import useGeoLocation from "../../hooks/useGeoLocation";

const GeoLocation = () => {

    const location = useGeoLocation();

    return (
        <>
           {location.loaded ? JSON.stringify(location): "Location data not available yet."}
        </>
    );
};

export default GeoLocation;