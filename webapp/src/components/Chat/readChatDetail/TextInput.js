import React, { useState } from 'react';
import { createStyles, makeStyles } from "@mui/styles";
import { Button, TextField } from '@mui/material';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import sendMessage from 'components/Chat/readChatDetail/ReadChatDetail'
import Api from "API/Api";


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

const TextInput = (props) => {
    const classes = useStyles();
    const message = props.message;
    const setMessage = props.setMessage;

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
                      sx={{float: "bottom"}} onClick={() => sendMessage} >
                    <SendSharpIcon />
                </Button>
            </form>
        </>
    )
}

export default TextInput

