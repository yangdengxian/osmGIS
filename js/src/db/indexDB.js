var indexedDBUtil = {
    myDB: {
        name: 'air_quaility',
        version: 1,
        db: null
    }
};

indexedDBUtil.openDB = function(dbObj) {
    var request = window.indexedDB.open(dbObj.name);
    request.onerror = function(e) {
        console.log('OPen Error!');
    };
    request.onsuccess = function(e) {
        var db = e.target.result;
        indexedDBUtil.addData(db, 'PM_tab', dataList);
        indexedDBUtil.queryData(db, 'PM_tab', "10");
    };

    request.onupgradeneeded = function(e) {
        dbObj.db = e.target.result;
        if (!dbObj.db.objectStoreNames.contains('PM_tab')) {
            var objectStore = dbObj.db.createObjectStore('PM_tab', { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex("province_name", "province_name", { unique: false });
            objectStore.createIndex("city_name", "city_name", { unique: false });
            objectStore.createIndex("country", "country", { unique: false });
            objectStore.createIndex("station", "station", { unique: false });
            objectStore.createIndex("address", "address", { unique: false });
            objectStore.createIndex("uptime", "uptime", { unique: false });
            objectStore.createIndex("AQI", "AQI", { unique: false });
            objectStore.createIndex("level", "level", { unique: false });
            objectStore.createIndex("PM25", "PM25", { unique: false });
            objectStore.createIndex("PM10", "PM10", { unique: false });
            objectStore.createIndex("latitude", "latitude", { unique: false });
            objectStore.createIndex("longtitude", "longtitude", { unique: false });
        }
    };
};

indexedDBUtil.addData = function(db, storeName, result) {
    result.forEach(function(objArray) {
        objArray.forEach(function(objRes) {
            var transaction = db.transaction(storeName, 'readwrite');
            var store = transaction.objectStore(storeName);
            store.add(objRes);
        });
    });

};

indexedDBUtil.queryData = function(db, storeName, value) {
    var transaction = db.transaction(storeName, 'readwrite');
    // var store = transaction.objectStore(storeName);
    // var request = store.get(value);
    // request.onsuccess = function(e) {
    //     var student = e.target.result;
    //     console.log(student.name);
    // };
};
indexedDBUtil.openDB(indexedDBUtil.myDB);