import React from 'react';
import styled from "styled-components";
// import mainTheme from "../Main/mainTheme";

const Navi = styled.nav`
  height: 50px;
  width: 100%;
`;

const List = styled.ul`
  list-style: none;
  height: 50px;
  margin: auto;
  padding: 0;
`;

const Item = styled.li`
  display: block;
  height: 50px;
  padding: 8px 12px; /* 마우스 클릭영역 확보 */

  /* event: hover */
  &:hover{  
    background-color: #ffca09;
    a{
      font-size: 18px;
      color: white;
    }
  }
  a {
    display: block;
    position: relative;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    margin: 0 14px;
    text-decoration: none;
    color: #666;
  }
  .active {
    border-bottom: solid 3px #ffca09;
  }
`;

const Nav = (props) => {
  const list = []
  for(let i = 0; i < props.menu.length; i++){
    let t = props.menu[i];
    list.push(<Item key={t.id}><a href={'/mypage/'+t.id}>{t.title}</a></Item>)
  }
  return(
    <Navi>
      <List>
        {list}
      </List>
    </Navi>
  );
}

const MenuApp = () => {
  const menu = [
    {id: 'info', title: '내 정보'},
    {id: 'board', title: '내가 쓴 글'},
    {id: 'transaction', title: '거래 내역'},
    {id: 'chatbox', title: '채팅 내역'},
    {id: 'wishlist', title: '찜 내역'},
    {id: 'report', title: '신고 내역'},
    {id: 'withdrawal', title: '회원 탈퇴'}
  ]
  return(
    <Nav menu={menu}></Nav>  
  );
};

export default MenuApp