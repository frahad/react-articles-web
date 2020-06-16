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

/**
 * @param {Object} page
 * @returns {Object}
 */
export const fetchArticlesRequested = page => ({
  type: FETCH_ARTICLES_REQUESTED,
  payload: {
    page
  }
})

/**
 * @param {Object} json
 * @returns {Object}
 */
export const fetchArticlesSucceeded = json => {
  return {
    type: FETCH_ARTICLES_SUCCEEDED,
    payload: {
      articles: json.data,
      pages: {
        next: json.next_page_url
      }
    }
  }
}

/**
 * @param {Object} error
 * @returns {Object}
 */
export const fetchArticlesFailed = error => ({
  type: FETCH_ARTICLES_FAILED,
  payload: {
    error
  }
})

/**
 * @param {Object} data
 * @returns {Object}
 */
export const createArticleRequested = data => ({
  type: CREATE_ARTICLE_REQUESTED,
  payload: {
    data
  }
})

/**
 * @returns {Object}
 */
export const createArticleSucceeded = () => ({
  type: CREATE_ARTICLE_SUCCEEDED
})

/**
 * @param {Object} error
 * @returns {Object}
 */
export const createArticleFailed = error => ({
  type: CREATE_ARTICLE_FAILED,
  payload: {
    error
  }
})

/**
 * @param {Number} id
 * @returns {Object}
 */
export const fetchArticleRequested = id => ({
  type: FETCH_ARTICLE_REQUESTED,
  payload: {
    id
  }
})

/**
 * @param {Object} json
 * @returns {Object}
 */
export const fetchArticleSucceeded = json => ({
  type: FETCH_ARTICLE_SUCCEEDED,
  payload: {
    article: json
  }
})

/**
 * @param {Object} error
 * @returns {Object}
 */
export const fetchArticleFailed = error => ({
  type: FETCH_ARTICLE_FAILED,
  payload: {
    error
  }
})
