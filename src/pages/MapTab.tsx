import {IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {MapContainer, TileLayer, Marker} from "react-leaflet";
import './MapTab.css';
import "leaflet/dist/leaflet.css"
import React from "react";
import {useAtom} from "jotai";
import {wienerLinienStationsAtom} from "../atoms/wiener-linien-stations.atom";
import L, {Icon, LatLngBoundsExpression, LatLngExpression} from 'leaflet';
import {pinSharp} from "ionicons/icons";
import customIconUrl from "../../resources/location-pin.png"

const MapTab = () => {
    const [stations] = useAtom(wienerLinienStationsAtom);
    /*const stations = async () => {
        await store.get("stationData")
    }*/
    const center: LatLngExpression = [48.210033, 16.363449];
    const bounds: LatLngBoundsExpression = [
        [48.110033, 16.263449], // Southwest corner
        [48.310033, 16.463449], // Northeast corner
    ];
    console.log("StationData:", stations.data)


    const customIcon = new L.Icon({
        iconUrl: customIconUrl,
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
                center={center}
                zoom={13}
                maxBounds={bounds}
                maxBoundsViscosity={1.0}
            >

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    noWrap={true}
                    updateWhenIdle={false}
                    keepBuffer={8}
                />

                {stations?.data?.map(((station, index) => (
                    <Marker key={index} position={[station.WGS84_LAT, station.WGS84_LON]} icon={customIcon}></Marker>
                )))}

            </MapContainer>


        </IonPage>
    );
};

export default MapTab;
