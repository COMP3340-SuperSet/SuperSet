import React, { useState } from "react";
import { Button, Confirm } from 'semantic-ui-react';

const Confirmation = ({ disabled = false, style, trigger = (<Button>Show</Button>), onConfirm = () => { }, text = "Are you sure?", confirmText = "OK", cancelText = "Cancel", inline = false }) => {
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
            
            inline - boolean. If displayed trigger is inline or not
                default: false
    */

    const [open, setOpen] = useState(false);

    return (
        <span>
            {inline ? (<div style={{ display: "inline-block", ...style }} onClick={() => {if (!disabled) setOpen(true)}}> {trigger} </div>) :
                (<div style={style} onClick={() => {if (!disabled) setOpen(true)}}> {trigger} </div>)}
            <Confirm size="mini"
                confirmButton={confirmText}
                cancelButton={cancelText}
                content={text}
                open={open}
                onCancel={() => setOpen(false)}
                onConfirm={() => {
                    setOpen(false);
                    if (!disabled) onConfirm();
                }}
            />
        </span>
    );
}

export default Confirmation;