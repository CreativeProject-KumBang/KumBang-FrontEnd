/* global kakao */
import React, { useEffect, useRef, useState } from 'react';
import cn from "classnames";
import Api from 'API/Api';
import { base_url } from 'API/Url';

const { kakao } = window;

let markerList=[];
let overlayList=[];

const Map = (props) => {
    const mapRef = useRef();
    let clusterer = useRef();

    const [cordX, setCordX] = useState(128.41015);
    const [cordY, setCordY] = useState(36.13654);
    const [level, setLevel] = useState(5);
    props.setX(cordX);
    props.setY(cordY);
    props.setL(level);

    const allData = {
        x: cordX,
        y: cordY,
        level: level,
        startDate: props.filter.startDate,
        endDate: props.filter.endDate,
        durationType: props.filter.durationType,
        priceStart: props.filter.priceStart,
        priceEnd:props.filter.priceEnd
    }
    const [postBody, setPostBody] = useState([]);

    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(cordY, cordX),
            level: level,
        };
        console.log(level);
        //지도 생성
        mapRef.current = new kakao.maps.Map(container, options);
        //지도 우측 상단에 줌 컨트롤러 생성
        var zoomControl = new kakao.maps.ZoomControl();
        mapRef.current.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        clusterer.current = new kakao.maps.MarkerClusterer({
            map: mapRef.current, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
            averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
            minClusterSize: 1,
            minLevel: 3,
            calculator: [1, 3, 5, 10],
            disableClickZoom: true 
        });
    },[]);

    /*------------------------필터 조회 결과값 바뀔때마다 서버 통신------------------------------*/
    useEffect(() => {
        if(level < 5){
            const response = async () => await Api.getAllRoomBoard(allData)
            const getData = async () => {
                const resBody = await response();
                setPostBody(resBody.data.response[0].content);
                console.log(resBody.data.response[0].content);
            }
            getData();
        }
    },[props.getBody])
    
    /*------------------------x, y, level 값 바뀔때마다 서버 통신------------------------------*/
    useEffect(() => {
        if (level >= 5) {
            const response = async () => await Api.getLocation({x:cordX, y:cordY, level:level})
            const getData = async () => {
                const resBody = await response();
                setPostBody(resBody.data.response[0].content);
            }
            getData();
            console.log(postBody)
        }
        else {
            const response = async () => await Api.getAllRoomBoard(allData)
            const getData = async () => {
                const resBody = await response();
                setPostBody(resBody.data.response[0].content);
                props.setGetBody(resBody.data.response[0].content);
                console.log(resBody.data.response[0].content);
            }
            getData();
        }

        /*------------------------드래그 중심 좌표 이동 이벤트 발생------------------------------*/
        kakao.maps.event.addListener(mapRef.current, 'dragend', function () {
            // 지도의 중심좌표
            var latlng = mapRef.current.getCenter();
            setCordX(latlng.getLng());
            setCordY(latlng.getLat());
            //지도의 레벨
            setLevel(mapRef.current.getLevel());
        })

        /*------------------------줌인,줌아웃 중심 좌표 이동 이벤트 발생------------------------------*/
        kakao.maps.event.addListener(mapRef.current, 'zoom_changed', function () {
            // 지도의 중심좌표
            var latlng = mapRef.current.getCenter();
            setCordX(latlng.getLng());
            setCordY(latlng.getLat());
            //지도의 레벨
            setLevel(mapRef.current.getLevel());
        });

    }, [cordX, cordY, level]);
    
    //마커들 비우기
    function resetMarkers() {
        markerList.forEach(m => {m.setMap(null)});
        markerList=[];
        overlayList.forEach(o => {o.setMap(null)});
        overlayList=[];
        clusterer.current.clear();
    }
    //시, 동 마커 디자인
    function markerCityTown(infoList, color) {
        infoList.forEach(info => {
            let content = `<div class="box" 
            style="display:block; border-radius:6px; border: 1px solid #ccc;
            border-bottom:2px solid #ddd; text-align:center; font-size:15px;
            background:#fff;">
                <div class="title" style="border-bottom:2px solid #ddd; background:${color};">
                ${info.data}
                </div>
                <span class="number" style="padding:5px">${info.price}원</span>
            </div>`;
            // 커스텀 오버레이가 표시될 위치입니다 
            let position = new kakao.maps.LatLng(info.lat, info.lng);
            // 커스텀 오버레이를 생성합니다
            let customOverlay = new kakao.maps.CustomOverlay({
                position: position,
                content: content
            });
            // 커스텀 오버레이를 지도에 표시합니다
            customOverlay.setMap(mapRef.current);
            markerList.push(customOverlay);
        })
    }

    /*------------------------마커 띄우기------------------------------*/
    let imageSrc = 'https://ifh.cc/g/SafXNw.png'; //금방 마커이미지
    useEffect(() => {
        let imageSize = new kakao.maps.Size(50, 50); // 마커이미지의 크기
        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        resetMarkers();
        /*------------------------레벨 조건 시작-----------------------------*/
        if (level >= 9) {
            const infos = postBody.map(info => {
                return (
                    {
                      data: info.city,
                      price: info.price,
                      lat: info.enty,
                      lng: info.entx,
                    }
                )
            });
            markerCityTown(infos, 'limeGreen');
        }
        else if (level >= 5) {
            const infos = postBody.map(info => {
                return (
                    {
                      data: info.town,
                      price: info.price,
                      lat: info.enty,
                      lng: info.entx,
                    }
                )
              });
            markerCityTown(infos, 'orange');
        }
        else {
            const overlayInfos = postBody.map(info => {
                console.log(info);
                if(info.thumbnail === null) {
                    return (
                      {
                        title: info.title,
                        start: info.durationStart,
                        end: info.durationEnd,
                        price: info.price,
                        lat: info.enty,
                        lng: info.entx,
                        img: "/image/notfound.png",
                      }
                    )
                }
                return ({
                    title: info.title,
                    start: info.durationStart,
                    end: info.durationEnd,
                    price: info.price,
                    lat: info.enty,
                    lng: info.entx,
                    img: info.thumbnail.path,
                });
            });

            console.log(level);

            overlayInfos.forEach(el => {
                let marker = new kakao.maps.Marker({
                    map: mapRef.current,
                    position: new kakao.maps.LatLng(el.lat, el.lng),
                    title: el.title,
                    image: markerImage
                });

                //배열에 마커 추가
                markerList.push(marker);

                let content =
                    '<div class="wrap">' +
                    // '<ㅁㅁ class="wrap">' +
                    '    <div class="info">' +
                    '       <div class="title">' +
                    `         <h3 class="accommName">${el.title}</h3>` +
                    '       </div>' +
                    '       <div class="body">' +
                    '            <div class="img">' +
                    `               <img src=${base_url+el.img} width="100" height="100">` +
                    '            </div>' + 
                    '            <div class="desc">' + 
                    `               <p class="accommPeriod">양도 기간</p>` +
                    `               <p class="accommPeriod">${el.start}~${el.end}</p>` +
                    `               <h3 class="accommPrice">₩${Number(el.price).toLocaleString()}/박</h3>` +
                    '            </div>' +
                    '       </div>' +
                    '    </div>' +
                    '</div>';

                let position = new kakao.maps.LatLng(el.lat, el.lng);
                let customOverlay = new kakao.maps.CustomOverlay({
                    position: position,
                    content: content,
                    clickable: true,
                });

                let toggle = true;
                kakao.maps.event.addListener(marker, 'click', function () {
                  if(toggle === true){
                    customOverlay.setMap(mapRef.current);
                      return toggle = false;
                  }
                  if(toggle === false){
                    customOverlay.setMap(null);
                      return toggle = true;
                  }
                });

                overlayList.push(customOverlay)

                clusterer.current.addMarker(marker);
                
            //   kakao.maps.event.addListener(marker, 'mouseout', function () {
            //       setTimeout(function () {
            //           customOverlay.setMap(null);
            //       },1000);
            //   });
            });
            kakao.maps.event.addListener(clusterer.current, 'clusterclick', function(cluster) {
                // 현재 지도 레벨에서 1레벨 확대한 레벨
                let level = mapRef.current.getLevel()-1;
                // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
                mapRef.current.setLevel(level, {anchor: cluster.getCenter()});
            });
        }
    }, [postBody]);

    return (
        <div className="MapContainer" id="map" style={{
            width: '100%',
            height: '100%'
        }}>
        </div>
    );
};

export default Map;