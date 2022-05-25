import React from 'react';
import styled from "styled-components";
import Api from 'API/Api';

const StyledBox = styled.div`
    height: 100%;
    padding: 0px 0px;
`;

const StyledTop = styled.div`
    display: block;
    height: 40px;
    margin-top: 15px;
    margin-bottom: 50px;
    font-size: 22px;
`;

const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding: 10px 30px;

  /* 크기 */
  width: 80px;
  height: 40px;
  font-size: 18px;

  /* 색상 */
  background: orange;
  &:hover {
    background: yellow;
  }
  &:active {
    background: black;
  }
`;

const Withdrawal = (props) => {

    const handleWithdrawal = async () => {
        let response = await Api.getWithdrawal();
        console.log(response);
        if (response.data.response[0] === "success") {
          const target = '/';
          sessionStorage.removeItem('user');
          window.location.href = target;
        }
        else if(response.data.response[0] === "fail") {
          alert('회원 탈퇴 실패');
        }
    };

    return (
        <StyledBox>
            <StyledTop>
                <h2>회원 탈퇴</h2>
            </StyledTop>
            <p style={{ display: 'block' }}>
                정말로 떠나시겠어요?
            </p>
            <></>
            <StyledButton
                onClick={handleWithdrawal}  
            >
                네
            </StyledButton>
            <StyledButton>
                아니오
                {alert("잘 생각하셨어요!")}
            </StyledButton>
            
        </StyledBox>
    );
};

export default Withdrawal