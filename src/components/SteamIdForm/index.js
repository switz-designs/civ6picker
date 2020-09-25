import React, { useState } from 'react'
import * as network from '../../network'
import './SteamIdForm.css'

function SteamIdForm(props) {
    const [steamIdInput, setSteamIdInput] = useState("");
    const [useUserData, setUseUserData] = useState(false);
    const [inputHasChanged, setInputHasChanged] = useState(true);
    const [queryError, setQueryError] = useState({
        error: false,
        errorText: ""
    });

    function handleSubmit(event) {
        // Prevent page from refreshing on form submit
        event.preventDefault();

        // Clear existing errors
        if (queryError.error) {
            setQueryError({
                error: false,
                errorText: ""
            })
        }

        // Check if Enter Steam ID checkbox is checked
        if (useUserData) {
            // Check if user input field is blank
            if (steamIdInput === "") {
                setQueryError({
                    error: true,
                    errorText: "Enter Steam ID"
                })
            }
            // Query API for all achievement/leader data
            else if (inputHasChanged || !props.userData) {
                network.getUserLeaders(steamIdInput, props.setUserDataCallback, props.getRandomLeaderCallback, setQueryError, props.setUsingUserDataCallback, props.setFetchingDataCallback);
                setInputHasChanged(false)
            }
            else if (props.userData) {
                // Get new random leader from existing query data
                props.getRandomLeaderCallback(props.userData)
            }
        }
        else if (inputHasChanged || !props.userData){
            // Query API for achievement/leader data filtered by user ID
            network.getAllLeaders(props.setUserDataCallback, props.getRandomLeaderCallback, setQueryError, props.setUsingUserDataCallback, props.setFetchingDataCallback);
            setInputHasChanged(false)
        }
        else if (props.userData) {
            // Get new random leader from existing query data
            props.getRandomLeaderCallback(props.userData)
        }
    }


    function handleTextChange(event) {
        setSteamIdInput(event.target.value.replace(/[^0-9]/g, '' ));
        setInputHasChanged(true)
    }


    function handleCbChange(event) {
        setUseUserData(!useUserData);
        setInputHasChanged(true)
    }


    return (
        <form id={"steamIdForm"} onSubmit={handleSubmit}>
            <div id={"userInputBox"}>
                <div id={"userInputBar"}>
                    <div className={"steamIdHelpBox"}>
                        <div className={"steamIdHelpIcon"}>
                            ?
                        </div>
                        <div className={"steamIdHelpTextPopup"}>
                            Enter your 17-digit Steam ID here to receive a leader recommendation based on your unearned
                            Steam achievements. Click <a href={"https://www.businessinsider.com/how-to-find-steam-id"} target={"_blank"} rel={"noopener noreferrer"}>here</a> if you need help finding it.
                            <p className={"emphasisText"}>Game Details must be set to public on your Steam profile for this feature to work.</p>
                        </div>
                    </div>

                    <label className={"checkboxLabel"}>
                        Use Steam ID
                        <input id={"cbUseSteamId"} type="checkbox" value={useUserData} onChange={handleCbChange} />
                    </label>
                    <input className={"textInput"} type="text" value={steamIdInput} onChange={handleTextChange} disabled={!useUserData} />

                </div>
                    <input className={"submitButton"} type="submit" value="Who Should I Play?" />

            </div>
            { queryError.error
                    ? <span id={"errorText"}>{queryError.errorText}</span>
                    : <span className={"errorPlaceholder"}> </span>
            }
        </form>
    )
}

export default SteamIdForm