import React from 'react'
import { createStyles, makeStyles } from "@mui/styles";
import SendSharpIcon from '@mui/icons-material/SendSharp';
import { Button, TextField } from '@mui/material';


const useStyles = makeStyles((theme) =>
  createStyles({
    wrapForm : {
        display: "flex",
        justifyContent: "center",
        width: "95%",
        //margin: `${theme.spacing(0)} auto`
    },
    wrapText  : {
        width: "100%"
    },
    button: {
        //margin: theme.spacing(1),
    },
  })
);


const TextInput = () => {
    const classes = useStyles();
    return (
        <>
            <form className={classes.wrapForm}  noValidate autoComplete="off">
            <TextField
                id="standard-text"
                label=""
                className={classes.wrapText}
                //margin="normal"
            />
            <Button variant="contained" color="primary" className={classes.button}>
                <SendSharpIcon />
            </Button>
            </form>
        </>
    )
}

export default TextInput

