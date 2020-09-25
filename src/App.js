import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import AchList from './components/AchList';
import SteamIdForm from './components/SteamIdForm';


function App() {

    const [userData, setUserData] = useState();
    const [usingUserData, setUsingUserData] = useState(false);
    const [randomLeaderData, setRandomLeaderData] = useState();
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [fetchingData, setFetchingData] = useState(false);

    function toggleDisclaimer() {
        setShowDisclaimer(!showDisclaimer)
    }

    function closeDisclaimer() {
        setShowDisclaimer(false)
    }

    function getRandomLeader(data) {
        // console.log("Choosing random leader...")
        const randomLeader = data.leader_list[Math.floor(Math.random() * data.leader_list.length)];
        let leaderAchievements = {};
        console.log("Finding achievements for " + randomLeader);
        for (const achievement in data.achievements) {
            // console.log(data.achievements[achievement)
            if (data.achievements[achievement].leaders.includes(randomLeader)) {
                leaderAchievements[achievement] = data.achievements[achievement]
            }
        }
        const newUserData = {
            "leader": randomLeader,
            "achievements": leaderAchievements
        };
        setRandomLeaderData(newUserData)
    }

    return (
        <div className={"container"}>
            <div className={"titleBar"}>
                <h2 className={"headerText"}>{"Switz' Civ VI Civ Selector"}</h2>
                {/*<h4 className={"headerLink"}>What is this thing?</h4>*/}
            </div>

            <div id={"contentBox"}>

                <SteamIdForm
                    setUserDataCallback={setUserData}
                    getRandomLeaderCallback={getRandomLeader}
                    userData={userData}
                    setUsingUserDataCallback={setUsingUserData}
                    setFetchingDataCallback={setFetchingData}
                />

                {/*{randomLeaderData*/}
                {/*    ? <AchList data={randomLeaderData} usingUserData={usingUserData} />*/}
                {/*    : ""*/}
                {/*}*/}

                {fetchingData
                    // Display while querying API
                    ? <Loader className={"loader"} type="Grid" color="#169d98" height={80} width={80} />
                    // Display achievement list if present, otherwise display nothing
                    : (randomLeaderData
                        ? <AchList data={randomLeaderData} usingUserData={usingUserData} />
                        : null
                    )
                }

            </div>

            <div className={"footer"} onMouseLeave={closeDisclaimer}>
                <div id={"footerMenu"}>
                    <span className={"footerLink"} onClick={toggleDisclaimer}>Disclaimer</span>
                    {showDisclaimer
                        ? <div id={"disclaimerText"} onClick={closeDisclaimer}>
                            <p>Leader icons were sourced from the <a href={"https://civilization.fandom.com/wiki/Civilization_Games_Wiki"}>Fandom Civilization Wiki</a>. Thank you to the many users who worked to create them.</p>
                            <p>All images are property of their respective copyright holders and are used under fair use.</p>
                            <p>This software is not endorsed by or associated with 2K Games or Firaxis Games Inc. Steam API used under license.</p>
                            <p>This software collects your Steam ID for the purposes of retrieving your personal achievement data from Steam servers; no other user data, public or private, is collected or stored by this software.</p>
                            <p>VALVE PROVIDES THE STEAM WEB API, STEAM DATA, AND VALVE BRAND & LINKS "AS IS," "WITH ALL FAULTS" AND "AS AVAILABLE," AND THE ENTIRE RISK AS TO SATISFACTORY QUALITY, PERFORMANCE, ACCURACY, AND EFFORT IS WITH YOU. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, VALVE , STEAM GAME PUBLISHERS AND DEVELOPERS, AND THEIR SUPPLIERS MAKE NO REPRESENTATIONS, WARRANTIES OR CONDITIONS, EXPRESS OR IMPLIED. VALVE, STEAM GAME PUBLISHERS AND DEVELOPERS, AND THEIR SUPPLIERS EXPRESSLY DISCLAIM ANY AND ALL WARRANTIES OR CONDITIONS, EXPRESS, STATUTORY AND IMPLIED, INCLUDING WITHOUT LIMITATION (A) WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, WORKMANLIKE EFFORT, ACCURACY, TITLE, QUIET ENJOYMENT, NO ENCUMBRANCES, NO LIENS AND NON-INFRINGEMENT, (B) WARRANTIES OR CONDITIONS ARISING THROUGH COURSE OF DEALING OR USAGE OF TRADE, AND (C) WARRANTIES OR CONDITIONS OF UNINTERRUPTED OR ERROR-FREE ACCESS OR USE.</p>
                            <p>IN NO EVENT WILL VALVE OR ANY SUPPLIER BE LIABLE FOR ANY DAMAGES, INCLUDING WITHOUT LIMITATION ANY INDIRECT, CONSEQUENTIAL, SPECIAL, INCIDENTAL, OR PUNITIVE DAMAGES ARISING OUT OF, BASED ON, OR RESULTING FROM THESE API TERMS OF USE OR YOUR USE OF STEAM WEB API, STEAM DATA, OR VALVE BRAND & LINKS, EVEN IF SUCH PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. THE EXCLUSION OF DAMAGES UNDER THIS PARAGRAPH IS INDEPENDENT OF YOUR EXCLUSIVE REMEDY AND SURVIVES IN THE EVENT SUCH REMEDY FAILS OF ITS ESSENTIAL PURPOSE OR IS OTHERWISE DEEMED UNENFORCEABLE. THESE LIMITATIONS AND EXCLUSIONS APPLY WITHOUT REGARD TO WHETHER THE DAMAGES ARISE FROM (A) BREACH OF CONTRACT, (B) BREACH OF WARRANTY, (C) NEGLIGENCE, OR (D) ANY OTHER CAUSE OF ACTION, TO THE EXTENT SUCH EXCLUSION AND LIMITATIONS ARE NOT PROHIBITED BY APPLICABLE LAW. IF YOU DO NOT AGREE WITH ANY PART OF THESE API TERMS OF USE, OR YOU HAVE ANY DISPUTE OR CLAIM AGAINST VALVE OR ITS SUPPLIERS WITH RESPECT TO THESE TERMS OF USE OR THE SERVICES, THEN YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE STEAM WEB API, STEAM DATA, AND VALVE BRAND & LINKS.</p>
                          </div>
                        : ""
                    }

                </div>
            </div>
        </div>
    );
}

export default App;
