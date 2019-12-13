import axios from "axios";

//axios handles routing server side
export default {
    getArticles: function(data) {
        const APIkey = "GA8uG8ha2marKobsvpUAkSerNlzE1Azd";
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?q=' + data.topic + "&begin_date=" + data.start + "0101&end_date=" + data.end + "0101&api-key=" + APIkey;
        return axios.get(url);
    },
    getSaved: function() {
        return axios.get("/api/articles");
    },
    saveArticle: function(articleData) {
        return axios.post("/api/articles", articleData);
    },
    deleteArticle: function(id) {
        return axios.delete("/api/articles/" + id);
    }
};
