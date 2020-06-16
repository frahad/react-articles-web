import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import styled from 'styled-components'
// Pages
import ArticleForm from '../../pages/ArticleForm'
import Article from '../../pages/Article'
import Articles from '../../pages/Articles'
// Components
import Button from '../Button'
import NotFound from '../NotFound'

const Layout = () => (
  <Router>
    <Header>
      <HeaderTitle to="/">
        articles
      </HeaderTitle>

      <Navbar>
        <Button as={Link} to="/articles/create">
          Get Started
        </Button>
      </Navbar>
    </Header>

    <Switch>
      <Route exact path="/" component={Articles} />
      <Route path="/articles/create" component={ArticleForm} />
      <Route path="/articles/:id" component={Article} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)

const Header = styled.header`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  min-height: 72px;
  padding: 0 20px;
  background-color: white;

  @media (min-width: 767px) {
    padding-left: 4rem;
    padding-right: 4rem;
  }
`

const HeaderTitle = styled(Link)`
  font-size: 28px;
  letter-spacing: 0.02rem;
  color: black;
`

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  margin: 0 0 0 auto;
  padding: 0;
  height: 64px;
`

export default Layout
