import React from 'react'
import Feedback from '../Feedback'

const Error = () => (
  <Feedback
    title="Well, this is unexpected..."
    message="An error has occurred and we're working to fix the problem!"
    statusCode={500}/>
)

export default Error
