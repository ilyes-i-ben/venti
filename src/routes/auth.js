const express = require('express');
const jwt = require("jsonwebtoken");
const prisma = require('../prisma/client');
const router = express.Router();


const JWT_SECRET = process.env.JWT_SECRET;


router.post('/register', async (req, res) => {
    const { email, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: { email, password: hash, role: role || "USER" },
        });
        res.status(201).json({ id: user.id, email: user.email, role: user.role });
    } catch (err) {
        res.status(400).json({ message: "User already exists" });
    }
});

router.post("/login", async (req, res) => {
    const {email, password } = req.body;
    
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(401).json({ msg: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) await res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role}, 
        JWT_SECRET,
        {
            expiresIn: "1d"
        },
    );

    res.json({ token });
})

module.exports = router;