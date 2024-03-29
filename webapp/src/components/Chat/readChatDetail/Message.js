import React from "react";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) =>
    createStyles({
        messageRow: {
            display: "flex"
        },
        messageRowRight: {
            display: "flex",
            justifyContent: "flex-end"
        },
        messageWhite: {
            position: "relative",
            marginLeft: "20px",
            marginBottom: "20px",
            padding: "10px",
            backgroundColor: "white",
            width: "80%",
            minWidth:"80px",
            //height: "50px",
            textAlign: "left",
            font: "400 .9em 'Open Sans', sans-serif",
            border: "1px solid #97C6E3",
            borderRadius: "10px",
            "&:after": {
                content: "''",
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: "15px solid white",
                borderLeft: "15px solid transparent",
                borderRight: "15px solid transparent",
                top: "0",
                left: "-15px"
            },
            "&:before": {
                content: "''",
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: "17px solid #97C6E3",
                borderLeft: "16px solid transparent",
                borderRight: "16px solid transparent",
                top: "-1px",
                left: "-17px"
            }
        },
        messageOrange: {
            position: "relative",
            marginRight: "20px",
            marginBottom: "20px",
            padding: "10px",
            backgroundColor: "#f8e896",
            width: "50%",
            //height: "50px",
            textAlign: "left",
            font: "400 .9em 'Open Sans', sans-serif",
            border: "1px solid #dfd087",
            borderRadius: "10px",
            "&:after": {
                content: "''",
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: "15px solid #f8e896",
                borderLeft: "15px solid transparent",
                borderRight: "15px solid transparent",
                top: "0",
                right: "-15px"
            },
            "&:before": {
                content: "''",
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: "17px solid #dfd087",
                borderLeft: "16px solid transparent",
                borderRight: "16px solid transparent",
                top: "-1px",
                right: "-17px"
            }
        },

        messageContent: {
            padding: 0,
            margin: 0
        },
        messageTimeStampRight: {
            position: "absolute",
            fontSize: ".85em",
            fontWeight: "500",
            marginTop: "10px",
            bottom: "-20px",
            right: "-3px"
        },

        orange: {
            //color: theme.palette.getContrastText(deepOrange[500]),
            //backgroundColor: deepOrange[500],
            //width: theme.spacing(4),
            //height: theme.spacing(4)
        },
        avatarNothing: {
            color: "transparent",
            backgroundColor: "transparent",
            //width: theme.spacing(4),
            //height: theme.spacing(4)
        },
        displayName: {
            marginLeft: "20px"
        }
    })
);

export const MessageLeft = (props) => {
    const classes = useStyles();
    const message = props.message ? props.message : "no message";
    const createdAt = props.createdAt ? props.createdAt : "";
    const timestamp = createdAt.split(".");

    return (
        <>
            <div className={classes.messageRow}>
                <div>
                    <div className={classes.messageWhite}>
                        <div>
                            <p className={classes.messageContent}>{message}</p>
                        </div>
                        <div className={classes.messageTimeStampRight}>{timestamp[0]}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export const MessageRight = (props) => {
    const classes = useStyles();
    const message = props.message ? props.message : "no message";
    const createdAt = props.createdAt ? props.createdAt : "";
    const timestamp = createdAt.split(".");
    return (
        <div className={classes.messageRowRight}>
            <div className={classes.messageOrange}>
                <p className={classes.messageContent}>{message}</p>
                <div className={classes.messageTimeStampRight}>{timestamp[0]}</div>
            </div>
        </div>
    );
};
