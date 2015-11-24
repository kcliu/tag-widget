var tag = function(exports) {
    var input = document.getElementById(exports.inputId);//"js-input-area"
    var fetchJSON = function(url, callback) {
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

    var searchCityHandler= function(input) {
        console.log("search city:" + input.value);
        return matchCity(input.value);
    }

    var createTag = function(tag) {
        console.log("create tag:" + tag.innerHTML);

    }

    var matchCity = function(subString, dataList) {
        console.log("matchCity:" + subString);

    }

    input.addEventListener("focus", function(event) {
        var tagbox = document.getElementById("js-tagbox");
        tagbox.classList.remove("hide");
    });

    input.addEventListener("blur", function(event) {
        var tagbox = document.getElementById("js-tagbox");
        window.setTimeout(function() {
            // http://caniuse.com/#feat=classlist
            tagbox.classList.add("hide");
        }, 10);
    });

    return {
        fetchJSON: fetchJSON,
        searchCityHandler: searchCityHandler,
        createTag: createTag,
        matchCity: matchCity
    }

};
var tagInstance = tag(
    {
        inputId: "js-input-area"
    }
);
tagInstance.fetchJSON('https://raw.githubusercontent.com/kcliu/tag-widget/master/tz.json', function(data){
    console.log(data);
});
