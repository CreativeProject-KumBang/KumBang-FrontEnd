import React from 'react';
import styled from "styled-components";
import Field from './field/field';

const StyledFooter = styled.footer`
    margin-top: auto;
    height: 100px;
    background-color: #dde0ea;
`;

const UpdateRoomBoard = () => {
    return (
        <div>
            <h4>내가 쓴 글 | 수정</h4>
            <Field> </Field>
        </div>
        
    )
}

export default UpdateRoomBoard