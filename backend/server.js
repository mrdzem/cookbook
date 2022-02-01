import express from "express"
import cors from "cors"
import userRoutes from "./api/user.route.js"
import authRoutes from "./api/auth.route.js"
import recipeSubmitRoutes from "./api/recipeSubmit.route.js"
import connection from "./db.js"
import recipes from "./api/recipeRoute.js"


connection()
const app = express()

app.use(cors())
app.use(express.json({limit: '50mb'}))

app.use("/api/v1/recipes", recipes)
app.use("/api/v1/recipeSubmit", recipeSubmitRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/auth", authRoutes)
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

export default app