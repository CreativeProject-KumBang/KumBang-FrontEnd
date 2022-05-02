import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import styled from "styled-components";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Button, TextField } from '@material-ui/core'
import dayjs from "dayjs";
import Api from 'API/Api';

const StyledH4 = styled.h4`
  padding: 4px 10px;
`;

const StyledDiv = styled.div`
    padding: 2px 15px;
    overflow:auto;
`;

const StyledInput = styled.input`
    border-radius: 2px; /* 테두리 둥글게 */
    border-width: thin;
    box-shadow: 0px;
    width: 200px;
    height: 30px;
`;

const BoardWriteComponent = () => {
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [title, setTitle] = useState(''); // 제목
    const [location, setLocation] = useState(''); // 양도 매물 주소 - 주소
    const [location_detail, setLocation_detail] = useState(''); // 양도 매물 주소 - 상세 주소
    // 양도 기간(duraion)
    const [startDate, setStartDate] = useState(new Date()); // 시작 날짜
    const [endDate, setEndDate] = useState(new Date()); // 종료 날짜
    const startDateFormat = dayjs(startDate).format("YYYY-MM-DD");
    const endDateFormat = dayjs(endDate).format("YYYY-MM-DD");
    // 양도 거래금액
    const [price, setPrice] = useState('');
    // 원 계약보증금/월세
    const [contract_deposit, setContract_deposit] = useState('');
    const [contractMonthlyFee, setContractMonthlyFee] = useState('');
    // 매물 정보 HomeInfo
    const [park, setPark] = useState(''); // 주차
    const [elevator, setElevator] = useState(''); // 엘리베이터
    const [structure, setStructure] = useState(''); // 구조
    const [admin_expense, setAdmin_expense] = useState(''); // 관리비
    const [area, setArea] = useState(''); // 면적
    const [contain_admin_expense, setContain_admin_expense] = useState(''); // 관리비 포함 항목
    
    // 옵션 사용 가능 정보
    const checkList = [ "에어컨", "냉장고", "세탁기", "가스레인지", "전자레인지", "책상", "책장", "옷장", "신발장"]
    const [checked, setChecked] = useState([]);
    const [options, setOptions] = useState(''); // 에어컨, 냉장고, 세탁기, 가스레인지, 전자레인지, 책상, 책장, 옷장, 신발장
    const [add_options, setAdd_options] = useState(''); // 옵션 사용 가능 정보 - 추가

    // 이미지 - 컴포넌트 연결
    //const [showImages, setShowImages] = useState([]);
    //const [showImages, setShowImages] = useState([]);

/* !--------------------------------Body--------------------------------! */
    const postBody = {
        "title":"test title",
        "content":"test content",
        "user":{"id":"1"},
        "durationStart":"2022-04-25",
        "durationEnd":"2022-04-28",
        "location":"구미시 대학로 61길", // 주소 입력받는 api등으로 정확한 주소 필요(좌표계산에 필요함)
        "locationDetail":"디지털관 337호",
        "contractDeposit":"1000000", // 방 원래 주인이 계약한 보증금
        "contractMonthlyFee":"250000", // 방 원래 주인이 계약한 월세
        "price":"5000",  // 양도가격
        "priceType":"DAILY", // 양도가격 타입 "DAILY" or "FULL
        "deposit":"100000", // 양도 보증금
        "fixedOption":"1,1,0,0,1,0,1,0",
        "additionalOption":"선풍기 1|건조기 1|드라이기 1",
        "details":{
            "parking":"지하주차장",
            "elevator":"있음",
            "roomStructure":"미니투룸",
            "managementFee":"전기세",
            "containManageFee":"수도세, 가스비",
            "areaSize":"15평"
        }
    };
   /* const[postBody, setPostBody] = useState({
        title: title,
        content: "test content",
        user: { "id" : "1" },
        location: location,
        locationDetail: location_detail,
        durationStart: startDateFormat,
        durationEnd: endDateFormat,
        price: price,
        priceType: "FULL",
        deposit:"100000",
        contractDeposit: contract_deposit,
        contractMonthlyFee: contractMonthlyFee,
        fixedOption: options,
        additionalOption: add_options,
        details : {
            "parking": park,
            "elevator":elevator,
            "roomStructure":structure,
            "managementFee": admin_expense,
            "containManageFee": contain_admin_expense,
            "areaSize": area
        }
        //images: showImages
    });*/

    /*const postBody = {
        title: title,
        content: "test content",
        user: { "id" : "1" },
        location: location,
        locationDetail: location_detail,
        durationStart: startDateFormat,
        durationEnd: endDateFormat,
        price: price,
        priceType: "FULL",
        deposit:"100000",
        contractDeposit: contract_deposit,
        contractMonthlyFee: contractMonthlyFee,
        fixedOption: options,
        additionalOption: add_options,
        details : {
            "parking": park,
            "elevator":elevator,
            "roomStructure":structure,
            "managementFee": admin_expense,
            "containManageFee": contain_admin_expense,
            "areaSize": area
        }

    };*/
    

    async function emptyCheck() {
        if (title.trim() === '') {
            alert('제목을 입력해주세요');
            return;
        } else if (location.trim() === '') {
            alert('주소를 입력해주세요');
            return;
        } else if (location_detail.trim() === '') {
            alert('상세주소를 입력해주세요');
            return;
        } else if (price.trim() === '') {
            alert('양도 거래 가격을 입력해주세요');
            return;
        } else if (contract_deposit.trim() === '') {
            alert('원 계약보증금을 입력해주세요');
            return;
        } else if (contractMonthlyFee.trim() === '') {
            alert('원 월세를 입력해주세요');
            return;
        }
    }
    /*
    // 이미지 상대경로 저장
    const handleAddImages = (event) => {
        const imageLists = event.target.files;
        let imageUrlLists = [...showImages];
    
        for (let i = 0; i < imageLists.length; i++) {
            const currentImageUrl = URL.createObjectURL(imageLists[i]);
            imageUrlLists.push(currentImageUrl);

            const formData = new FormData();
            formData.append('attachments', imageFile);
            let response = await Api.getReadFile(formData);
            if (response.sucess) {
                let image_path = response.files[0].file_path.replace('file\\', '');
                let image = server_path + image_path;
                setPostBody({
                    title: postBody.title,
                    image: image,
                    content: postBody.content
                });
            } else {
                console.log('이미지 업로드 실패');
            }
    
        if (imageUrlLists.length > 10) {
            imageUrlLists = imageUrlLists.slice(0, 10);
        }
    
        setShowImages(imageUrlLists);
    };
    
        // X버튼 클릭 시 이미지 삭제
    const handleDeleteImage = (id) => {
        setShowImages(showImages.filter((_, index) => index !== id));
    };
*/


    const CreateRoomBoard = async () => {

        const isEmpty = emptyCheck();
        if (isEmpty === false) {
            alert(
              '필수항목란을 채워주세요'
            );
            return false;
        }

        //let response = await Api.postRoomBoard(postBody);
        navigate('/');
        /*
        if (response.status) {
            alert('생성되었습니다.', response.status);
            navigate('/');
        } else {
            alert('생성 실패', response.status);
        }*/
    }

    // check 박스 children
    // 에어컨, 냉장고, 세탁기, 가스레인지, 전자레인지, 책상, 책장, 옷장, 신발장
    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
      };


    return (
        <div>
            <StyledH4>제목</StyledH4>
            <StyledDiv>
                <StyledInput id="outlined-basic" required
                    type="text"
                    placeholder="제목"
                    onChange={(event) => setTitle(event.target.value)}
                />
            </StyledDiv>

            <StyledH4>양도 매물 주소</StyledH4>
            <StyledDiv>
                <StyledInput id="outlined-basic" required
                    type="text"
                    placeholder="주소"
                    onChange={(event) => setLocation(event.target.value)}
                />
            </StyledDiv>
            <StyledDiv>
                <StyledInput id="outlined-basic" required
                    type="text"
                    placeholder="상세 주소"
                    onChange={(event) => setLocation_detail(event.target.value)}
                />
            </StyledDiv>

            <StyledH4>양도 기간</StyledH4>
            <div>
                <StyledDiv>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            value={startDate}
                            inputFormat={"yyyy-MM-dd"}
                            mask={"____-__-__"}
                            onChange={date => setStartDate(date)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </StyledDiv>
                <StyledDiv>
                    <LocalizationProvider  dateAdapter={AdapterDateFns}>  
                        <DesktopDatePicker 
                            value={endDate}
                            inputFormat={"yyyy-MM-dd"}
                            mask={"____-__-__"}
                            onChange={date => setEndDate(date)}
                            required
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </StyledDiv>
                <StyledDiv className="text-gray-500 mt-4">
                    시작날짜: {moment(startDate).format("YYYY-MM-DD")} ~  
                    종료날짜: {moment(endDate).format("YYYY-MM-DD")} 
                </StyledDiv>
            </div>

            <StyledH4>양도 거래금액</StyledH4>
            <StyledDiv>
                <StyledInput id="outlined-basic" required
                    type="text"
                    placeholder="ex) 30000"
                    onChange={(event) => setPrice(event.target.value)}
                />
            </StyledDiv>

            <StyledH4>원 계약보증금/월세</StyledH4>
            <StyledDiv>
                <StyledInput id="outlined-basic"  required
                    type="text"
                    placeholder="계약보증금"
                    onChange={(event) => setContract_deposit(event.target.value)}
                />
            </StyledDiv>
            <StyledDiv>
                <StyledInput id="outlined-basic" required
                    type="text"
                    placeholder="월세"
                    onChange={(event) => setContractMonthlyFee(event.target.value)}
                />
            </StyledDiv>

            <StyledH4>매물 정보</StyledH4>
            <div>
                <StyledDiv>
                    <StyledInput id="outlined-basic"
                        type="text"
                        placeholder="ex) 1대 가능"
                        onChange={(event) => setPark(event.target.value)}
                    />
                </StyledDiv>
                <StyledDiv>
                    <StyledInput id="outlined-basic"
                        type="text"
                        placeholder="ex) 없음"
                        onChange={(event) => setElevator(event.target.value)}
                    />
                </StyledDiv>
                <StyledDiv>
                    <StyledInput id="outlined-basic"
                        type="text"
                        placeholder="ex) 오픈형 원룸(욕실 1개)"
                        onChange={(event) => setStructure(event.target.value)}
                    />
                </StyledDiv>
                <StyledDiv>
                    <StyledInput id="outlined-basic"
                        type="text"
                        placeholder="ex) 4만원 관리비 외 사용따라 부과"
                        onChange={(event) => setAdmin_expense(event.target.value)}
                    />
                </StyledDiv>
                <StyledDiv>
                    <StyledInput id="outlined-basic"
                        type="text"
                        placeholder="ex) 19.78m2"
                        onChange={(event) => setArea(event.target.value)}
                    />
                </StyledDiv>
            </div>

            <StyledH4>관리비 포함 항목</StyledH4>
            <StyledDiv>
                <StyledInput id="outlined-basic"
                    type="text"
                    placeholder="ex) 0만원(전기, 가스 별도)
                    ex) 4만원(전기, 가스 별도) - wifi, 수도세, 티비"
                    onChange={(event) => setContain_admin_expense(event.target.value)}
                />
            </StyledDiv>

            <StyledH4>옵션 사용 가능 정보</StyledH4>
            <StyledDiv>
                <StyledDiv>
                    {/*checkList.map((item, index) => (
                        <div key={index}>
                            <input value={item} type="checkbox"  />
                            <span>{item}</span>
                        </div>
                    ))*/}
                </StyledDiv>
                <StyledDiv>
                    <StyledInput id="outlined-basic" 
                        type="text"
                        placeholder="추가 옵션 가능 정보"
                        onChange={(event) => setAdd_options(event.target.value)}
                    />
                </StyledDiv>
            </StyledDiv>

            
    {/*
            <div>
                <StyledH4>이미지 첨부</StyledH4>
                <StyledDiv>
                    <label htmlFor="input-file"  onChange={handleAddImages}>
                    <input type="file" id="input-file" accept="image/*" multiple />
                    </label>
            
                    {showImages.map((image, id) => (
                    <StyledDiv  key={id}>
                        <img src={image} alt={`${image}-${id}`} />
                        <button onClick={() => handleDeleteImage(id)}>❌</button>
                    </StyledDiv>
                    ))}
                </StyledDiv>
            </div>
    */}
            <StyledDiv>
                <Button variant="outlined" color="success" onClick={CreateRoomBoard}>
                    등록
                </Button>
            </StyledDiv>

    
            
        </div>
    )
}

export default BoardWriteComponent