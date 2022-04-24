$(document).ready(onReady());

async function onReady() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    //string id that is the id parameter in the url\
    var id = urlParams.get('id');
    console.log(id);
    var article;
    await $.getJSON("/articles/" + id, function(data) {
        console.log(data);
        article = data;
    });
    document.getElementById("title").innerHTML = article.name;
    document.getElementById("content").innerHTML = article.contents;
    document.getElementById("date").innerHTML = article.date;
}