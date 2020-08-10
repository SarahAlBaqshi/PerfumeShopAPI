exports.signup = async (req, res, next) => {
  try {
    console.log("Hello");
  } catch (error) {
    next(error);
  }
};
