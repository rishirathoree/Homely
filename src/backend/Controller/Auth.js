import Users from "../Model/CreateNewUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const AuthenticateNewUser = async (req, res) => {
  const { UserName, FullName, Email, Password } = req.body;

  try {
    const findExistingUserName = await Users.find({ UserName });
    if (findExistingUserName.length > 0) {
      return res
        .status(200)
        .json({ UsernameExist: "UserName Exists Already", success: 0 });
    }

    const findExistingEmail = await Users.find({ Email });
    if (findExistingEmail.length > 0) {
      return res
        .status(200)
        .json({ EmailExist: "Email Exists Already", success: 0 });
    }

    const saltRound = 10;

    const PasswordBcrypting = await bcrypt.hash(Password, saltRound);
    const user = new Users({
      FullName,
      UserName,
      Email,
      Password: PasswordBcrypting,
    });

    await user.save();

    return res.status(200).json({ msg: "Successfully registered", success: 1 });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(200)
        .json({ msg: "Validation error", errors: error.errors, success: 0 });
    } else {
      return res.status(500).json({ msg: "Internal server error", success: 0 });
    }
  }
};

export const CheckAuthTokenMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ tokenError: "Token Required", success: 0 });
  }
  try {
    const tokenWithoutBearer = token.split("Bearer ")[1];

    const decodedJwtToken = jwt.verify(
      tokenWithoutBearer,
      process.env.JWT_PRIVATE_KEY
    );

    if (!decodedJwtToken) {
      return res
        .status(200)
        .json({ tokenErr: "token not verified", success: 0 });
    }

    req.user = decodedJwtToken.Email;

    next();
  } catch (error) {
    return res.status(500).json({ success: 0, msg: "Internet error" });
  }
};

export const LoginAuthencticatedSubscriber = async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email && !Password) {
    return res.status(200).json({
      EmailRequired: "Email are required",
      PasswordRequired: "Password are  required",
      success: 0,
    });
  } else {
    if (!Email) {
      return res
        .status(200)
        .json({ EmailRequired: "Email are required", success: 0 });
    }
    if (!Password) {
      return res
        .status(200)
        .json({ PasswordRequired: "Password are required", success: 0 });
    }
  }

  try {
    const GettingUserInsideDatabase = await Users.findOne({ Email });

    if (!GettingUserInsideDatabase) {
      return res.status(200).json({ ExistEmail: "User Not Found", success: 0 });
    }

    const EncryptingPassword = await bcrypt.compare(
      Password,
      GettingUserInsideDatabase.Password
    )

    if (EncryptingPassword) {
      const createToken = jwt.sign({ Email }, process.env.JWT_PRIVATE_KEY);
      return res
        .status(200)
        .json({ msg: "successful login", success: 1,User:GettingUserInsideDatabase , token: createToken });
    } else {
      return res
        .status(200)
        .json({ PasswordIncorrect: "Password Not Valid", success: 0 });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(200)
        .json({ msg: "Validation error", errors: error.errors, success: 0 });
    } else {
      return res.status(500).json({ msg: "Internal server error", success: 0 });
    }
  }
};

export const checkRoles = (roles) => {

  return async(req, res, next) => {
    
    const user = await Users.findOne({Email:req.user})

    const userRoles = user.role;

    const hasRequiredRole = roles.some((role) => userRoles.includes(role));

    if (hasRequiredRole) {
      next();
    } else {
      return res.status(200).json({ RoleRestricted : "Cannot Access the api because role wasn't matched" , success: 0 });
    }
  };
};
