import React, { useState } from 'react';
import styled from "styled-components";
import { Link, Link as RouterLink } from 'react-router-dom';

/* width: 100%를 header와 content에 적용 시에 margin이 갑자기 생김 */
const StyledHeader = styled.header`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 80px;
    padding: 4px 8px; /* 위아래 4px, 양옆 8px */
    background-color: white;
    z-index : 10; /* z-index 수치가 높을수록 우선순위가 높다 */
`;

const StyledContent = styled.div`
    display: flex;
    height: 90%;
    margin: 0;
    justify-content: space-between; /* 중심축 배치 (현재는 주임축이 수평축) */
    align-items: center; /* 반대축(현재는 반대축이 수직축)의 속성값 활용 */
    background-color: white;
    padding: 4px 8px; /* 위아래 4px, 양옆 8px */

    @media only screen and (max-width: 768px) {
        /* 로고, 메뉴바가 수직으로 나오도록 */
        flex-direction: column;
        align-items: flex-start; /* 로고, 메뉴바 모두 왼쪽 정렬 */
        padding: 4px 8px; /* hover 시 한줄 가득 색상 표시 안되도록 */
    }
`;

const StyledUl = styled.ul`
    display: flex; /* 메뉴를 일렬로 배치 */
    list-style: none; /* ul 태그의 점을 제거 */
    padding-left: 0; /* 패딩때문에 우측으로 치우쳐있는 것을 되돌림 */
    background-color: white;

    /* 메뉴바가 한줄에 하나씩 */
    @media only screen and (max-width: 768px) {
        
        flex-direction: column;
        align-items: center; /* 로고, 메뉴바 모두 왼쪽 정렬 */
        width: 100%; /* 메뉴바의 가운데 정렬을 위해 너비 늘림 */

        display: ${props => (props.open? "block": "none")};
    }

`;

const StyledLi = styled.li`
    padding: 8px 12px; /* 마우스 클릭영역 확보 */

    /* event: hover */
    &:hover{  
        background-color: orange;
        border-radius: 10px; /* 테두리 둥글게 */
        color: white;
    }

    @media only screen and (max-width: 768px) {
        width: 100%;
        text-align: center;
    }
    
`;

const StyledImg = styled.img`
    width: 80%;
    height: 70px;
    object-fit: contain;
`;

const StyledToggle = styled.button`
    display: none; /* 일반 사이즈에선 나타나지 않음 */
    position: absolute; /* 소속된 배치와 무관하게 위치 설정 */
    right: 15px; /* 우측에서 32px 거리 둠 */
    font-size: 24px;
    color: black;

    @media only screen and (max-width: 768px) {
        display: block;
    }
`;

const Header = () => {
    const [open, setOpen] = useState("none");
    const [account, setAccount] = useState("");
    
    return (
        <StyledHeader>
            <StyledContent>
                <RouterLink to="/">
                    <StyledImg alt="logo" src={require("img/logo192.png")} />
                </RouterLink>
                <StyledUl>
                    <Link to="/map/RoomBoardRead" style={{textDecoration: 'none', color: 'black'}}>
                        <StyledLi>
                        
                            방 찾기
                        </StyledLi>
                    </Link>
                    <Link to="/app/RoomBoardRegister" style={{textDecoration: 'none', color: 'black'}}>
                        <StyledLi>
                            방 내놓기
                        </StyledLi>
                    </Link>
                    <StyledLi>
                        로그인
                    </StyledLi>
                    <StyledLi>
                        회원가입
                    </StyledLi>
                </StyledUl>
                <StyledToggle> toggle_BTN</StyledToggle>
            </StyledContent>
        </StyledHeader>
    )
}

export default Header