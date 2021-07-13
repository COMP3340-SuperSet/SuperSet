import React, { useState } from "react";
import { Button, Confirm } from 'semantic-ui-react';

const Confirmation = ({trigger = (<Button>Show</Button>), onConfirm = () => {}, text = "Are you sure?", confirmText = "OK", cancelText = "Cancel"}) => {
    /*
        <Confirmation> is a customizable confirmation modal

        Props:
            trigger - JSX Object. Original button to display that will trigger confirmation box.
                default: <Button>Show</Button>

            onConfirm - function. Function passed in that will get triggered after confirmation
                default: Empty arrow function.

            text - string. Text to be displayed at the top of confirmation box
                default: "Are you sure?"

            confirmText - string. Text to be displayed on confirm button
                default: "OK"

            cancelText - string. Text to be displayed on cancel button
                default: "Cancel"
    */
    
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div onClick = {() => setOpen(true)}> {trigger} </div>
            <Confirm size = "mini"
                     confirmButton = {confirmText}
                     cancelButton = {cancelText}
                     content = {text}
                     open = {open}
                     onCancel = {() => setOpen(false)}
                     onConfirm = {() => {
                        setOpen(false);
                        onConfirm();
                     }}
            />
        </div>
    );
}

export default Confirmation;