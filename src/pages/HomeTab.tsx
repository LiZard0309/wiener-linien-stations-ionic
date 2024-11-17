import {IonHeader, IonList, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './HomeTab.css';
import {useAtom} from "jotai";
import {wienerLinienStationsAtom} from "../atoms/wiener-linien-stations.atom";
import React, {useEffect, useState} from "react";
import Papa from "papaparse";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const HomeTab: React.FC = () => {
    const [wienerLinienStations] = useAtom(wienerLinienStationsAtom);


    const [stationsData, setStationsData] = useState<any[]>([]);


    useEffect(() => {
        if (!wienerLinienStations) return;

        // @ts-ignore
        Papa.parse(wienerLinienStations, {
            header: true,
            complete: (result) => {
                const validData = result.data.filter((item: any) => {
                    return (
                        item.NAME &&
                        item.GEMEINDE &&
                        !isNaN(item.WGS84_LAT) &&
                        !isNaN(item.WGS84_LON)
                    )
                });

                console.log("Data:", validData);


                // @ts-ignore
                setStationsData(validData);
            },
            error: (error: any) => {
                console.error("error fetching csv: ", error);
            }
        });
    }, [wienerLinienStations]);


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>List of Wiener Linien Stations</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonList>


            </IonList>


        </IonPage>
    );
};

export default HomeTab;
