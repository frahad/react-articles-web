import React from 'react'
import styled from 'styled-components'
// Images
import ErrorImage from '../../assets/images/errors/error.png'
import NotFoundImage from '../../assets/images/errors/not_found.png'

const Feedback = ({ title, message, statusCode }) => {
  const illustrationsByStatusCode = {
    404: NotFoundImage,
    500: ErrorImage,
    // ...
  }

  return (
    <Container>
      {illustrationsByStatusCode[statusCode] && (
        <Illustration src={illustrationsByStatusCode[statusCode]} />
      )}

      <div>
        <Title>{title}</Title>

        {message && (
          <Message>{message}</Message>
        )}
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  background-color: white;
`

const Illustration = styled.img`
  width: 100%;
  max-width: 400px;
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-weight: normal;
  margin-bottom: 0.75rem;
`

const Message = styled.p`
  font-size: 18px;
`

export default Feedback
