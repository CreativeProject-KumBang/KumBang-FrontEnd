import React, { useState } from 'react';
import styled from "styled-components";
import { Button } from '@material-ui/core'
import Api from 'API/Api';


const StyleImg = styled.img`
  max-width: 300px;
  max-height: 300px;
`;

const Images = (props) => {
    const [fileList, setFileList] = useState([]);
  
    // 이미지 상대경로 저장
    const onSaveFiles = (event) => {
      const uploadFiles = event.target.files;
      let imageUrlLists = [...fileList];
      // const uploadFiles = Array.prototype.slice.call(e.target.files); // 파일선택창에서 선택한 파일들
  
      for (let i = 0; i < uploadFiles.length; i++) {
        let currentImageUrl = URL.createObjectURL(uploadFiles[i]);
        imageUrlLists.push(currentImageUrl);
      }
  
      if (imageUrlLists.length > 10) {
        imageUrlLists = imageUrlLists.slice(0, 10);
      }
  
      setFileList(imageUrlLists);
    };

    const onFileUpload = () => {
      const formData = new FormData();

      fileList.forEach((file) => {
          // 파일 데이터 저장
          formData.append('multipartFiles', file);
      });
      // formData.append('stringFoodDto', JSON.stringify(foodDto)); // 직렬화하여 객체 저장

      let response = {
        status: true
      }
      //let response = await Api.getReadFile(formData); // API
      //props.setPk(response.response); // 부모에게 pk값 전달
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
        <label htmlFor="input-file"  onChange={onSaveFiles}>
          <input type="file" id="input-file" accept="image/*" multiple />
        </label>
        <Button onClick={onFileUpload}>파일 업로드</Button>

        {fileList.map((image, id) => (
          <div  key={id}>
            <StyleImg src={image} alt={`${image}-${id}`} />
            <button onClick={() => handleDeleteImage(id)}>❌</button>
          </div>
        ))}
      </div>
    );
  };

  export default Images