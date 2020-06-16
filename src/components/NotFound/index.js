import React from 'react'
import Feedback from '../Feedback';

const NotFound = () => (
  <Feedback
    title="Page not found"
    message="We are sorry, the page you requested cannot be found."
    statusCode={404}/>
)

export default NotFound
