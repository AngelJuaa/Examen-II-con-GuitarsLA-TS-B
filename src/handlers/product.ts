import Product from "../models/Product.model";
import {check, validationResult} from "express-validator";

import { Request, Response } from "express";


export const createProduct = async (req: Request, res: Response) => {

   try {
      await check('name')
      .notEmpty()
      .withMessage('El nombre del producto no puede ir vacio')
      .run(req);

      await check('price').isNumeric().withMessage('Valor no valido')
      .notEmpty().withMessage('El precio del producto no puede ir vacio')
      .custom(value=> value > 0)
      .withMessage('El precio no puede ser menor a 0').run(req);




      const errors = validationResult(req);

      if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()});
      }

    const product = await Product.create(req.body);
    const savedProduct =  await  product.save();
    return res.status(201).json({data: product})

   } catch (error) {
    console.log(error);
    
    return res.status(500).json({ error: "Hubo un error en el servidor al crear el producto" });
   }
    //agregar validaciones con express-validator
//crear una tabla basada en mi proyecto y hacer esto mismo de hoy
   //
}