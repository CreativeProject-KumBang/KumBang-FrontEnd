import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import moment, { locale } from 'moment';
import { FormGroup, FormControlLabel, Checkbox, Button } from '@material-ui/core'
import Api from 'API/Api';

const StyledH5 = styled.h5`
`;

const StyledDiv = styled.div`
    padding: 6px 8px;
`;

const StyledInput = styled.input`
    border-radius: 2px; /* 테두리 둥글게 */
    border-width: thin;
    box-shadow: 0px;
    width: 200px;
    height: 30px;
`;

const BoardWriteComponent = () => {
    

    const [id, setId] = useState(0);
    const [title, setTitle] = useState(''); // 제목
    const [location, setLocation] = useState(''); // 양도 매물 주소 - 주소
    const [location_detail, setLocation_detail] = useState(''); // 양도 매물 주소 - 상세 주소
    // 양도 기간(duraion)
    const [startDate, setStartDate] = useState(new Date()); // 시작 날짜
    const [endDate, setEndDate] = useState(new Date()); // 종료 날짜
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
    const [options, setOptions] = useState([Boolean]);
    const [add_options, setAdd_options] = useState(''); // 옵션 사용 가능 정보 - 추가

    // 이미지 - 컴포넌트 연결
    const [showImages, setShowImages] = useState([]);

/* !--------------------------------Body--------------------------------! */
    const[postBody, setPostBody] = useState({
        title: title,
        user: { "id" : id },
        location: location,
        location_detail: location_detail,
        durationStart: startDate,
        durationEnd: endDate,
        price: price,
        contract_deposit: contract_deposit,
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
    });
    

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
        } else if (startDate.trim() === '') {
            alert('양도 기간을 선택해주세요');
            return;
        } else if (endDate.trim() === '') {
            alert('양도 기간을 입력해주세요');
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
        } else if (showImages.trim() === '') {
            alert('이미지 첨부해주세요');
            return;
        }
    }

    // 이미지 상대경로 저장
    const handleAddImages = (event) => {
        const imageLists = event.target.files;
        let imageUrlLists = [...showImages];
    
        for (let i = 0; i < imageLists.length; i++) {
            const currentImageUrl = URL.createObjectURL(imageLists[i]);
            imageUrlLists.push(currentImageUrl);
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

    const CreateRoomBoard = async () => {

        const isEmpty = emptyCheck();
        if (isEmpty === false) {
            alert(
              '필수항목란을 채워주세요'
            );
            return false;
        }


        let response = await Api.postProject(postBody);
        if (response.sucess) {
            alert('생성되었습니다.');
            
            const target = '/app/dashboard';
            window.location.href = target;
        } else {
            alert('생성 실패');
        }
    }


    return (
        <div>
            <StyledH5>제목</StyledH5>
            <StyledDiv>
                <StyledInput id="outlined-basic" required
                    type="text"
                    placeholder="제목"
                    onChange={(event) => setTitle(event.target.value)}
                />
            </StyledDiv>

            <StyledH5>양도 매물 주소</StyledH5>
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

            <StyledH5>양도 기간</StyledH5>
            <StyledDiv>
                <DatePicker
                    popperModifiers={{
                        preventOverflow: {enable: true}
                    }}
                    popperPlacement="auto"
                    dateFormat="yyyy-MM-dd"
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    required
                />
                
                <DatePicker
                    popperModifiers={{
                        preventOverflow: {enable: true}
                    }}
                    popperPlacement="auto"
                    dateFormat="yyyy-MM-dd"
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    required
                />
                <StyledDiv className="text-gray-500 mt-4">
                    시작날짜: {moment(startDate).format("YYYY-MM-DD")} ~  
                    종료날짜: {moment(endDate).format("YYYY-MM-DD")} 
                </StyledDiv>
            </StyledDiv>

            <StyledH5>양도 거래금액</StyledH5>
            <StyledDiv>
                <StyledInput id="outlined-basic" required
                    type="text"
                    placeholder="ex) 30000"
                    onChange={(event) => setPrice(event.target.value)}
                />
            </StyledDiv>

            <StyledH5>원 계약보증금/월세</StyledH5>
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

            <StyledH5>매물 정보</StyledH5>
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

            <StyledH5>관리비 포함 항목</StyledH5>
            <StyledDiv>
                <StyledInput id="outlined-basic"
                    type="text"
                    placeholder="ex) 0만원(전기, 가스 별도)
                    ex) 4만원(전기, 가스 별도) - wifi, 수도세, 티비"
                    onChange={(event) => setContain_admin_expense(event.target.value)}
                />
            </StyledDiv>

            <StyledH5>옵션 사용 가능 정보</StyledH5>
            <StyledDiv>
                <button>+</button>
                <button>-</button>
                <FormGroup>
                    <FormControlLabel 
                        control={<Checkbox defaultChecked />} 
                        label="책상"
                    />
                    <FormControlLabel 
                        control={<Checkbox defaultChecked />} 
                        label="냉장고" 
                    />
                </FormGroup>
                <StyledInput id="outlined-basic" 
                    type="text"
                    placeholder="추가 옵션 가능 정보"
                    onChange={(event) => setAdd_options(event.target.value)}
                />
            </StyledDiv>

            

            <div>
                <StyledH5>이미지 첨부</StyledH5>
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
            <Button
                  variant="contained"
                  color="success"
                  onClick={CreateRoomBoard}
                >
                  <h3
                    style={{
                      color: 'orange'
                    }}
                  >
                    등록
                  </h3>
            </Button>
            
        </div>
    )
}

export default BoardWriteComponent