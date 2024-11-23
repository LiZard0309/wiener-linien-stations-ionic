import {IonButton, IonButtons} from "@ionic/react";
import {useAtom} from "jotai";
import {wienerLinienStationsAtom} from "../../atoms/wiener-linien-stations.atom";
import sortBy from 'lodash/sortBy';
import React from "react";

export const ListSorter = () => {

    const [wienerLinienStations] = useAtom(wienerLinienStationsAtom)

    const sortListByName = () => {
        console.log("StationsAtom", wienerLinienStations)
        console.log("StationsAtomData", wienerLinienStations.data)
        const stationsByName = wienerLinienStations?.data?.sort((a, b) =>
        a.NAME.localeCompare(b.NAME));
        console.log("Stations by Name", stationsByName)
    }


    return (

        <IonButtons slot="start">
            <IonButton onClick={sortListByName}> Sort by name </IonButton>
            <IonButton> Sort by position </IonButton>
        </IonButtons>

    );
};