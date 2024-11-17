import {IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './HomeTab.css';
import {useAtom, useAtomValue} from "jotai";
import {wienerLinienStationsAtom} from "../atoms/wiener-linien-stations.atom";
import React, {useEffect, useState} from "react";
import Papa from "papaparse";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const HomeTab: React.FC = () => {
    const [wienerLinienStations] = useAtom(wienerLinienStationsAtom);




    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>List of Wiener Linien Stations</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonList>
                {wienerLinienStations?.data?.map((station, index) => (
                    <IonItem key={index}>
                        {station.NAME} ({station.GEMEINDE})
                    </IonItem>

                ))}

            </IonList>


        </IonPage>
    );
};

export default HomeTab;
