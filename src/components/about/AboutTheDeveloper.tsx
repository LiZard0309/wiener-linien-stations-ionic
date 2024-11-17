import "./AboutTheDeveloper.css"
import {
    IonItem, IonItemDivider,
    IonItemGroup, IonLabel,
    IonText
} from "@ionic/react";
import {DeveloperLocationMap} from "./DeveloperLocationMap";
import ProfilePicturePicker from "./ProfilePicturePicker";

export const AboutTheDeveloper = () => {


    return (
        <div id="about-the-developer-container">
            <IonItemGroup>
                <IonItemDivider>
                    <IonLabel><IonText>Developer </IonText></IonLabel>
                </IonItemDivider>

                <IonItem>
                    <ProfilePicturePicker/>
                </IonItem>

                <IonItem>
                    Name: Lisa Hofbauer

                </IonItem>
                <IonItem>
                    Hochstädtplatz 6, 1200 Wien

                </IonItem>
                <IonItem><DeveloperLocationMap/>

                </IonItem>


            </IonItemGroup>


        </div>
    );
};