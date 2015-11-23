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

function searchCity(input) {
    console.log("search city:" + input.value);

}

function createTag(tag) {
    console.log("create tag:" + tag.innerHTML);

}

var input = document.getElementById("js-input-area");
input.addEventListener("blur", function(event) {
    var tagbox = document.getElementById("js-tagbox");
    // http://caniuse.com/#feat=classlist
    tagbox.classList.add("hide");
});

input.addEventListener("focus", function(event) {
    var tagbox = document.getElementById("js-tagbox");
    tagbox.classList.remove("hide");
});

fetchJSON('https://raw.githubusercontent.com/kcliu/tag-widget/master/tz.json', function(data){
    console.log(data);
});
