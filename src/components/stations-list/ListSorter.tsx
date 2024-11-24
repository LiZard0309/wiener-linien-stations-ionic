import {IonButton, IonButtons} from "@ionic/react";
import {Station} from "../../atoms/wiener-linien-stations.atom";
import React from "react";

interface ListSorterProps {
    stations: Station[];
    setStations: React.Dispatch<React.SetStateAction<Station[]>>;
    defaultLocation: { latitude: number, longitude: number };
}

export const ListSorter: React.FC<ListSorterProps> = ({
                                                          stations,
                                                          setStations,
                                                          defaultLocation
                                                      }) => {

    const sortListByName = () => {
        const stationsByName = [...stations].sort((a, b) =>
            a.NAME.localeCompare(b.NAME));
        setStations(stationsByName)
    };

    const sortListByPosition = () => {
        const stationsByPosition = [...stations].sort((a, b) =>{
            const distanceA = Math.sqrt(
                Math.pow(a.WGS84_LAT - defaultLocation.latitude, 2) + Math.pow(a.WGS84_LON - defaultLocation.longitude, 2)
            );
            const distanceB = Math.sqrt(
                Math.pow(b.WGS84_LAT - defaultLocation.latitude, 2) + Math.pow(b.WGS84_LON - defaultLocation.longitude, 2)
            );
            return distanceA - distanceB;
        });
        setStations(stationsByPosition);
    };


    return (
        <IonButtons slot="end">
            <IonButton fill="outline" color="medium" onClick={sortListByName}> Sort by name </IonButton>
            <IonButton fill="outline" color="medium" onClick={sortListByPosition}> Sort by position </IonButton>
        </IonButtons>

    );
};