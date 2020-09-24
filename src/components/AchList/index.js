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
                <h3 id={"leaderHeaderText"}>You should play as:
                    <img className={"leaderImage"} src={imageSwitch.getLeaderImage(data.leader)} alt={data.leader} />
                    {data.leader}
                </h3>
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
