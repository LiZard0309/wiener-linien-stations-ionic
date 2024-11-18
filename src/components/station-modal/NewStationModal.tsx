import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput, IonItem,
    IonList,
    IonToolbar
} from "@ionic/react";
import "./NewStationModal.css"
import {useState} from "react";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

interface NewStationModalProps {
    onAdd: (name: string, gemeinde: string, latitude: number, longitude: number) => void;
    onClose: () => void;
}

export const NewStationModal: React.FC<NewStationModalProps> = ({onAdd, onClose}) => {
    const [newStationName, setNewStationName] = useState<string>();
    const [newCityName, setNewCityName] = useState<string>();
    const [newLatitude, setNewLatitude] = useState<number>();
    const [newLongitude, setNewLongitude] = useState<number>();

    const validateInput = () => {

        if (!newStationName || !newCityName || !newLatitude || !newLongitude) {
            alert("Please fill out all the fields below");
            console.log("Data is missing");
            return false;
        }
        if (isNaN(newLongitude) || isNaN(newLatitude)) {
            alert("Invalid location data");
            console.log("Longitude or latitude are invalid");
            return false;
        }
        console.log("Input Data: ", newStationName, newCityName, newLatitude, newLongitude);
        return true;
    }

    const addStationData = () => {
        const isInputValid = validateInput();

        if (isInputValid) {
            onAdd(String(newStationName), String(newCityName), Number(newLatitude), Number(newLongitude));

            setNewStationName("");
            setNewCityName("");
            setNewLatitude(0);
            setNewLongitude(0);
        }
    }


    return (
        <IonContent>
            <IonHeader>
                <IonToolbar>Add new station</IonToolbar>


            </IonHeader>

            <IonList id="input-list">
                <IonItem>
                    <IonInput
                        label="Station name"
                        labelPlacement="stacked"
                        placeholder="Enter text"
                        type="text"
                        value={newStationName}
                        onIonInput={(e: any) => setNewStationName(e.target.value)}/>
                </IonItem>
                <IonItem>
                    <IonInput
                        label="City"
                        labelPlacement="stacked"
                        placeholder="Enter text"
                        type="text"
                        value={newCityName}
                        onIonInput={(e: any) => setNewCityName(e.target.value)}/>
                </IonItem>
                <IonItem>
                    <IonInput
                        label="Latitude"
                        labelPlacement="stacked"
                        placeholder="Enter text"
                        type="number"
                        value={newLatitude}
                        onIonInput={(e: any) => setNewLatitude(e.target.value)}/>
                </IonItem>
                <IonItem>
                    <IonInput
                        label="Longitude"
                        labelPlacement="stacked"
                        placeholder="Enter text"
                        type="number"
                        value={newLongitude}
                        onIonInput={(e: any) => setNewLongitude(e.target.value)}/>
                </IonItem>

            </IonList>

            <div id="button-container">

                <IonButton shape="round" onClick={addStationData}>Add station </IonButton>
                <IonButton shape="round" color="medium" onClick={onClose}>Close </IonButton>

            </div>
        </IonContent>
    )
        ;
};