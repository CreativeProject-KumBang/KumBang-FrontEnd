import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Divider, Hidden } from '@mui/material';
import Api from 'API/Api';
import { base_url } from 'API/Url';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffca00',
    },
    secondary: {
      main: '#ffb000',
    },
  },
});

theme.typography.h1 = {
  fontSize: '20px',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.5rem',
  },
};

const default_url = base_url + "/image/notfound.png";

const StyledBox = styled.div`
    height: 100%;
    padding: 0px 0px;
`;

const StyledTop = styled.div`
    display: block;
    height: 30px;
    margin-top: 5px;
    margin-left: 10px;
    margin-bottom: 10px;
`;

const StyledTopSmall = styled.div`
    display: block;
    margin-top: 5px;
    margin-left: 10px;
    margin-bottom: 10px;
`;

const List = styled.ul`
  list-style: none;
  margin: auto;
  padding: 0;
`;

const Item = styled.li`
  padding: 8px 12px; /* 마우스 클릭영역 확보 */

  a {
    display: flex;
    position: relative;
    margin: 10px 15px;
    font-size: 22px;
    text-decoration: none;
    color: black;
  }
`;

const Wishlists = (props) => {
    const [postBody, setPostBody] = useState([]);
    const response = async () => await Api.getLikedProject();

    useEffect(() => {
        const getData = async () => {
            const resBody = await response();
            console.log(resBody);
            setPostBody(resBody.data.response[0]);
        }
        getData();
    }, []);

    return (
        <ThemeProvider theme={theme}>
        <StyledBox>
                <Typography variant='h1' sx={{
                  display: 'block',
                  height: '40px',
                  marginTop: '30px',
                  marginBottom: '30px',
                }}>찜 내역
                </Typography>
            <Divider />
            <List>
                {
                    postBody.map(row => (
                        <>
                            <Item key={row.id}>
                                <a href={'/mypage/detail/' + row.id}>
                                    <Hidden mdDown>
                                        <div id={row.id + '-row-image'}
                                            style={{
                                                float: 'left',
                                                width: '30%',
                                                height: '100%'
                                            }}>
                                            {(row.thumbnail != null) ?
                                                <img
                                                    src={base_url + row.thumbnail.path}
                                                    style={{
                                                        width: "100px",
                                                        height: "100px",
                                                        objectFit: "cover"
                                                    }}
                                                /> :
                                                <img
                                                    src={default_url}
                                                    style={{
                                                        width: "100px",
                                                        height: "100px",
                                                        objectFit: "cover"
                                                    }}
                                                />
                                            }
                                        </div>
                                        <div
                                            style={{
                                                display: 'block',
                                                width: '70%',
                                                height: '100%'
                                            }}>
                                            <div id={row.id + '-row-title'}>
                                                <span style={{ fontSize: "75%" }}>{row.title}</span>
                                            </div>
                                            <div id={row.id + '-row-date'}>
                                                <span style={{ fontSize: "70%" }}>{row.updatedAt}</span>
                                            </div>
                                        </div>
                                    </Hidden>

                                    <Hidden mdUp>
                                        <div id={row.id + '-row-image'}
                                            style={{
                                                float: 'left',
                                                width: '30%',
                                                height: '100%'
                                            }}>
                                            {(row.thumbnail != null) ?
                                                <img
                                                    src={base_url + row.thumbnail.path}
                                                    style={{
                                                        width: "75px",
                                                        height: "75px",
                                                        objectFit: "cover"
                                                    }}
                                                /> :
                                                <img
                                                    src={default_url}
                                                    style={{
                                                        width: "75px",
                                                        height: "75px",
                                                        objectFit: "cover"
                                                    }}
                                                />
                                            }
                                        </div>

                                        <div
                                            style={{
                                                display: 'block',
                                                width: '70%',
                                                height: '100%'
                                            }}>
                                            <div id={row.id + '-row-title'}>
                                                <span style={{ fontSize: "70%" }}>{row.title}</span>
                                            </div>
                                            <div id={row.id + '-row-date'}>
                                                <span style={{ fontSize: "65%" }}>{row.updatedAt}</span>
                                            </div>
                                        </div>
                                    </Hidden>
                                </a>
                            </Item>
                            <Divider />
                        </>
                    ))
                }
            </List>
        </StyledBox>
        </ThemeProvider>
    );
};

export default Wishlists