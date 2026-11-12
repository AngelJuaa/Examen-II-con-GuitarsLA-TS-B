import { Router } from "express";
import { createProduct } from "./handlers/product";
import { createGuitar, createGuitarValidation, getGuitars } from "./handlers/guitar";

const router = Router();

router.get("/products", (req, res) => {
    res.send("Desde GET productos");
});

router.post("/products", createProduct);





// Guitarras (examen): solo Crear y Leer
router.get("/guitars", getGuitars);
router.post("/guitars", createGuitarValidation, createGuitar);

export default router;
