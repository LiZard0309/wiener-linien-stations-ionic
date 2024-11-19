import './AboutTheApp.css'
import {IonItem, IonItemDivider, IonItemGroup, IonLabel, IonText} from "@ionic/react";
import packageInfo from "../../../package.json"

export const AboutTheApp = () => {
    const appVersion = packageInfo.version;
    const appName = packageInfo.name;


    return (
        <div id="about-container">

            <IonItemGroup id="app-info-list">
                <IonItemDivider>
                    <IonLabel><IonText>About the app </IonText></IonLabel>
                </IonItemDivider>
                <IonItem>
                    App Name: {appName}
                </IonItem>
                <IonItem>
                    App Version: {appVersion}
                </IonItem>
            </IonItemGroup>


        </div>
    );
};