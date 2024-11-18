import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact, useIonViewWillLeave
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {home, information, map} from 'ionicons/icons';
import HomeTab from './pages/HomeTab';
import MapTab from './pages/MapTab';
import AboutTab from './pages/AboutTab';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import {useAtom} from "jotai";
import {wienerLinienStationsAtom} from "./atoms/wiener-linien-stations.atom";
import {Storage} from '@ionic/storage';
import {useEffect, useState} from "react";


setupIonicReact();

export const store = new Storage();

const App: React.FC = () => {

    const [isStorageReady, setIsStorageReady] = useState(false);

    useEffect(() => {
        const initializeStorage = async () => {
            await store.create();
            setIsStorageReady(true);
        };
        initializeStorage().then(r => console.log("Storage initialized", store));
    }, []);

    if (!isStorageReady) {
        return <div> Loading ... </div>
    }


    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route exact path="/home">
                            <HomeTab/>
                        </Route>
                        <Route exact path="/map">
                            <MapTab/>
                        </Route>
                        <Route path="/about">
                            <AboutTab/>
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/home"/>
                        </Route>
                    </IonRouterOutlet>

                    <IonTabBar slot="bottom">
                        <IonTabButton tab="home" href="/home">
                            <IonIcon aria-hidden="true" icon={home}/>
                            <IonLabel>Home</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="map" href="/map">
                            <IonIcon aria-hidden="true" icon={map}/>
                            <IonLabel>Map</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="about" href="/about">
                            <IonIcon aria-hidden="true" icon={information}/>
                            <IonLabel>About</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
