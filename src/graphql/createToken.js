//import regeneratorRuntime from "regenerator-runtime";
import jwt from 'jsonwebtoken';

const createToken = async (user) => {
  return await jwt.sign(
    { userId: user.id }, 
    process.env.SECRET, 
    { expiresIn: '1h' }
  );
};

export default createToken;