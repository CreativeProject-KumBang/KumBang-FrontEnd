import React, { useState } from 'react';
import styled from "styled-components";
import Button from '@mui/material/Button';
import Api from 'API/Api';


const StyleImg = styled.img`
  max-width: 300px;
  max-height: 300px;
`;

const Images = (props) => {
  const [fileList, setFileList] = useState([]);
  const [fileListUI, setFileListUI] = useState([]);

  // 이미지 상대경로 저장
  const onSaveFiles = (event) => {
    const uploadFiles = event.target.files;
    setFileList(uploadFiles);

    let imageUrlLists = [...fileList];

    // url 객체화 코드
    for (let i = 0; i < uploadFiles.length; i++) {
      let currentImageUrl = URL.createObjectURL(uploadFiles[i]);
      imageUrlLists.push(currentImageUrl);
    }

    // 개수 제한 코드
    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    setFileListUI(uploadFiles);
  };

  const onFileUpload = async () => {
    var formData = new FormData();

    for (let i = 0; i < fileList.length; i++) {
      formData.append('files', fileList[i]);
    }

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    // formData.append('stringFoodDto', JSON.stringify(foodDto)); // 직렬화하여 객체 저장

    /*let respose = {
      status: true
    }*/
    let response = await Api.getReadFile(formData); // API File_pk 요청
    console.log(response);

    props.setPk(response.response); // 부모에게 pk값 전달


    if (response.status) {
      alert('업로드 완료.', response.status);
    } else {
      alert('업로드 실패', response.status);
    }

  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id) => {
    setFileList(fileList.filter((_, index) => index !== id));
  };

  return (
    <div>
      /*
        <label htmlFor="input-file"  onChange={onSaveFiles}>
          <input type="file" id="input-file" accept="image/*" multiple />
    </label>*/

      {fileListUI.map((image, id) => (
        <div key={id}>
          <StyleImg src={image} alt={`${image}-${id}`} />
          <Button variant="outlined" onClick={() => handleDeleteImage(id)}>❌</Button>
        </div>
      ))}
    </div>
  );
};

export default Images