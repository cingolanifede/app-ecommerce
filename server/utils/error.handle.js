exports.errorDisplay = (status, err) => ({
  status,
  err,
});

exports.errorHandler = (errorData, res) => {
  console.log('Call error:%s', errorData);
  const { status, err } = errorData;

  const code = typeof status === 'undefined' ? 500 : status;
  const error = typeof err.message === 'undefined' ? err : err.message;

  return res.status(code).send({
    code,
    error,
  });
};
