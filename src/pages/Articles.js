import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchArticlesRequested } from '../actions'
import styled from 'styled-components'
// Components
import { Grid, Row, Cell } from '@material/react-layout-grid'
import { Link } from 'react-router-dom'
import { Skeleton, Feedback, Error, Button } from '../components'

const Articles = () => {
  const dispatch = useDispatch()
  const {
    isFetching,
    byId,
    allIds,
    error,
    pages: { next: nextPage }
  } = useSelector(state => state.articles)
  const [articles, setArticles] = useState([])

  const fetchArticles = page => {
    const action = fetchArticlesRequested(page)

    dispatch(action)
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  useEffect(() => {
    if (allIds.length) {
      setArticles(allIds.map(id => byId[id]))
    }
  }, [byId, allIds])

  if (error) {
    return (
      <Error />
    )
  }

  if (!articles.length && !isFetching) {
    return (
      <Feedback title="No articles where found." />
    )
  }

  const renderArticle = (article, index) => {
    const columns = (index + 1) % 3 === 0 ? 12 : 6

    return (
      <Article
        key={article.id}
        desktopColumns={columns}
        tabletColumns={columns}>
        <Link to={`/articles/${article.id}`}>
          <ArticleThumbnail source={article.thumbnail} />
          <ArticleTitle>{article.title}</ArticleTitle>
          <ArticleAuthor>by {article.author}</ArticleAuthor>
        </Link>
      </Article>
    )
  }

  return (
    <Container>
      <Row>
        {!articles.length && isFetching
          ? <Skeleton.Articles />
          : articles.map(renderArticle)}
      </Row>

      {nextPage && (
        <Row>
          <Pagination>
            <Button onClick={() => fetchArticles(nextPage)}>
              {isFetching ? 'Loading...' : 'Load more'}
            </Button>
          </Pagination>
        </Row>
      )}
    </Container>
  )
}

const Container = styled(Grid)`
  margin-top: 6rem;
  margin-left: 2.5rem;
  margin-right: 2.5rem;
  margin-bottom: 2.5rem;
`

const Article = styled(Cell)`
  margin-bottom: 2rem;
`

const ArticleThumbnail = styled.div`
  width: 100%;
  height: 400px;
  background-image: url(${props => props.source});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin-bottom: 18px;

  @media (max-width: 767px) {
    height: 150px;
  }
`;

const ArticleTitle = styled.h3`
  font-size: 22px;
  font-weight: normal;
  margin-bottom: 0.35rem;
  color: black;
`

const ArticleAuthor = styled.span`
  font-size: 18px;
  color: #5D6572;
`

const Pagination = styled(Cell).attrs({
  columns: 12
})`
  text-align: center;
  margin-top: 2rem;
`

export default Articles
