import React, { useState } from 'react';
import styled from "styled-components";
import { Link, Link as RouterLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


/* width: 100%를 header와 content에 적용 시에 margin이 갑자기 생김 */
const StyledHeader = styled.header`
    position: fixed;
   display: block;
    left: 0;
    right: 0;
    top: 0;
    height: 80px;
    padding: 4px 8px; /* 위아래 4px, 양옆 8px */
    background-color: white;
    z-index : 10; /* z-index 수치가 높을수록 우선순위가 높다 */
    border-bottom: 1px solid gray;
`;

const StyledContent = styled.div`
    display: flex;
    height: 90%;
    margin: 0;
    justify-content: space-between; /* 중심축 배치 (현재는 주임축이 수평축) */
    align-items: center; /* 반대축(현재는 반대축이 수직축)의 속성값 활용 */
    background-color: white;
    padding: 4px 8px; /* 위아래 4px, 양옆 8px */
`;

const StyledUl = styled.ul`
    display: flex; /* 메뉴를 일렬로 배치 */
    list-style: none; /* ul 태그의 점을 제거 */
    padding-left: 0; /* 패딩때문에 우측으로 치우쳐있는 것을 되돌림 */
    background-color: white;
`;

const StyledLi = styled.li`
    padding: 8px 12px; /* 마우스 클릭영역 확보 */

    /* event: hover */
    &:hover{  
        background-color: orange;
        border-radius: 10px; /* 테두리 둥글게 */
        color: white;
    } 
`;

const StyledImg = styled.img`
    width: 70%;
    max-width: 150px;
   min-width: 30px;
`;


const Header = () => {
    const user = sessionStorage.getItem('user'); // 토큰 받아오기
    console.log(user);
    const [open, setOpen] = useState("none");
    const [account, setAccount] = useState("");

    
    return (
        <StyledHeader>
            <StyledContent>
                <RouterLink to="/">
                    <StyledImg alt="logo" src={require("img/logo192.png")} />
                </RouterLink>
                <StyledUl>
                    {(!(user===null)) ? (
                        <div>thwjd</div>

                    ) : (
                    <StyledLi>
                        <a href='/login' style={{textDecoration: 'none', color:'black'}}>
                            <span>Sign in</span>
                        </a>
                    </StyledLi>
                    )}

                    
                </StyledUl>
            </StyledContent>
        </StyledHeader>
    )
}

export default Header