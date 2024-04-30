export const login = (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    res.json({ message: "Login Success" });
  } else {
    res.status(401).json({ message: "Login Failed" });
  }
};

