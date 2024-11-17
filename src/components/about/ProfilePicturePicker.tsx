import React, {useState} from "react";
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {IonAvatar, IonButton, IonItem} from "@ionic/react";
import "./ProfilePicturePicker.css"


const ProfilePicturePicker: React.FC = () => {

    const [profilePicture, setProfilePicture] = useState<string>("https://randomuser.me/api/portraits/lego/0.jpg");

    const selectImage = async () => {
        try {

            const userImage = await Camera.getPhoto({
                quality: 100,
                resultType: CameraResultType.DataUrl,
                source: CameraSource.Photos
            });

            setProfilePicture(userImage.dataUrl || '');

        } catch (error) {
            console.log("Error selecting image", error);
        }
    };

    return (
        <>

                <IonItem>
                    <IonAvatar aria-hidden="true" slot="start">
                        <img alt="userimage of developer" src={profilePicture}/>
                    </IonAvatar>
                </IonItem>
                <IonItem>
                    <IonButton aria-hidden="true" slot="start" onClick={selectImage}>Upload different image </IonButton>
                </IonItem>

        </>
    );
};

export default ProfilePicturePicker;