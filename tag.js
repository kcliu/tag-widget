function fetchJSON(url, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) {
                    callback(data);
                }
            }
        }
    }
    httpRequest.open("GET", url, true);
    httpRequest.send("");
}

fetchJSON('https://raw.githubusercontent.com/kcliu/tag-widget/master/tz.json', function(data){
    console.log(data);
});
