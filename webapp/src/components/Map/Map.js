/* global kakao */
import React, { useEffect, useState } from "react";
import cn from "classnames";
import Api from "API/Api";


//스크립트로 kakao maps api를 가져오면 window전역 객체에 들어감. 사용하려면 window에서 kakao 객체 뽑아서 사용
const { kakao } = window;
const Map = (props) => {
  useEffect(() => { //useEffect를 이용하여 렌더링 될 때 지도를 띄우는데 두번째 인자로 []를 줘서 처음 렌더링될 때 한번만 띄우게 한다.
    let container = document.getElementById("map");

    let options = {
      center: new window.kakao.maps.LatLng(36.13654, 128.41015), //지도 초기 좌표
      level: 5,//지도 초기 확대 배율, 레벨 5이상 좌표랑 레벨 보내주기.
    };

    //초기 위도 값 전달 
    var lat = document.getElementById('latitude');
    lat.innerHTML = options.center.Ma;
    //초기 경도 값 전달
    var lng = document.getElementById('longitude');
    lng.innerHTML = options.center.La;
    //초기 축적 값 전달
    var center = document.getElementById('level');
    center.innerHTML = options.level;

    let map = new window.kakao.maps.Map(container, options);

    console.log("loading kakaomap");


    kakao.maps.event.addListener(map, 'dragend', function () {

      // 지도의 중심좌표
      var latlng = map.getCenter();
      //지도의 레벨
      var level = map.getLevel();
      
      const response = async () => await Api.postLocation({ lat: latlng.getLat(), lng: latlng.getLng(), level: level })
      console.log(response());

      //위도 값 전달 
      var lat = document.getElementById('latitude');
      lat.innerHTML = latlng.getLat();
      //경도 값 전달
      var lng = document.getElementById('longitude');
      lng.innerHTML = latlng.getLng();
      //축적 값 전달
      var center = document.getElementById('level');
      center.innerHTML = level;

      console.log(level, latlng.getLat(), latlng.getLng());
    });

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'zoom_changed', function () {

      var latlng = map.getCenter();
      var level = map.getLevel();

      const response = async () => await Api.postLocation({ lat: latlng.getLat(), lng: latlng.getLng(), level: level })
      console.log(response());

      console.log(level, latlng.getLat(), latlng.getLng());
    });

  }, []);

  return (
    <div className={cn("Map")}>
      <div className={cn("MapContainer")} id="map" style={{
        width: '100vw',
        height: '100vh'
      }}></div>
      <div id='result'></div>
      <div id='result1'></div>
    </div>
  );
};

export default Map;