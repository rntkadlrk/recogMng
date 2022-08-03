/*global kakao*/ 
import React, { useEffect } from 'react'
import axios from 'axios';

const Map=()=>{

  useEffect(()=>{

    //axios.get('/api/')

    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    // 주소-좌표 변환 객체를 생성합니다

    var map = new kakao.maps.Map(container, options);
    var geocoder = new kakao.maps.services.Geocoder();

    

    var listData = [
        {
            addr: '제주특별자치도 제주시 첨단로 242', 
            name: '홍길동',
        },
        {
            addr: '제주특별자치도 제주시 첨단로 241', 
            name: '홍길동',
        },
        {
            addr: '서울특별시 송파구 오금로13길 8', 
            name: '홍길동',
        },
        {
            addr: '서울특별시 송파구 올림픽로 25', 
            name: '홍길동',
        },
        {
            addr: '서울특별시 광진구 동일로18길 80', 
            name: '홍길동',
        },
        {
            addr: '서울특별시 성북구 인촌로 73', 
            name: '홍길동',
        },
       
     
    ];

    listData.map(function(data, index) {
        geocoder.addressSearch(data.addr, function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
    
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });
                var infowindow = new kakao.maps.InfoWindow({
                    content: 
                    '<div style="width:150px;text-align:center;padding:6px 0;">' + data.name + ' ' + (index+1) + ' 번째</div>'
                    
                    ,
                    disableAutoPan: true
                });
                infowindow.open(map, marker);
            } 
        });
    });

    }, [])


    return (
        <div>
        	<div id="map" style={{ width: "80vw", height:"640px", margin: "0"}}></div> 
        </div>
    )
}

export default Map;