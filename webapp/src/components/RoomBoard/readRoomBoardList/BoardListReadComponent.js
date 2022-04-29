import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment, { locale } from 'moment';
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

// axios 통신을 통해 받아온 RoomBoard 정보
const RoomBoard = useState({
    title: title,
    user: { "id" : id },
    location: location,
    location_detail: location_detail,
    durationStart: startDate,
    durationEnd: endDate,
    price: price,
    image: {
        "0": "showImages[0]",
        "1": "showImages[1]",
    }
})

const BoardListReadComponent = () => {
    
    const [id, setId] = useState(0);
    const [writer, setWriter] = useState([]); // 작성자
    const [title, setTitle] = useState([]); // 제목
    const [location, setLocation] = useState([]); // 양도 매물 주소 - 주소
    const [location_detail, setLocation_detail] = useState([]); // 양도 매물 주소 - 상세 주소
    // 양도 기간(duraion)
    const [startDate, setStartDate] = useState(new Date()); // 시작 날짜
    const [endDate, setEndDate] = useState(new Date()); // 종료 날짜
    // 양도 거래금액
    const [price, setPrice] = useState([]);
    // 이미지 - 컴포넌트 연결
    const [showImages, setShowImages] = useState([[]]);

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
                <StyledDiv>
                    <StyledDiv  key={id}>
                        <div value={add_options} />
                    </StyledDiv>
                </StyledDiv>
            </StyledDiv>

            <StyledH5>이미지 슬라이드</StyledH5>
            <StyledDiv>
                {showImages.map((image, id) => (
                <StyledDiv  key={id}>
                    <img src={image} alt={`${image}-${id}`} />
                </StyledDiv>
                ))}
            </StyledDiv>
            
        </div>
    )
}

export default BoardListReadComponent