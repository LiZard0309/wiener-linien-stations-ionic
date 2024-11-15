import './AboutTheApp.css'
import {IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonText, IonTitle} from "@ionic/react";

export const AboutTheApp = () => {
    return (
        <div id="about-container">

            <IonItemGroup id="app-info-list">
                <IonItemDivider>
                    <IonLabel><IonText>About the app </IonText></IonLabel>
                </IonItemDivider>
                <IonItem>
                    App Name: Wiener Linien Stations
                </IonItem>
                <IonItem>
                    App Version: 0.0.1
                </IonItem>
                <IonItem>
                    React-Version: 18.2.0
                </IonItem>

                <IonItem>
                    Capacitor-Version: 6.1.2
                </IonItem>

                <IonItem>
                    Ionic-React Version: 8.0.0
                </IonItem>

            </IonItemGroup>


        </div>
    );
};