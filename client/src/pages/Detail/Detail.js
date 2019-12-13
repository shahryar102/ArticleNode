import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { List, ListItem } from "../../components/List";

class Detail extends Component {
  state = {
    articles: []
  };

  componentDidMount() {
    this.loadArticles();
  }

  //calls to the database so that saved articles can be loaded and displayed on the page
  loadArticles = () => {
    API.getSaved()
      .then(res =>
        this.setState({ articles: res.data })
      )
      .catch(err => console.log(err));
  };

  //deletes the article from the database
  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-11">
            <Link to="/" className="pageLink"><i className="fa fa-search"></i> Search for Articles</Link>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px"}}>
          <Col size="md-1" />
          <Col size="md-10">
            <h2>Saved Articles</h2>
              {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <h5>{article.title}   <span style={{fontSize: "16px", marginLeft: "30px"}}><strong>{ (new Date(article.date)).toLocaleDateString() }</strong></span></h5>
                    <p>{article.snippet}</p>
                    <a href={article.url}>
                      <strong>
                        {article.url}
                      </strong>
                    </a>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          <Col size="md-1" />
        </Row>
      </Container>
    );
  }
}

export default Detail;
