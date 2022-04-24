$(document).ready(onReady());

async function onReady() {
    //get a names of all files in the articles directory using jquery get
    var files = await $.get("/articles.info");
    files = files.split(",").slice(0, -1);  
    //iterate through the files and create a list of links to each article
    var list = "";
    for(var i = 0; i < files.length; i++)
    {
        list += "<div class=\"article\"><a class=\"fml\" href=\"/articles.html?id=" + files[i] + "\">" + files[i].substring(0, files[i].length - 5).replaceAll('^', ' ') + "</a></li></div>";
    }
    //append the list to the html
    $("#articles").append(list);
    console.log(files);
    var picks;
    await $.getJSON("favorites.json", function(data) {
        picks = data;
    });
    var pickslist = "";
    for(var i = 0; i < picks.articles.length; i++)
    {
        //<div class="todaypick"><a class="fml" href="/articles.html?id=3 Month Old Held At Gunpoint.json">3 Month Old Held At Gunpoint</a></div>
        pickslist += "<div class=\"todaypick\"><a class=\"fml\" href=\"/articles.html?id=" + picks.articles[i] + ".json\">" + picks.articles[i] + "</a></li></div>";
    }
    $("#picks").append(pickslist);
}