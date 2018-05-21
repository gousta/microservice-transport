
exports.success = (data) => {
  return {
    status: 'ok',
    data: data
  }
}

exports.error = (errorObject) => {
  return {
    status: 'error',
    error: errorObject,
    data: null
  }
}