import React, { useState } from 'react'
import { createStyles, makeStyles } from "@mui/styles";
import SendSharpIcon from '@mui/icons-material/SendSharp';
import { Button, TextField } from '@mui/material';
import { getValue } from '@testing-library/user-event/dist/utils';
import { MessageLeft, MessageRight } from "components/Chat/readChatDetail/Message"
import $ from "jquery";

var stompClient = null;

function sendName() {
    stompClient.send("/app/hello", {}, JSON.stringify({ 'name': $("#name").val() }));
}

function showGreeting(message) {
    const rootElement = document.getElementById('style-1');
            const elemet = React.createElement('div', {
                children:
                    <MessageRight message={message}></MessageRight>
            })
            ReactDOM.render(elemet, rootElement); 
    /*
    // if 내가 sender 라면?
    const div = document.getElementById("style-1");
    div.appendChild("<MessageRight>" + message + "</MessageRight>");
    // else 남이 sender 라면?
    div.appendChild("<MessageLeft>" + message + "</MessageLeft>");*/
}


const useStyles = makeStyles((theme) =>
    createStyles({
        wrapForm: {
            display: "flex",
            justifyContent: "center",
            width: "95%",
            //margin: `${theme.spacing(0)} auto`
        },
        wrapText: {
            width: "100%"
        },
        button: {
            //margin: theme.spacing(1),
        },
    })
);




const TextInput = () => {
    const classes = useStyles();
    const [message, setMessage] = useState();

    const postbody = {
        roomId: "",
        content: message,
        sender: { id : "dsfsgs" }
    };
    return (
        <>
            <form className={classes.wrapForm} noValidate autoComplete="off">
                <TextField
                    id="standard-text"
                    label=""
                    className={classes.wrapText}

                    onChange={(event) => setMessage(event.target.value)}
                    sx={{height: "100%"}}
                    //margin="normal"
                />
                <Button variant="contained" color="primary" className={classes.button} 
                      sx={{float: "bottom"}} >
                    <SendSharpIcon />
                </Button>
            </form>
        </>
    )
}

export default TextInput

