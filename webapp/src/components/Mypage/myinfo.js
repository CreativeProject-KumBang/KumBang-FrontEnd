import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components";
import Divider from '@mui/material/Divider';

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
    background-color: yellow;
`;

const Box = (props) => {
  const list = []
  for (let i = 0; i < props.menu.length; i++) {
    let t = props.menu[i];
    list.push(
      <div key={t.id} id={t.id}>
        <div className='label' style={{ display: 'flex', padding: '10px' }}>
          <div class='label1' style={{ float: 'left', width: '90%' }}>
            <div id={t.id + '-row-title'}>
              <span>{t.title}</span>
            </div>
            <div id={t.id + '-row-subtitle'}>
              <span style={{ fontSize: '18px' }}>{t.value}</span>
            </div>
          </div>

            <div class='label2' style={{ width: '10%' }}>
            <button onClick={(e) => addForm(t, e)} aria-hidden="false" id={t.id + '-row-action'} aria-labelledby={t.id + '-row-action ' + t.id + '-row-title'} type="button" class="editBtn">
              수정
            </button>
            <div id="kite">
              ß
            </div>
          </div>

          
        </div>
        <Divider />
      </div>
    );
  }
  return list;
}

const updateForm = (t, e) => {
  e.preventDefault();
  console.log(t);
  const rootElement = document.getElementById("kite");
  const elemet = React.createElement('div', { children: 
    <Update title={t.title} body={t.value} onUpdate={(title, body)=>{
      console.log(title, body);
      // const newItems = [...menu]
      // const updatedItems = {id:t.id, title: title, value:body}
      // for(let i=0; i<newItems.length; i++){
      //   if(newItems[i].id === id){
      //     newItems[i] = updatedItems;
      //     break;
      //   }
      // }
      // setTopics(newItems);
    }}>update</Update>
  })
  ReactDOM.render(elemet, rootElement); // (주입할 대상, root) -> 자바스크립트로 따지면 append()
}


function Update(props){
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return (
    <form action="데이터를 전송할 서버 주소" onSubmit={e=>{
      e.preventDefault();
      const title = e.target.title.value;
      const body = e.target.body.value;
      props.onUpdate(title, body);
      }}>
      <p>
      <input type="text" id={props} name="title" value={title} onChange={e=>{
        console.log(e.target.value);
        setTitle(e.target.value);
      }} />
      </p>
      <p>
      <input type="text" id={props} name="body" value={body} onChange={e=>{
        console.log(e.target.value);
        setBody(e.target.value);
      }} />
      </p>
      <input type="submit" value="저장" />
    </form>
  )
}

const form = (t) => {
  console.log(t.title, t.value)
  return (
    <form action="데이터를 전송할 서버 주소" onSubmit={e=>{
      e.preventDefault();}}>
      <input type="text" id={t.id} name={t.name} value="" />
      <input type="submit" value="저장" />
    </form>
    // <Update title={t.title} body={t.value} onUpdate={(title, body)=>{
    //   console.log(title, body);

    // }}>update</Update>
  )
}
var count = 0;
function addForm(param, e) {
  console.log(param);
  e.preventDefault();
  // var addedFormDiv = document.getElementById(param + '-row-subtitle');
  // var str = '<form action="데이터를 전송할 서버 주소"> <input type="text" id=' + param + '-row-subtitle name=' + param + ' value=""/>'
  //   + '<input type="submit" value="저장"/> </form>';
  // var string = '<input type="text" id=' + param + '-row-subtitle name=' + param + ' value=""/>'
  //   + '<input type="submit" value="저장"/>';
  if (count == 0) {
    // var addedDiv = document.createElement("div");
    // addedDiv.setAttribute("id", "keyword_Frm");
    // addedDiv.innerHTML = str;
    // addedFormDiv.appendChild(addedDiv);
     count++;
    alert("hi")
  }
  else {
    const rootElement = document.getElementById("kite");
    const elemet = React.createElement("h1", { children: "Hello, World" })
    ReactDOM.render(elemet, rootElement); // (주입할 대상, root) -> 자바스크립트로 따지면 append()
  }
}

function delKeywordForm(count) {
  var addedFormDiv = document.getElementById("apple");

  if (count > 1) {
    var thisDiv = document.getElementById("keyword_Frm" + count);
    addedFormDiv.removeChild(thisDiv);
  }
  else {
    document.addedFormDiv.reset();
  }
  count--;
}

const MyInfo = () => {
  const menu = [
    { id: 'nickname', title: '닉네임', value: '모나리자' },
    { id: 'name', title: '이름', value: '한새라' },
    { id: 'birth', title: '생년월일', value: '991203' },
    { id: 'email', title: '이메일 주소', value: 'hsr1203@kumoh.ac.kr' },
    { id: 'phone', title: '전화번호', value: '01012345678' },
    { id: 'address', title: '주소', value: '구미시대학로61' }
  ]
  return (
    <StyledBox>
      <StyledTop>
        <h2>내 정보</h2>
      </StyledTop>
      <Box menu={menu} />
    </StyledBox>
  );
};

export default MyInfo