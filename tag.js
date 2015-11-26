var tag = function(exports) {
    var inputDiv;
    var tagListDiv;
    var tagsContainerDiv;
    var cityList;

    var init = function() {
        var source = exports.source || "https://raw.githubusercontent.com/kcliu/tag-widget/master/tz.json";
        var inputId = exports.inputId || "js-input-area";
        var tagListId = exports.tagListId || "js-taglist";
        inputDiv = document.getElementById(inputId);
        tagListDiv = document.getElementById(tagListId);
        tagsContainerDiv = document.getElementById('js-tags-container');
        fakeTextArea = document.getElementById("js-search-wrapper");

        fetchJSON(source, function(data) {
            cityList = data.cities;
            createTagList(cityList);
        });

        fakeTextArea.addEventListener("blur", function(event) {
            window.setTimeout(function() {
                // http://caniuse.com/#feat=classlist
                tagListDiv.classList.add("hide");
            }, 10);
        });

        fakeTextArea.addEventListener("click", function(event) {
            tagListDiv.classList.remove("hide");
            createTagList(cityList);
            inputDiv.focus();
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

    var searchCityHandler = function(input) {
        var subList = findMatch(input.value, cityList);
        createTagList(subList);
    }

    var removeTag = function(e) {
        var tagDiv = e.target.parentElement
        tagDiv.parentElement.removeChild(tagDiv);
    }

    var createTag = function(e) {
        inputDiv.value = "";
        createTagDiv(e.target.innerHTML);
    }

    var createTagDiv = function(tagName) {
        var tagDiv;
        var tagContent;
        var removeBtn;
        tagDiv = document.createElement("div");
        removeBtn = document.createElement("span");

        tagDiv.innerHTML = "<span id=\"js-tag-content\">" + tagName + "</span>";
        tagDiv.classList.add("tag");

        removeBtn.innerHTML = " x ";
        removeBtn.classList.add("tag-remove");
        removeBtn.addEventListener('click', removeTag, false);
        tagDiv.appendChild(removeBtn);
        tagsContainerDiv.appendChild(tagDiv);

    }

    var createTagList = function(list) {
        //https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment
        var docfrag = document.createDocumentFragment();
        tagListDiv.innerHTML = "";
        for (var index in list) {
            var tagDiv = document.createElement("div");
            tagDiv.innerHTML = list[index];
            tagDiv.classList.add("taglist-item");
            tagDiv.addEventListener('click', createTag, false);
            docfrag.appendChild(tagDiv);
        }

        tagListDiv.appendChild(docfrag);
    }

    var findMatch = function(subString, dataList) {
        var subList = [];
        var regex = new RegExp("^" + subString, "i");

        for (var index in dataList) {
            if (regex.test(dataList[index])) {
                subList.push(dataList[index]);
            }
        }
        return subList;
    }

    return {
        init: init,
        searchCityHandler: searchCityHandler
    }

};

var tagInstance = tag(
    {
        inputId: "js-input-area"
    }
);

tagInstance.init();
