import {
    IonButton, IonButtons,
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
import React, {useCallback, useEffect, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {pinOutline} from "ionicons/icons";
import {NewStationModal} from "../components/station-modal/NewStationModal";
import {store} from "../App";
import sortBy from "lodash/sortBy";
import {ListSorter} from "../components/stations-list/ListSorter";

const HomeTab: React.FC = () => {
    const [wienerLinienStations] = useAtom(wienerLinienStationsAtom);
    const [isOpen, setIsOpen] = useState(false);

    const [stations, setStations] = useState<Station[]>();

    useEffect(() => {
        if (wienerLinienStations?.data!==undefined) {
            setStations(wienerLinienStations.data);
        }
    }, [wienerLinienStations?.data]);

    console.log("Stations:", wienerLinienStations)


    const handleAddNewStation = (
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

        // @ts-ignore
        const newStationList = [addedStation, ...stations];

        console.log("New List", newStationList)


        setStations(newStationList);
        setIsOpen(false);

        saveDataToStorage(newStationList);


    }
    const saveDataToStorage = async (stations: Station[] | undefined) => {
        try {
            await store.set("stationData", JSON.stringify(stations))
            alert("New station saved to storage")
        } catch (error) {
            console.log("Error saving data to storage", error)
        }

    };

    const sortListByName = () => {
        const stationsByName = [... stations].sort((a, b) =>
            a.NAME.localeCompare(b.NAME));
        setStations(stationsByName)
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
                    {stations?.map((station, index) => (
                        <IonItem key={index}>
                            <IonIcon icon={pinOutline}/>{station.NAME} ({station.GEMEINDE})
                        </IonItem>

                    ))}

                </IonList>
            </IonContent>

            <IonModal isOpen={isOpen}>
                <NewStationModal onAdd={handleAddNewStation} onClose={() => setIsOpen(false)}/>
            </IonModal>
            <IonButtons slot="end">
                <IonButton onClick={sortListByName}> Sort by name </IonButton>
                <IonButton> Sort by position </IonButton>
            </IonButtons>

        </IonPage>
    );
};

export default HomeTab;
