import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonList,
    IonMenu, IonModal,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './HomeTab.css';
import {useAtom} from "jotai";
import {Station, wienerLinienStationsAtom} from "../atoms/wiener-linien-stations.atom";
import React, {useState} from "react";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {pinOutline} from "ionicons/icons";
import {NewStationModal} from "../components/station-modal/NewStationModal";
import {store} from "../App";

const HomeTab: React.FC = () => {
    const [wienerLinienStations, setWienerLinienStations] = useAtom(wienerLinienStationsAtom);

    const [isOpen, setIsOpen] = useState(false);

    const saveDataToStorage = async (updatedStations: Station[]) => {
        await store.set("stationData", JSON.stringify(updatedStations))
        alert("New station saved to storage")
    }

    const handleAddNewStation = async (
        stationName: string,
        cityName: string,
        latitude: number,
        longitude: number
    ) => {

        const addedStation = {
            NAME: stationName,
            GEMEINDE: cityName,
            WGS84_LAT: latitude,
            WGS84_LON: longitude
        };

        console.log("new station", addedStation)

        const updatedStations = [...(wienerLinienStations.data || []), addedStation];
        console.log("Updated Stations: ", updatedStations);


        // @ts-ignore
        setWienerLinienStations(updatedStations);

        await saveDataToStorage(updatedStations)

        setIsOpen(false);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>List of Wiener Linien Stations</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonButton id="add-station-button" color="secondary" onClick={() => setIsOpen(true)}>Add new
                    station</IonButton>
                <IonList>
                    {wienerLinienStations?.data?.map((station, index) => (
                        <IonItem key={index}>
                            <IonIcon icon={pinOutline}/>{station.NAME} ({station.GEMEINDE})
                        </IonItem>

                    ))}

                </IonList>
            </IonContent>

            <IonModal isOpen={isOpen}>
                <NewStationModal onAdd={handleAddNewStation} onClose={() => setIsOpen(false)}/>
            </IonModal>

        </IonPage>
    );
};

export default HomeTab;
