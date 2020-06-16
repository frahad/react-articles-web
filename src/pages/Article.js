import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchArticleRequested } from '../actions'
import styled from 'styled-components'
// Components
import { Error, Feedback } from '../components'

const Article = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { isFetching, byId, error } = useSelector(state => state.articles)
  const [article, setArticle] = useState({})

  const fetchArticle = () => {
    const action = fetchArticleRequested(id)

    dispatch(action)
  }

  useEffect(() => {
    fetchArticle()
  }, [id])

  useEffect(() => {
    if (byId[id]) {
      setArticle(byId[id])
    }
  }, [byId[id]])

  if (error) {
    return (
      <Error />
    )
  }

  if (isFetching) {
    return (
      <Feedback title="Loading..." />
    )
  }

  /**
   * Add a dropped capital letter at the beginning
   * of the paragraph.
   *
   * @param {String} text
   */
  const withDropCap = text => {
    return text && (
      <>
        <DropCap>
          {text[0]}
        </DropCap>

        {text.substring(1)}
      </>
    );
  }

  return (
    <Container>
      <InvisibleCard>
        <ArticleHead>
          <div>
            <ArticleTitle>
              {article.title}
            </ArticleTitle>

            <ArticleAuthor>
              {article.author} • {new Date(article.created_at).toDateString()}
            </ArticleAuthor>
          </div>

          <ArticleThumbnail source={article.thumbnail} />
        </ArticleHead>

        <ArticleContent>
          {withDropCap(article.content)}
        </ArticleContent>
      </InvisibleCard>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;
  margin-bottom: 2.5rem;
`

const InvisibleCard = styled.div`
  flex: 1;
  padding: 15px;
  max-width: 1000px;
  width: 100%;
  border-radius: 3px;
`

const ArticleThumbnail = styled.div`
  width: 100%;
  max-width: 400px;
  height: 250px;
  background-image: url(${props => props.source});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

const ArticleHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 2.5rem;

  @media (max-width: 767px) {
    flex-direction: column;
    text-align: center;

    ${ArticleThumbnail} {
      order: -1;
      margin-bottom: 2rem;
    }
  }
`

const ArticleTitle = styled.h1`
  font-size: 42px;
  text-transform: uppercase;
  max-width: 500px;
  margin-bottom: .7rem;
`

const ArticleAuthor = styled.span`
  display: block;
  font-size: 18px;
  margin-bottom: 1.5rem;
`

const ArticleContent = styled.p`
  text-align: justify;
  font-size: 18px;
  line-height: 32px;
  white-space: pre-wrap;
`

const DropCap = styled.span`
  float: left;
  font-size: 58px;
  line-height: .83;
  padding-top: 10px;
  margin-right: 12px;
`;

export default Article
