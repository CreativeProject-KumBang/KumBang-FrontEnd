import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components";
import Divider from '@mui/material/Divider';
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
    /*background-color: yellow;*/
`;

const Info = () => {

  const [postBody, setPostBody] = useState([]);
  const response = async () => await Api.getInfo();

  useEffect(() => {
    const getData = async () => {
      const resBody = await response();
      console.log(resBody);
      setPostBody(resBody.data.response);
    }
    getData();
  }, []);

    // 수정 불가한 필드 (이름, 이메일)
    const FixedList = (props) => {
        return (
            <div className='label' style={{ display: 'flex', padding: '10px' }}>
                <div class='label1' style={{ float: 'left', width: '90%' }}>
                    <div id='row-title' style={{ fontWeight: 'bold' }}>
                        <span>{props.title}</span>
                    </div>
                    <div id='row-subtitle' style={{ fontSize: '18px', paddingTop: '10px' }}>
                        <span>{props.item}</span>
                    </div>
                </div>
            </div>
        )
    }

    //수정 가능한 필드 (닉네임, 생년월일, 전화번호, 주소)
    const EditableList = (props) => {

        //input 생성 함수
        const updateForm = (e) => {
            e.preventDefault();
            const rootElement = document.getElementById('row-subtitle');
            const elemet = React.createElement('div', {
                children:
                    <Update body={props.item} onUpdate={(body) => {
                        const newItems = [...postBody]
                        const updatedItems = body
                        // for (let i = 0; i < newItems.length; i++) {
                        //     if (newItems[i].id === t.id) {
                        //         newItems[i] = updatedItems;
                        //         break;
                        //     }
                        // }
                        newItems = updatedItems;
                        setPostBody(newItems);
                    }}>update</Update>
            })
            ReactDOM.render(elemet, rootElement); // (주입할 대상, root) -> 자바스크립트로 따지면 append()
        }

        const Update = (props) => {
            const [body, setBody] = useState(props.body);
            return (
                <form action='/update' onSubmit={e => {
                    e.preventDefault();
                    const body = e.target.body.value;
                    props.onUpdate(body);
                }}>
                    <p>
                        <input type="text" id={props} name="body" value={body} onChange={e => {
                            setBody(e.target.value);
                        }} />
                    </p>
                    <input type="submit" value="저장" />
                </form>
            )
        }

        return (
            <div className='label' style={{ display: 'flex', padding: '10px' }}>
                <div class='label1' style={{ float: 'left', width: '90%' }}>
                    <div id='row-title'>
                        <span>{props.title}</span>
                    </div>
                    <div id='row-subtitle'>
                        <span style={{ fontSize: '18px' }}>{props.item}</span>
                    </div>
                </div>

                <div class='label2' style={{ width: '10%' }}>
                    <button onClick={(e) => updateForm(e)} aria-hidden="false" id='row-action'
                        style={{ cursor: 'pointer', background: 'transparent', textDecoration: 'underline', borderRadius: '4px', fontWeight: '600' }}
                        type="button" class="editBtn">
                        수정
                    </button>
                </div>
            </div>
        )
    }

    return (
        <StyledBox>
            <StyledTop>
                <h2>내 정보</h2>
            </StyledTop>
            <FixedList item={postBody.name} title="이름" /> {/* 네임 필드 */}
            <Divider />
            <FixedList item={postBody.email} title="이메일" /> {/* 이메일주소 필드 */}
            <Divider />
            <FixedList item={postBody.nickname} title="닉네임" /> {/* 닉네임 필드 */}
            <Divider />
            <FixedList item={postBody.birthDate} title="생년월일" /> {/* 생년월일 필드 */}
            <Divider />
            <FixedList item={postBody.phoneNumber} title="전화번호" /> {/* 전화번호 필드 */}
            <Divider />
            <FixedList item={postBody.address} title="주소" /> {/* 주소 필드 */}
            <Divider />
        </StyledBox>
    );
};

export default Info
