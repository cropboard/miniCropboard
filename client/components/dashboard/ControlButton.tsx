import React, { FunctionComponent } from "react";

interface ControlButton {
    name: string
    iconSource: string
    action: Function
}

const ControlButton: FunctionComponent<ControlButton> = ({ name, iconSource, action }): JSX.Element => {
    return (
        <button onClick={() => action()}>
            <p> {name} </p>
            <img src={iconSource} alt="" />
        </button>
    )
}

export default ControlButton;