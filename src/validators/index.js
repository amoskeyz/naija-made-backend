import { validateJoi, errorstatus } from '../utils';

const validate = schema => (req, res, next) => {
  const validateObject = {
    ...req.body,
    ...req.files
  };

  const error = validateJoi(validateObject, schema);
  if (error) {
    // (errorstatus(res, 400, error))
    // return res.status(400).json({
    //   error
    // });
    return errorstatus(res, 400, error);
  }

  return next();
};

export default validate;
