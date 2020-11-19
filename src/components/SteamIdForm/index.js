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
    const [showSlimExplainer, setShowSlimExplainer] = useState(false)

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
        //Ensure user input is numeric only
        setSteamIdInput(event.target.value.replace(/[^0-9]/g, '' ));
        setInputHasChanged(true)
    }


    function handleCbChange(event) {
        setUseUserData(!useUserData);
        setInputHasChanged(true)
    }


    function toggleSlimExplainer(event) {
        console.log("Toggling slim explainer")
        setShowSlimExplainer(!showSlimExplainer)
    }


    return (
        <form id={"steamIdForm"} onSubmit={handleSubmit}>
            <div id={"formRow"}>
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
                    <div id={"errorText"}>{queryError.errorText}</div>
                    <input className={"submitButton"} type="submit" value="Who Should I Play?" />

                </div>
                <div id={"explainerWide"} className={"explainerBox"}>
                    <h3 className={"explainerHeader"}>What is this thing? Why is this thing?</h3>
                    <p className={"explainerText"}>
                        SC6CS is a tool I built to help with achievement grinding in Sid Meier's Civilization VI. Ask it who you
                        should play, and it will randomly return one of the 54 leaders currently in the game, as well as all
                        achievements specific to that leader. If you choose to enter your Steam ID, it will analyze your Steam
                        achievement data and offer a personalized suggestion based on which achievements you have not yet unlocked.
                    </p>
                    <p className={"explainerText"}>
                        Don't like the suggestion being offered? Keep clicking until you do!
                    </p>

                </div>
            </div>
            <div id={"explainerSlim"}>
                <div onClick={toggleSlimExplainer} id={"explainerHeaderSlim"} className={"explainerHeader"}>What is this thing? Why is this thing?</div>
                {showSlimExplainer
                    ?
                    <div onClick={toggleSlimExplainer} id={"explainerSlimText"} className={"explainerBox"}>
                        <p className={"explainerText"}>
                            SC6CS is a tool I built to help with achievement grinding in Sid Meier's Civilization VI. Ask it who you
                            should play, and it will randomly return one of the 54 leaders currently in the game, as well as all
                            achievements specific to that leader. If you choose to enter your Steam ID, it will analyze your Steam
                            achievement data and offer a personalized suggestion based on which achievements you have not yet unlocked.
                        </p>
                        <p className={"explainerText"}>
                            Don't like the suggestion being offered? Keep clicking until you do!
                        </p>
                    </div>
                    :
                    null
                }
            </div>
        </form>
    )
}

export default SteamIdForm