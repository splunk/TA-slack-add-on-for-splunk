document.addEventListener("DOMNodeInserted", function (event) {
    if (event.target.className && event.target.className.startsWith("form-")) {
        h = event.target.querySelector('.help-block')
        if (h) {
            urlpat = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
            // h.innerHTML = h.innerHTML.replace(urlpat, "<a href='#' class='btn btn-primary' onclick=clickEvent(\'$1\')>here</a>");
            h.innerHTML = h.innerHTML.replace(urlpat, "<div><a href='#' onclick=clickEvent(\'$1\')><img alt=\"\"Add to Slack\"\" height='40' width='139' src='https://platform.slack-edge.com/img/add_to_slack.png' srcset='https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x' /></a></div>");
        }
    }
}, false);

function clickEvent(url) {
    console.log("Clicked URL : " + url);
    window.open(url, 'popup', 'width=700,height=700');
    return false;
}