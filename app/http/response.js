
exports.success = (data) => {
  return {
    status: 'ok',
    data: data
  }
}

exports.error = (code, data) => {
  return {
    status: 'error',
    error_code: code,
    data: data
  }
}