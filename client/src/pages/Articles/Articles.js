import React, { Component } from "react";
import SaveBtn from "../../components/SaveBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    articles: [],
    start: "",
    end: "",
    topic: ""
  };

//saves the article information so that axios can send to the server side
saveArticle = id => {
    const save = this.state.articles.filter(article => article._id === id);
    if (save[0].headline.main && save[0].web_url) {
      API.saveArticle({
        title: save[0].headline.main,
        url: save[0].web_url,
        snippet: save[0].snippet,
        date: save[0].pub_date
      })
        .then(this.filterArticle(id))
        .catch(err => console.log(err));
    }
  };

  //deletes the article that is saved to the database from array of articles in state
  filterArticle = id => {
    const articles = this.state.articles.filter(article => article._id !== id);
    this.setState({ articles });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  //sets the user's search parameters to state so that the API call to NYT can be made
  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({ articles: [] })
    if (this.state.topic) {
      API.getArticles({
        topic: this.state.topic,
        start: this.state.start,
        end: this.state.end
      })
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data);
        }
        //console.log(res)
        this.setState({ articles: res.data.response.docs, error: "" });
        this.setState({ start: "", end: "", topic: "" })
      })
      .catch(err => this.setState({ error: err.message }));
    }
  };

  render() {
    return (
    
          <Container fluid>
            <Row>
              <Col size="md-11">
                <Link to="/saved" className="pageLink"><i className="fa fa-bookmark"></i> Saved Articles</Link>
              </Col>
            </Row>        
            <Row> 
             <Col size="md-3">
             <h2>Search for Articles</h2>
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic"
              />
              <Input
                value={this.state.start}
                onChange={this.handleInputChange}
                name="start"
                placeholder="Start Year (YYYY)"
              />
              <Input
                value={this.state.end}
                onChange={this.handleInputChange}
                name="end"
                placeholder="End Year (YYYY)"
              />
              <FormBtn
                disabled={!(this.state.topic && this.state.start && this.state.end)}
                onClick={this.handleFormSubmit}
              >
                Submit
              </FormBtn>
            </form>
          </Col>
          <Col size="md-1" />
          <Col size="md-6 sm-12">
              <h2>Results</h2>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.slice(0, 20).map(article => (
                  <ListItem key={article._id}>
                    <h5><strong>{article.headline.main}</strong>  <span className="date-span">{ (new Date(article.pub_date)).toLocaleDateString() }</span></h5>
                    <p>{article.snippet}</p>
                    <a href={article.web_url}><p>{article.web_url}</p></a>
                    <SaveBtn onClick={() => this.saveArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
