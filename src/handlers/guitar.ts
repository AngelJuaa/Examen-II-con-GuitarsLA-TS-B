import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Guitar from '../models/Guitar.model';

// Nombre de archivo simple (guitarra_01) o URL http(s)
const IMAGE_REGEX = /^([\w.-]+|https?:\/\/\S+)$/;

// Reglas de validación (se ejecutan como middleware antes del handler)
export const createGuitarValidation = [
    body('brand')
        .isString().withMessage('La marca debe ser texto')
        .trim()
        .notEmpty().withMessage('La marca es obligatoria')
        .isLength({ max: 100 }).withMessage('La marca no puede exceder 100 caracteres'),

    body('name')
        .isString().withMessage('El modelo debe ser texto')
        .trim()
        .notEmpty().withMessage('El modelo es obligatorio')
        .isLength({ max: 100 }).withMessage('El modelo no puede exceder 100 caracteres'),

    body('description')
        .isString().withMessage('La descripción debe ser texto')
        .trim()
        .notEmpty().withMessage('La descripción es obligatoria')
        .isLength({ max: 500 }).withMessage('La descripción no puede exceder 500 caracteres'),

    body('price')
        .notEmpty().withMessage('El precio es obligatorio')
        .isFloat({ gt: 0, max: 999999.99 })
        .withMessage('El precio debe ser un número mayor a 0'),

    body('image')
        .isString().withMessage('La imagen debe ser texto')
        .trim()
        .notEmpty().withMessage('La imagen es obligatoria')
        .matches(IMAGE_REGEX).withMessage('La imagen debe ser un nombre de archivo o una URL válida')
];

// POST /api/guitars
export const createGuitar = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Solo se toman los campos esperados (evita que el cliente inyecte id, createdAt, etc.)
        const { brand, name, description, price, image } = req.body;
        const guitar = await Guitar.create({
            brand,
            name,
            description,
            price: Number(price),
            image
        });

        return res.status(201).json({ data: guitar });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Hubo un error en el servidor al crear la guitarra' });
    }
};

// GET /api/guitars  -> EL RETO: lectura con findAll de Sequelize
export const getGuitars = async (req: Request, res: Response) => {
    try {
        const guitars = await Guitar.findAll({
            order: [['id', 'ASC']],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        return res.json({ data: guitars });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Hubo un error al obtener las guitarras' });
    }
};
