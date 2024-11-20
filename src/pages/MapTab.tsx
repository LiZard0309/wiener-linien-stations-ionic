import {IonButton, IonButtons, IonHeader, IonIcon, IonItem, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet";
import './MapTab.css';
import "leaflet/dist/leaflet.css"
import React, {useEffect, useRef, useState} from "react";
import {useAtom} from "jotai";
import {wienerLinienStationsAtom} from "../atoms/wiener-linien-stations.atom";
import L, {LatLng, LatLngExpression, LatLngLiteral} from 'leaflet';
import customStationMarkerUrl from "../../resources/location-pin.png"
import {Geolocation} from "@capacitor/geolocation";
import customUserLocationMarkerUrl from "../../resources/pin-karte.png";
import {navigateCircle} from "ionicons/icons";

const MapTab = () => {
    const [stations] = useAtom(wienerLinienStationsAtom);
    const center: [number, number] = [48.210033, 16.363449];
    const [currentLocation, setCurrentLocation] = useState<LatLngExpression | null>(null);


    console.log("StationData:", stations.data)

    const fetchCurrentPosition = async () => {
        try {
            const userPosition = await Geolocation.getCurrentPosition();

            const {latitude, longitude} = userPosition.coords;

            setCurrentLocation([latitude, longitude])

        } catch (error) {
            console.log("Error fetching device location", error)
            alert("Unable to fetch location. Please ensure location permissions are enabled.");
        }
    };


    useEffect(() => {
        fetchCurrentPosition();
    }, []);

    const RecenterButton = () => {
        const map = useMap();
        const handleZoomToCurrentPosition = () => {
            console.log("Current Loc", currentLocation)
            map.flyTo(currentLocation as LatLng | LatLngLiteral | [number, number, number | undefined], 16);
        };

        return (

            <IonItem id="location-button-item" lines="none">
                <IonButton
                    id="location-button"
                    aria-hidden="true"
                    shape="round"
                    color="medium"
                    onClick={handleZoomToCurrentPosition}>

                    <IonIcon slot="end" icon={navigateCircle}></IonIcon>
                    Go to user location
                </IonButton>
            </IonItem>
        );
    };


    const customIcon = new L.Icon({
        iconUrl: customStationMarkerUrl,
        iconSize: [32, 32] // Adjust size to fit your design

    });

    const locationIcon = new L.Icon({
        iconUrl: customUserLocationMarkerUrl,
        iconSize: [32, 32] // Adjust size to fit your design

    });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Map</IonTitle>

                </IonToolbar>

            </IonHeader>

            <MapContainer
                id="map"
                center={currentLocation || center}
                zoom={13}
                ref={(mapRef) => (
                    setTimeout(() => {
                        mapRef?.invalidateSize();
                    }, 500)
                )}
            >


                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {stations?.data?.map(((station, index) => (
                    <Marker key={index} position={[station.WGS84_LAT, station.WGS84_LON]} icon={customIcon}>
                        <Popup closeOnClick={true}> {station.NAME} ({station.GEMEINDE})</Popup>
                    </Marker>
                )))}


                {currentLocation && (
                    <Marker position={currentLocation} icon={locationIcon}>
                        <Popup closeOnClick={true}> User Location </Popup>
                    </Marker>
                )}

                <RecenterButton/>
            </MapContainer>


        </IonPage>
    );
};

export default MapTab;
