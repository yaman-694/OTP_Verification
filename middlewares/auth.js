import exp from "constants";
import jwt from "jsonwebtoken";

import config from "../config/config.js";

console.log(config.jwt.TOKEN_HEADER_KEY);

const parseCookies = async(request)=> {
  const list = {};
  const cookieHeader = request.headers?.cookie;
  if (!cookieHeader) return list;

  cookieHeader.split(`;`).forEach(function(cookie) {
      let [ name, ...rest] = cookie.split(`=`);
      name = name?.trim();
      if (!name) return;
      const value = rest.join(`=`).trim();
      if (!value) return;
      list[name] = decodeURIComponent(value);
  });

  return list;
}

const verifyToken = async (req, res, next) => {
  const token = await parseCookies(req);

  console.log(token)
  if (!token) {
    return res.status(302).redirect('/login');
  }
  try {
    jwt.verify(token.token, config.jwt.TOKEN_HEADER_KEY,(err, decodedToken)=>{
      if(err){
        return res.status(404).send({error:"Unauthorized"})
      }else{
        // req.user = decodedToken;
        console.log("decoded",decodedToken.id._id);
        req.uid = decodedToken.id._id;
        next();
      }
    });
    
  } catch (err) {
    return res.status(302).redirect("/login");
  }
};

export default verifyToken;