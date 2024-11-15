import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './AboutTab.css';
import {AboutTheApp} from "../components/AboutTheApp";
import {AboutTheDeveloper} from "../components/AboutTheDeveloper";

const AboutTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="small">About the app</IonTitle>
          </IonToolbar>
        </IonHeader>

            <AboutTheApp />
            <AboutTheDeveloper />

      </IonContent>
    </IonPage>
  );
};

export default AboutTab;
