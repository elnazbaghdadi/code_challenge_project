import axios from 'axios'
///////////////////////////////

function parseUrl(path, values) {
  const url =
    path +
    Object.entries(values)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${key}=${value}&`)
      .reduce((a, b) => a + b, '?')
      .slice(0, -1)
  return url
}

function parseUrlParams(config) {
  const { url = '', urlParams = {} } = config

  return {
    ...config,
    url: parseUrl(url, urlParams)
  }
}

function objectToQueryString(object) {
  const params = new URLSearchParams()

  Object.keys(object.params).forEach((key) => {
    if (object.params[key] != null && object.params[key] !== undefined)
      params.append(key, object.params[key])
  })

  return params.toString()
}
///////////////////////////////

const config = {
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  paramsSerializer(params) {
    // when we retry the axios request through interceptors,
    // the params is already stringified.
    return typeof params !== 'string' ? objectToQueryString(params) : params
  }
}

const axiosInstance = axios.create(config)

axiosInstance.interceptors.request.use(parseUrlParams)

axiosInstance.interceptors.response.use(
  (res) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return res.data
  },
  (err) => {
    //we can set to show snackbar with error type in these case senarios
    //Any status codes that falls outside the range of 2xx cause this function to trigger
    throw Error(err)
  }
)

const methods = {
  get: (url, params, config) => axiosInstance.get(url, { ...config, urlParams: params }),
  delete: (url, params, config) => axiosInstance.delete(url, { ...config, urlParams: params })
}

const customizedAxiosInstance = { ...axiosInstance, ...methods }

export * as axios from 'axios'
export default customizedAxiosInstance
