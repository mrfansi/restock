import express from "express"

import {login, register} from "../controllers/auth.controller.js";
import {
  productDestroy,
  productIndex,
  productShow,
  productStore,
  productUpdate
} from "../controllers/product.controller.js";
import {Verify} from "../middleware/authentication.js";

// Inisialisasi router dari express
const router = express.Router();

// definisikan URL Endpoint disini
// auth.controller.js
router.post('/register', register);
router.post('/login', login);

// product.controller.js
router.get('/product', [Verify], productIndex);
router.post('/product', [Verify], productStore);
router.put('/product/:id', [Verify], productUpdate);
router.get('/product/:id', [Verify], productShow);
router.delete('/product/:id',[Verify], productDestroy);


export default router;