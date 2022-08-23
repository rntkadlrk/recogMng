/*global kakao*/ 
/* eslint-disable */

import React, { useEffect } from 'react'
import axios from 'axios';

const Map=(props)=>{

  useEffect(()=>{

    //axios.get('/api/')

    var container = document.getElementById('map');
    
    var options;//
    // 주소-좌표 변환 객체를 생성합니다
    var map;
    var geocoder = new kakao.maps.services.Geocoder();
    //console.log("여기"+JSON.stringify(props.searchData));

    var searchData = props.searchData;

    //지도에 1번으로 표시되는 위치 포커싱 하기 위해
    if(searchData){
        geocoder.addressSearch(searchData[0].addr, function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                options = {
                    center: new kakao.maps.LatLng(result[0].y, result[0].x),
                    level: 3
            };
                map = new kakao.maps.Map(container, options)
            }}
        );
    }
    //지도에 반복하여 찍음.
    searchData.map(function(data, index) {
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
        	<div id="map" style={{ width: "90vw", height:"640px", margin: "0"}}></div> 
        </div>
    )
}

export default Map;