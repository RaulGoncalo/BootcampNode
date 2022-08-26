import basicAuth from "express-basic-auth";
import clientServices from "../services/clientServices.js";

function getRole(username) {
  if (username === "admin") {
    return "admin";
  }

  return "client";
}

function authorize(...allowed) {
  const isAllowed = (role) => allowed.indexOf(role) > -1;

  return (req, res, next) => {
    if (req.auth.user) {
      const role = getRole(req.auth.user);

      if (isAllowed(role)) {
        next();
      } else {
        res.status(403).send("User is not allowed");
      }
    } else {
      res.status(403).send("User not found");
    }
  };
}

async function authorizer(username, password, cb) {
  if (
    basicAuth.safeCompare(username, "admin") &&
    basicAuth.safeCompare(password, "desafio-igti-nodejs")
  ) {
    return cb(null, true);
  }

  try {
    return cb(null, await clientServices.checksLogin(username, password));
  } catch (error) {
    return cb(null, false);
  }
}

export { getRole, authorize, authorizer };
