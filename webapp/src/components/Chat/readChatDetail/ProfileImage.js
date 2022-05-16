import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Avatar, deepOrange } from "@mui/material";

const useStyles = makeStyles((theme) =>
    createStyles({
        orange: {
            //color: theme.palette.getContrastText(deepOrange[500]),
            //backgroundColor: deepOrange[500],
            //width: theme.spacing(4),
            //height: theme.spacing(4)
        },
        displayName: {
            marginLeft: "20px"
        }
    })
);

export const ProfileImage = (props) => {
    const photoURL = props.photoURL ? props.photoURL : "dummy.js";
    const displayName = props.displayName ? props.displayName : "알수없음";
    const classes = useStyles();
    return (
        <>
            <Avatar
                alt={displayName}
                className={classes.orange}
                src={photoURL}
            ></Avatar>
        </>
    );
};