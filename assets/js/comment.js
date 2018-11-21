! function () {
    var btn = document.getElementById('commentBtn');

    btn.addEventListener("click",addComment);

    function addComment(){
        let commentBody = document.getElementById('commentBody');
        let item = document.createElement("div");
        item.className = "commentItem";
        item.appendChild(getName());
        item.appendChild(getTime());
        item.appendChild(getText());
        commentBody.appendChild(createHr());
        commentBody.appendChild(item);
    }

    function getName(){
        let name = document.getElementById('commentName').value;
        let span = document.createElement("span");
        span.innerHTML = name + ": ";

        return span;
    }

    function getTime(){
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMinutes();
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let span = document.createElement("span");
        span.innerHTML = "发表于" + year + "年" + month + "月" + day + "日" + hour + ":" + minute;

        return span;
    }

    function getText(){
        let text1 = document.getElementById('commentText').value;
        console.log(text1);
        let div = document.createElement('div');
        div.className = "commentItemBody";
        div.innerHTML = text1;

        return div;
    }

    function createHr(){
        let hr = document.createElement("hr");
        hr.style.margin = "20px 0px";
        return hr;
    }
}();