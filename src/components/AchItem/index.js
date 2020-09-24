import React from 'react'
import './AchItem.css'


function AchItem(props) {
    // console.log("Item data:");
    // console.log(props.data);
    return (
    <li className={"achRow"}>
        <div className={"achImgBox"} >
            <img className={"achImg"} src={props.data.icon} alt={""} />
        </div>
        <div className={"achTextBox"}>
            <h4 className={"achHeader"}>{props.data.name}</h4>
            <h5 className={"achText"}>{props.data.description}</h5>
        </div>
    </li>
    )
}

export default AchItem
