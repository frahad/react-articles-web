import { combineReducers } from 'redux'
import {
  FETCH_ARTICLES_REQUESTED,
  FETCH_ARTICLES_FAILED,
  FETCH_ARTICLES_SUCCEEDED,
  CREATE_ARTICLE_REQUESTED,
  CREATE_ARTICLE_SUCCEEDED,
  CREATE_ARTICLE_FAILED,
  FETCH_ARTICLE_REQUESTED,
  FETCH_ARTICLE_SUCCEEDED,
  FETCH_ARTICLE_FAILED
} from '../constants'

const initialState = {
  isFetching: false,
  submitted: false,
  error: false,
  byId: {},
  allIds: [],
  pages: {
    next: null
  }
}

/**
 * Normalize the articles state shape.
 *
 * @see{@link https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape#designing-a-normalized-state}
 * @param {Object} state
 * @param {Object} action
 * @returns {Object}
 */
const articlesFetched = (state, action) => {
  const { articles, pages } = action.payload
  const nextById = articles.reduce((prevArticles, article) => ({
    ...prevArticles,
    [article.id]: article
  }), {})
  const byId = {
    ...state.byId,
    ...nextById
  }
  const allIds = [
    ...state.allIds,
    ...articles
      .filter(article => !state.allIds.includes(article.id))
      .map(article => article.id)
  ]

  return {
    byId,
    allIds,
    pages
  }
}

/**
 * @param {Object} state
 * @param {Object} action
 * @returns {Object}
 */
const articleFetched = (state, action) => {
  const { article } = action.payload
  const byId = {
    ...state.byId,
    [article.id]: article
  }
  const allIds = state.allIds.includes(article.id)
    ? state.allIds
    : [...state.allIds, article.id]

  return {
    byId,
    allIds
  }
}

/**
 * The articles reducer.
 *
 * @param {Object} state
 * @param {Object} action
 * @returns {Object}
 */
const articles = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_SUCCEEDED:
      return {
        ...state,
        ...articlesFetched(state, action),
        isFetching: false,
        error: false
      }
    case CREATE_ARTICLE_SUCCEEDED:
      return {
        ...state,
        isFetching: false,
        submitted: true,
        error: false
      }
    case CREATE_ARTICLE_FAILED:
      return {
        ...state,
        isFetching: false,
        submitted: true,
        error: action.payload.error
      }
    case FETCH_ARTICLES_REQUESTED:
    case CREATE_ARTICLE_REQUESTED:
    case FETCH_ARTICLE_REQUESTED:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_ARTICLE_SUCCEEDED:
      return {
        ...state,
        ...articleFetched(state, action),
        isFetching: false,
        error: false,
      }
    case FETCH_ARTICLES_FAILED:
    case FETCH_ARTICLE_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}

export default combineReducers({
  articles,
})
