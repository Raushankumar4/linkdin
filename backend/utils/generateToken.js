import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  try {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return token;
  } catch (error) {
    console.log(`Error while generating Token ${error}`);
  }
};
