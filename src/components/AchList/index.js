import React from 'react'
import AchItem from '../AchItem'
import './AchList.css'
import * as imageSwitch from '../../imageSwitch'

function AchList(props) {
    const data = props.data;
    const listItems = [];
    for (const achievement in data.achievements) {
        listItems.push(<AchItem data={data.achievements[achievement]} />)
    }

    return (
        <div className={"achListBox"}>
            <div id={"leaderHeader"}>
                <h3 className={"leaderHeaderText"}>You should play as: </h3>
                <div className={"leaderSelection"}>
                    <img className={"leaderImage"} src={imageSwitch.getLeaderImage(data.leader)} alt={data.leader} />
                    <h2 className={"leaderSelectionText"}>{data.leader}</h2>
                </div>
            </div>
            <h4 className={"listHeader"}>
                {props.usingUserData
                    ? "Your outstanding achievements for " + data.leader + ":"
                    : "Achievements for " + data.leader + ":"
                }
            </h4>
            <ul className={"achList"}>{listItems}</ul>
        </div>
    );
}

export default AchList
