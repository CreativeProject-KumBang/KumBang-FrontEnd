/* global kakao */
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from "classnames";
import Api from 'API/Api';

const { kakao } = window;

const Map = () => {
    const mapRef = useRef();

    const [cordX, setCordX] = useState(128.41015);
    const [cordY, setCordY] = useState(36.13654);
    const [level, setLevel] = useState(5);
    const [postBody, setPostBody] = useState([]);

    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(cordY, cordX),
            level: level,
        };
        //지도 생성
        mapRef.current = new kakao.maps.Map(container, options);
        //지도 우측 상단에 줌 컨트롤러 생성
        var zoomControl = new kakao.maps.ZoomControl();
        mapRef.current.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        if (level >= 5) {
            const response = async () => await Api.getLocation(cordX, cordY, level)
            const getData = async () => {
                const resBody = await response();
                setPostBody(resBody.data.response[0].content);
            }
            getData();
            console.log(postBody)

        }
        else {
            const response = async () => await Api.getAllRoomBoard(cordX, cordY, level)
            const getData = async () => {
                const resBody = await response();
                setPostBody(resBody.data.response[0].content);
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

    // /*------------------------마커 띄우기------------------------------*/
    var imageSrc = 'https://ifh.cc/g/SafXNw.png'; //금방 마커이미지
    useEffect(() => {
      var imageSize = new kakao.maps.Size(50, 50); // 마커이미지의 크기
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        if (level >= 5) {
          for (var i = 0; i < postBody.length; i++) {
            var content = `<div class="box" 
            style="display:block; border-radius:6px; border: 1px solid #ccc;
            border-bottom:2px solid #ddd; text-align:center; font-size:15px;
            background:#fff;">
              <div class="title" style="border-bottom:2px solid #ddd; background:orange;">
                ${postBody[i].town}
              </div>
              <span class="number" style="padding:5px">${postBody[i].price}원</span>
            </div>`;
            // 커스텀 오버레이가 표시될 위치입니다 
            var position = new kakao.maps.LatLng(postBody[i].enty, postBody[i].entx);
            // 커스텀 오버레이를 생성합니다
            var customOverlay = new kakao.maps.CustomOverlay({
                position: position,
                content: content
            });
            // 커스텀 오버레이를 지도에 표시합니다
            customOverlay.setMap(mapRef.current);
          }
        }
        else {
          const overlayInfos = postBody.map(info => {
              if(info.thumbnail === null) {
                return (
                  {
                    title: info.title,
                    start: info.durationStart,
                    end: info.durationEnd,
                    price: info.price,
                    lat: info.enty,
                    lng: info.entx,
                    img: "/image/bf8354c1-6156-4ba1-8b48-b4028c614f61.png",
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
              console.log(marker.getPosition(), level)
              let content =
                  '<div class="wrap">' +
                  '    <div class="info">' +
                  '       <div class="title">' +
                  `         <h3 class="accommName">${el.title}</h3>` +
                  `         <div class="close" onclick="closeOverlay()" title="닫기"></div>` + 
                  '       </div>' +
                  '       <div class="body">' +
                  '            <div class="img">' +
                  `               <img src="http://jueleejue.iptime.org:80${el.img}" width="100" height="100">` +
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
              });
              kakao.maps.event.addListener(marker, 'mouseover', function () {
                  customOverlay.setMap(mapRef.current);
              });
              // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
              function closeOverlay() {
                customOverlay.setMap(null);     
              }
              // kakao.maps.event.addListener(marker, 'mouseout', function () {
              //     setTimeout(function () {
              //         customOverlay.setMap();
              //     });
              // });
          });
        }
    }, [postBody]);

    return (
        <div className={cn("Map")}>
            <div className="MapContainer" id="map" style={{
                width: '100%',
                height: '100vh'
            }}></div>
            <div id='result'></div>
            <div id='result1'></div>
        </div>
    );
};

export default Map;