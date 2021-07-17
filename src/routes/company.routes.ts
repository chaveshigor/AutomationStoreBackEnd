import { Router } from "express";

const companyRoutes = Router()

companyRoutes.get("/", (req, res) => {
    return res.json({hello: "world"})
})

export { companyRoutes }
