import * as React from 'react';
import Link from '@mui/material/Link';
import ListItemButton from '@mui/material/ListItemButton';

export const mainListItems = (
    <React.Fragment>
        <Link href='/mypage/info' underline='none' color={'#666'} >
            <ListItemButton sx={{ paddingLeft: '30px', height: '75px', fontSize: '18px', ":hover": { color: 'white', backgroundColor: "#ffca09"} }}>
                내 정보
            </ListItemButton>
        </Link>
        <Link href='/mypage/post' underline='none' color={'#666'} >
            <ListItemButton sx={{ paddingLeft: '30px', height: '75px', fontSize: '18px', ":hover": { color: 'white', backgroundColor: "#ffca09"} }}>
                내가 쓴 글
            </ListItemButton>
        </Link>
        <Link href='/mypage/transaction' underline='none' color={'#666'} >
            <ListItemButton sx={{ paddingLeft: '30px', height: '75px', fontSize: '18px', ":hover": { color: 'white', backgroundColor: "#ffca09"} }}>
                거래 내역
            </ListItemButton>
        </Link>
        <Link href='/mypage/chatbox' underline='none' color={'#666'} >
            <ListItemButton sx={{ paddingLeft: '30px', height: '75px', fontSize: '18px', ":hover": { color: 'white', backgroundColor: "#ffca09"} }}>
                채팅 내역
            </ListItemButton>
        </Link>
        <Link href='/mypage/wishlist' underline='none' color={'#666'} >
            <ListItemButton sx={{ paddingLeft: '30px', height: '75px', fontSize: '18px', ":hover": { color: 'white', backgroundColor: "#ffca09"} }}>
                찜 내역
            </ListItemButton>
        </Link>
        <Link href='/mypage/withdrawal' underline='none' color={'#666'} >
            <ListItemButton sx={{ paddingLeft: '30px', height: '75px', fontSize: '18px', ":hover": { color: 'white', backgroundColor: "#ffca09"} }}>
                회원 탈퇴
            </ListItemButton>
        </Link>
    </React.Fragment>
);
