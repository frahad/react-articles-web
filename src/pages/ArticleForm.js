import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createArticleRequested } from '../actions'
import styled from 'styled-components'
// Components
import { Input, Button } from '../components'

const ArticleForm = () => {
  const dispatch = useDispatch()
  // The initial state of the form.
  const dataInitialState = {
    title: '',
    author: '',
    thumbnail: '',
    content: ''
  }
  const [data, setData] = useState(dataInitialState)
  const { isFetching, submitted, error } = useSelector(state => state.articles)
  // Determines if the article was
  // published successfully.
  const succeeded = !isFetching && (submitted && !error)

  useEffect(() => {
    if (succeeded) {
      setData(dataInitialState)
    }
  }, [succeeded])

  const handleChange = event => {
    const { name, value } = event.target

    setData({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    dispatch(createArticleRequested(data))
  }

  return (
    <Container>
      <Card>
        <CardTitle>
          New article
        </CardTitle>

        {succeeded && (
          <ValidationMessage>
            Thanks for your contribution!
          </ValidationMessage>
        )}

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Input.Label>Title</Input.Label>
            <Input
              type="text"
              name="title"
              onChange={handleChange}
              value={data.title}
              required
            />

            {error?.title && (
              <ValidationMessage error>
                {error.title[0]}
              </ValidationMessage>
            )}
          </FormGroup>

          <Row>
            <FormGroup>
              <Input.Label>Author</Input.Label>
              <Input
                type="text"
                name="author"
                onChange={handleChange}
                value={data.author}
                required
              />

              {error?.author && (
                <ValidationMessage error>
                  {error.author[0]}
                </ValidationMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Input.Label>Thumbnail</Input.Label>
              <Input
                type="url"
                name="thumbnail"
                placeholder="https://example.com/image.png"
                onChange={handleChange}
                value={data.thumbnail}
                required
              />

              {error?.thumbnail && (
                <ValidationMessage error>
                  {error.thumbnail[0]}
                </ValidationMessage>
              )}
            </FormGroup>
          </Row>

          <FormGroup>
            <Input.Label>Content</Input.Label>
            <Input.Multiline
              name="content"
              rows={7}
              onChange={handleChange}
              value={data.content}
              required
            />

            {error?.content && (
              <ValidationMessage error>
                {error.content[0]}
              </ValidationMessage>
            )}
          </FormGroup>

          <Button type="submit">
            {isFetching ? 'Submitting...' : 'Publish'}
          </Button>
        </form>
      </Card>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;

  @media (min-width: 767px) {
    margin-bottom: 0;
    align-items: center;
    height: 90vh;
  }
`

const Card = styled.div`
  flex: 1;
  margin-top: 6rem;
  margin-right: 15px;
  margin-left: 15px;
  padding: 20px;
  max-width: 850px;
  width: 100%;
  background-color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, .12);
`

const CardTitle = styled.h2`
  font-weight: normal;
  margin-bottom: 2rem;
`

const FormGroup = styled.div`
  margin-bottom: 1rem;
`

const Row = styled.div`
  @media (min-width: 767px) {
    display: flex;

    div {
      flex: 1;

      &:not(:first-child) {
        margin-left: 20px;
      }
    }
  }
`;

const ValidationMessage = styled.span`
  display: block;
  margin-top: .35rem;
  margin-bottom: ${props => props.error ? 0 : '1rem'};
  color: ${props => props.error ? '#dc3545' : '#28a745'};
`

export default ArticleForm
