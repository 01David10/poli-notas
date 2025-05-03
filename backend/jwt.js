import jwt from "jsonwebtoken";
// import dotenv from 'dotenv';

const token_secret = process.env.TOKEN_SECRET

const authRequired = (req, res, next) => {
    console.log("Cookies recibidas:", req.cookies);
    const token = req.cookies.token;

    if (!token) {
        console.log("No se encontró el token en las cookies");
        return res.status(401).json({ message: "No Token, autorización denegada" });
    }

    jwt.verify(token, token_secret, (err, user) => {
        if (err) {
            console.log("Error al verificar el token:", err);
            return res.status(403).json({ message: "Token inválido" });
        }

        console.log("Token verificado, usuario:", user);
        req.user = user;
        next();
    });
};

export default authRequired;