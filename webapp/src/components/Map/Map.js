/* global kakao */
import React, { useEffect, useState } from "react";
import cn from "classnames";
import Api from "API/Api";


//스크립트로 kakao maps api를 가져오면 window전역 객체에 들어감. 사용하려면 window에서 kakao 객체 뽑아서 사용
const { kakao } = window;
const Map = (props) => {
  useEffect(() => { //useEffect를 이용하여 렌더링 될 때 지도를 띄우는데 두번째 인자로 []를 줘서 처음 렌더링될 때 한번만 띄우게 한다.
    let container = document.getElementById("map"); // 지도의 중심 좌표

    let options = {
      center: new window.kakao.maps.LatLng(36.13654, 128.41015), //지도 초기 좌표
      level: 5,//지도 초기 확대 배율, 레벨 5이상 좌표랑 레벨 보내주기.
    };

    /*---------------------------위도, 경도, 축적 값 전달------------------------------*/
    //초기 위도 값 전달 
    var lat = document.getElementById('latitude');
    lat.innerHTML = options.center.Ma;
    //초기 경도 값 전달
    var lng = document.getElementById('longitude');
    lng.innerHTML = options.center.La;
    //초기 축적 값 전달
    var center = document.getElementById('level');
    center.innerHTML = options.level;

    let map = new window.kakao.maps.Map(container, options); // 지도 생성

    console.log("loading kakaomap");

    /*---------------------------마커 표시------------------------------*/
    // 지도에 마커를 표시합니다 
    var positions = [
      {
        title: '카카오',
        latlng: new kakao.maps.LatLng(36.13654, 128.41015)
      },
      {
        title: '생태연못',
        latlng: new kakao.maps.LatLng(36.13654, 128.569477)
      },
      {
        title: '텃밭',
        latlng: new kakao.maps.LatLng(36.13654, 128.569940)
      },
      {
        title: '근린공원',
        latlng: new kakao.maps.LatLng(33.451393, 128.570738)
      }
    ];

    // 마커 이미지의 이미지 주소입니다
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    for (var i = 0; i < positions.length; i++) {

      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다    
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage // 마커 이미지 
      });
    }

    /*---------------------------커스텀 오버레이 표시------------------------------*/
    var data = {
      item: [
        {
          location: "제주특별자치도 제주시 첨단로 242",
          detail_location: "201호",
          deposit: "100000",
          price: "20000",
        },
        {

        }
      ]
    }

    // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
    function closeOverlay() {
      overlay.setMap(null);
    }

    // 커스텀 오버레이에 표시할 컨텐츠 입니다
    // 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
    // 별도의 이벤트 메소드를 제공하지 않습니다 
    var content = '<div class="wrap" >' +
      '    <div class="info" >' +
      '        <div class="title">' +
      '{data.map}' +
      '            <div class="close" onclick="closeOverlay" title="닫기"></div>' +
      '        </div>' +
      '        <div class="body">' +
      '            <div class="img" >' +
      '                <img src={"https://cfile181.uf.daum.net/image/250649365602043421936D"} width="73" height="70">' +
      '           </div>' +
      '            <div class="desc">' +
      '                <div class="ellipsis1">보증금: 100000</div>' +
      '                <div class="ellipsis2">월세: 20000</div>' +
      '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">자세히보기</a></div>' +
      '            </div>' +
      '        </div>' +
      '    </div>' +
      '</div>';

    // 마커 위에 커스텀오버레이를 표시합니다
    // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
    var overlay = new kakao.maps.CustomOverlay({
      content: content,
      map: map,
      position: marker.getPosition()
    });

    // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
    kakao.maps.event.addListener(marker, 'click', function () {
      overlay.setMap(map);
    });

    /*---------------------------중심 좌표 이동 이벤트 발생------------------------------*/
    kakao.maps.event.addListener(map, 'center_changed', function () {

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