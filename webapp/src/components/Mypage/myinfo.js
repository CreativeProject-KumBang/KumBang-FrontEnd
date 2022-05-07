import React from 'react';
import styled from "styled-components";
//import mainTheme from "../../components/Layout/Main/mainTheme";

const StyledBox = styled.div`
    height: 100%;
    padding: 0px 0px;
`;

const Item = styled.li`
  display: block;
  height: 50px;
  padding: 8px 12px; /* 마우스 클릭영역 확보 */

  /* event: hover */
  &:hover{  
    background-color: ffca09;
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
    border-bottom: solid 3px ffca09;
  }
`;

const Box = (props) => {
    const list = []
    for(let i = 0; i < props.menu.length; i++){
      let t = props.menu[i];
      list.push(
      <div key={t.id} id={t.id}>
          <div className='label'>
            <div class='label1'>
                <div id={t.id+'-row-title'}>
                    <h2>{t.title}</h2>
                </div>
                <div id={t.id+'-row-subtitle'}>
                    <span>{t.value}</span>
                </div>
            </div>
            <div class='label2'>
                <button aria-hidden="false" id={t.id+'-row-action'} aria-labelledby={t.id+'-row-action '+t.id+'-row-title'} type="button" class="editBtn">
                    수정
                </button>
            </div>
          </div>
      </div>
      );
    }
    return list;
  }

const MyInfo = () => {
  const menu = [
    {id: 'nickname', title: '닉네임', value: '모나리자'},
    {id: 'name', title: '이름', value: '한새라'},
    {id: 'birth', title: '생년월일', value: '991203'},
    {id: 'email', title: '이메일 주소', value: 'hsr1203@kumoh.ac.kr'},
    {id: 'phone', title: '전화번호', value: '01012345678'},
    {id: 'address', title: '주소', value: '구미시대학로61'}
  ]
  return(
      <StyledBox>
          <Box menu={menu} />
      </StyledBox>
  );
};

export default MyInfo