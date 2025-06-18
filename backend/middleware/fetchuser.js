var jwt = require('jsonwebtoken');
const JWT_SECRET = "mySuperSecretKey";

const fetchuser = (req, res, next) => {
    //Get the user from the jwt token and add id to req object
    //Protected APIs को call करते समय, token header में भेजा जाता है
    //Server header से token पढ़कर verify करता है
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).send({ error: "Please authenticate." });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next()
    } catch (err) {
        res.status(401).send({ error: "Please authenticate." });

    }

}

module.exports = fetchuser;