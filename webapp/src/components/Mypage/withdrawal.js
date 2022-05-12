import React from 'react';
import styled from "styled-components";

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
    const { id, title, image, date } = props;
    const postBody = {
        item: [{
            "reportId": 1,
            "title": "신고합니다.",
            "date": "2022-03-25",
        }]
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
            <StyledButton>
                네
            </StyledButton>

        </StyledBox>
    );
};

export default Withdrawal