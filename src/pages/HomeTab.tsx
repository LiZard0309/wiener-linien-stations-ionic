import {
    IonButton, IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonList,
    IonModal,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './HomeTab.css';
import {useAtom} from "jotai";
import {Station, wienerLinienStationsAtom} from "../atoms/wiener-linien-stations.atom";
import React, {useEffect, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import {pinOutline} from "ionicons/icons";
import {NewStationModal} from "../components/station-modal/NewStationModal";
import {store} from "../App";
import {ListSorter} from "../components/stations-list/ListSorter";

const HomeTab: React.FC = () => {
    const [wienerLinienStations] = useAtom(wienerLinienStationsAtom);
    const [isOpen, setIsOpen] = useState(false);

    const [stations, setStations] = useState<Station[]>([]);

    const defaultLocation = {latitude: 48.2082, longitude: 16.3738}; //Vienna coords

    useEffect(() => {
        if (wienerLinienStations?.data != undefined) {
            setStations(wienerLinienStations.data);
        } else {
            setStations([]);
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


        const newStationList = [addedStation, ...stations];

        console.log("New List", newStationList)


        setStations(newStationList);
        setIsOpen(false);

        saveDataToStorage(newStationList).then(() => console.log("Saving new Location to storage"));


    }
    const saveDataToStorage = async (stations: Station[] | undefined) => {
        try {
            await store.set("stationData", JSON.stringify(stations))
            alert("New station saved to storage")
        } catch (error) {
            console.log("Error saving data to storage", error)
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>List of Wiener Linien Stations</IonTitle>


                </IonToolbar>

            </IonHeader>
            <IonContent>
                <div>
                    <IonButton id="add-station-button" color="secondary" fill="solid" onClick={() => setIsOpen(true)}>Add new
                        station</IonButton>

                    <div slot="end" id="sorting-list-buttons">
                    <ListSorter
                        stations={stations}
                        setStations={setStations}
                        defaultLocation={defaultLocation}/>
                    </div>
                </div>



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


        </IonPage>
    );
};

export default HomeTab;
