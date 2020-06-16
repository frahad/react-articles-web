import {
  all,
  call,
  put,
  takeEvery,
  takeLatest
} from 'redux-saga/effects'
import {
  FETCH_ARTICLES_REQUESTED,
  FETCH_ARTICLE_REQUESTED,
  CREATE_ARTICLE_REQUESTED
} from '../constants'
import {
  fetchArticlesSucceeded,
  fetchArticlesFailed,
  fetchArticleSucceeded,
  fetchArticleFailed,
  createArticleFailed,
  createArticleSucceeded
} from '../actions'
import Api from '../services/api'

/**
 * Fetch the articles.
 *
 * @param {Object} action
 * @param {Object} action.payload
 */
function* fetchArticles(action) {
  const { page } = action.payload

  try {
    const indexArticle = Api('articles').index
    const response = yield call(indexArticle, page)
    const json = yield call([response, response.json])

    // Dispatch the success action.
    yield put(fetchArticlesSucceeded(json))
  } catch (error) {
    // Dispatch the fail action.
    yield put(fetchArticlesFailed(error))
  }
}

/**
 * Create a new article.
 *
 * @param {Object} action
 * @param {Object} action.payload
 */
function* createArticle(action) {
  const { data } = action.payload

  try {
    const storeArticle = Api('articles').store
    const response = yield call(storeArticle, data)
    const json = yield call([response, response.json])

    if (response.status === 422) {
      throw (json)
    }

    // Dispatch the success action.
    yield put(createArticleSucceeded(json))
  } catch (error) {
    // Dispatch the fail action.
    yield put(createArticleFailed(error))
  }
}

/**
 * Fetch the specified article.
 *
 * @param {Object} action
 * @param {Object} action.payload
 */
function* fetchArticle(action) {
  const { id } = action.payload

  try {
    const showArticle = Api('articles').show
    const response = yield call(showArticle, id)
    const json = yield call([response, response.json])

    // Dispatch the success action.
    yield put(fetchArticleSucceeded(json))
  } catch (error) {
    // Dispatch the fail action.
    yield put(fetchArticleFailed(error))
  }
}

/**
 * Spawn a new fetchArticles task on
 * each FETCH_ARTICLES_REQUESTED.
 */
function* watchFetchArticles() {
  yield takeEvery(FETCH_ARTICLES_REQUESTED, fetchArticles)
}

/**
 * Spawn a new createArticle task on
 * CREATE_ARTICLE_REQUESTED.
 */
function* watchCreateArticle() {
  yield takeLatest(CREATE_ARTICLE_REQUESTED, createArticle)
}

/**
 * Spawn a new fetchArticle task on
 * each FETCH_ARTICLE_REQUESTED.
 */
function* watchFetchArticle() {
  yield takeEvery(FETCH_ARTICLE_REQUESTED, fetchArticle)
}

export default function* rootSaga() {
  yield all([
    watchFetchArticles(),
    watchCreateArticle(),
    watchFetchArticle()
  ])
}
