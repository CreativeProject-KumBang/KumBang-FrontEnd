import React, { useState } from 'react';
import styled from "styled-components";
import Button from '@mui/material/Button';
import Api from 'API/Api';

const StyleImg = styled.img`
  max-width: 300px;
  max-height: 300px;
`;

const Images = (props) => {
  const pk_id = props.pk_id;
  const setPk = props.setPk;
  const [fileList, setFileList] = useState([]);
  const [fileListUI, setFileListUI] = useState([]);
  const [isUpload, setIsUpload] = useState(false);

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

    setFileListUI(imageUrlLists);
  };

  const onFileUpload = async () => {
    var formData = new FormData();

    for (let i = 0; i < fileList.length; i++) {
      formData.append('files', fileList[i]);
    }

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    let resBody = await Api.getReadFile(formData); // API File_pk 요청

    let pk_id_test = resBody.data.response;
    setPk(pk_id_test); // 부모에게 pk값 전달


    if (resBody.data.status) {
      setIsUpload(true); // 업로드 완료 상태 저장
      alert('업로드 완료.', resBody.data.status);
    } else {
      alert('업로드 실패', resBody.data.status);
    }

  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = async(id) => {
    
    const dummy = fileListUI.filter((_, index) => index !== id);
    setFileList(dummy);
    setFileListUI(dummy);
     
    // api 코드 - 삭제
    if (isUpload) {

      let delete_pk_llist = pk_id[0];
      let delete_pk = delete_pk_llist[id];
  
      let response = await Api.deleteFile(delete_pk.id);
  
      if (response.data.status) {
        alert('삭제 완료.', response.data.status);

        const dummyPk = delete_pk_llist.filter((_, index) => index !== id);
        setPk(dummyPk);
      } else {
        alert('삭제 실패', response.data.status);
      }

    } else {
      console.log("업로드 전 이미지 삭제 완료");
    }
    console.log(fileList, fileListUI);
    console.log(pk_id);
  };

  return (
    <div>

      <label htmlFor="input-file" onChange={onSaveFiles}>
        <input type="file" id="input-file" accept="image/*" multiple />
      </label>
      <Button onClick={onFileUpload}>파일 업로드</Button>

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