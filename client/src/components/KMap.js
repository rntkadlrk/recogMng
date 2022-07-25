/*global kakao*/ 
import React, { useEffect } from 'react'

const Map=()=>{

  useEffect(()=>{
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    // 주소-좌표 변환 객체를 생성합니다
    //var geocoder = new kakao.maps.services.Geocoder();

    var map = new kakao.maps.Map(container, options);
    // 마커

    // 마커를 표시할 위치와 title 객체 배열입니다 
    // 여기에 데이터 받아서 담아야 합니다.
    var positions = [
        {
            title: '카카오', 
            latlng: new kakao.maps.LatLng(33.450705, 126.570677)
        },
        {
            title: '생태연못', 
            latlng: new kakao.maps.LatLng(33.450936, 126.569477)
        },
        {
            title: '텃밭', 
            latlng: new kakao.maps.LatLng(33.450879, 126.569940)
        },
        {
            title: '근린공원',
            latlng: new kakao.maps.LatLng(33.451393, 126.570738)
        }
    ];

        // 마커 이미지의 이미지 주소입니다
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        
    for (var i = 0; i < positions.length; i ++) {
        
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35); 
        
        // 마커 이미지를 생성합니다    
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
          // 커스텀 오버레이를 생성합니다
    var customOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: content   
    });
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커를 표시할 위치
            title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image : markerImage // 마커 이미지 
        });
    }

    // HTML 문자열 또는 Dom Element 입니다 
    var content = '<div class ="label"><span class="left"></span><span class="center">첫번째 인식!</span><span class="right"></span></div>';

    // 커스텀 오버레이가 표시될 위치입니다 
    var position = new kakao.maps.LatLng(37.365264512305174, 127.10676860117488);  

  
    marker.setMap(map);
    }, [])


    return (
        <div>
        	<div id="map" style={{width:"500px", height:"400px"}}></div> 
        </div>
    )
}

export default Map;