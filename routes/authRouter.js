import { Router } from "express";
import Session from "express-session";

const sess = {
  secret: process.env.SESS_SECRET,
  cookies: {},
};

const authRouter = Router();

authRouter(Session(sess));

authRouter.get("/login/:username", (req, res) => {
  //here I should validate credentials, and identify user
  req.session.user = { name: req.params.username };

  res.json({ message: "Logged in, now ytou can access secured areas" });
});

authRouter.get("/secured", (req, res) => {
  //do I have a session for the session id in the cooki that holds information regarding the user name
  if (!req.session.user?.name)
    return res.status(403).json({ error: "please log in, go to /login" });

  res.json({ message: `Hello ${req.session.user.name} welcome back` });
});

authRouter.get("/logout", (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return next(error);
  });

  res.json({ message: "session destroyed" });
});

export default authRouter;
