function catchErorr(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}

module.exports=catchErorr