import {IonButton, IonHeader, IonIcon, IonItem, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import './MapTab.css';
import "leaflet/dist/leaflet.css"
import React, {useEffect, useState} from "react";
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
    //const [watchId, setWatchId] = useState<string | null>(null);

    console.log("StationData:", stations.data)

    useEffect(() => {
        const fetchCurrentPosition = async () => {
            const permission = await Geolocation.requestPermissions();

            if (permission.location == "granted" || permission.coarseLocation == "granted") {
                const userPosition = await Geolocation.getCurrentPosition();
                const {latitude, longitude} = userPosition.coords;
                setCurrentLocation([latitude, longitude])
            }

        };

        fetchCurrentPosition()
            .then(() => console.log("Location fetched successfully"))
            .catch((error) => {
                console.error("Error fetching device location", error);
            })

        const watchForLocationUpdates = async () => {
            const locationWatchId = await Geolocation.watchPosition({}, (position, err) => {
                if (err) {
                    console.error("Error watching for location updates:", err);
                    return;
                }
                if (position) {
                    const {latitude, longitude} = position.coords;

                    console.log("Geolocation updated - new location:", position.coords);
                    setCurrentLocation([latitude, longitude]);
                }
            });

            return () => {
                Geolocation.clearWatch({id: locationWatchId})
            }
        }
        watchForLocationUpdates().then(() => console.log("Location successfully updated"))

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
