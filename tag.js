var tag = function(exports) {
    var inputDiv;
    var tagListDiv;

    var init = function() {
        var source = exports.source || "https://raw.githubusercontent.com/kcliu/tag-widget/master/tz.json";
        var inputId = exports.inputId || "js-input-area";
        var tagListId = exports.tagListId || "js-taglist";

        inputDiv = document.getElementById(inputId);
        tagListDiv = document.getElementById(tagListId);

        fetchJSON(source, function(data) {
            createTagList(data.cities);
        });

        inputDiv.addEventListener("focus", function(event) {
            tagListDiv.classList.remove("hide");
        });

        inputDiv.addEventListener("blur", function(event) {
            window.setTimeout(function() {
                // http://caniuse.com/#feat=classlist
                tagListDiv.classList.add("hide");
            }, 10);
        });
    }

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

    var createTag = function(e) {
        console.log("create tag:" + e.target.innerHTML);
        inputDiv.value = e.target.innerHTML;
    }

    var createTagList = function(list) {
        //https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment
        var docfrag = document.createDocumentFragment();

        for (var index in list) {
            var tagDiv = document.createElement("div");
            tagDiv.innerHTML = list[index];
            tagDiv.classList.add("taglist-item");
            tagDiv.addEventListener('click', createTag, false);
            docfrag.appendChild(tagDiv);
        }

        tagListDiv.appendChild(docfrag);
    }

    var matchCity = function(subString, dataList) {
        console.log("matchCity:" + subString);

    }

    return {
        init: init,
        fetchJSON: fetchJSON,
        searchCityHandler: searchCityHandler,
        matchCity: matchCity
    }

};

var tagInstance = tag(
    {
        inputId: "js-input-area"
    }
);

tagInstance.init();
