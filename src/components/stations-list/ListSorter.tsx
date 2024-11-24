import {IonButton, IonButtons} from "@ionic/react";
import {useAtom} from "jotai";
import {wienerLinienStationsAtom} from "../../atoms/wiener-linien-stations.atom";
import sortBy from 'lodash/sortBy';
import React from "react";

export const ListSorter = () => {

    const [wienerLinienStations] = useAtom(wienerLinienStationsAtom)




    return (



    );
};