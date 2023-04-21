function errorHandler(error, req, res, next) {
  console.log(`Error!\nError message: ${error.message}`);

  res.redirect('/NotFound');
}

export { errorHandler };