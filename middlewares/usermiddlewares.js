import { UserLoginScheme, UserScheme } from "../validator/userValidator.js";
import { users } from "../services/userService.js";

//save user validation
export const savingValidation = (req, res, next) => {
  
  const tempUser = req.body;

  const { error } = UserScheme.validate(tempUser, { abortEarly: false });
  console.log(error);

  if (error) {
    return res.status(400).json({
      errors: error.details.map((error) => {
        return error.message;
      }),
    });
  }
  next();
};

//ID poram validation

export const userIdValidation = (req, res, next, value) => {
  const id = value * 1;
  if (id > users.length || isNaN(id)) {
    return res
      .status(400)
      .json({ message: `Invalid id - ${id} /should be a number` });
  }
  req.params.id = id;
  next();
};

//user login middleware

export const userloginMiddleware = (req, res, next) => {
  const tempUser = req.body;
  const { error } = UserLoginScheme.validate(tempUser, { abortEarly: false });
  console.log(error);

  if (error) {
    return res.status(400).json({
      errors: error.details.map((error) => {
        return error.message;
      }),
    });
  }
  next();
};
