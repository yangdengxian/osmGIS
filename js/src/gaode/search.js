AMap.plugin(["AMap.Autocomplete", "AMap.PlaceSearch"], function() {
    //输入提示
    var autoOptions = {
        input: "tipinput"
    };
    var auto = new AMap.Autocomplete(autoOptions);
    var placeSearch = new AMap.PlaceSearch({
        map: map
    }); //构造地点查询类
    AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
    function select(e) {
        // placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                var resObj = result.poiList.pois[0];
                map.setCenter([resObj["location"]["lng"], resObj["location"]["lat"]]);
            }
        }); //关键字查询查询
    }
});