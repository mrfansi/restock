import {UserModel, ProductModel} from "../models/index.js";

// plugin untuk validasi form atau body
import Joi from 'joi'

export const productIndex = async (req, res) => {
  try {
    const products = await ProductModel.findAll();
    return res.status(200)
      .json({
        status: 200,
        message: 'OK',
        result: products
      })
  } catch (e) {
    console.log(e)
    return res.status(500)
      .json({
        status: 500,
        message: 'Kesalahan Server!.'
      })

  }
}

export const productShow = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findOne({where: {id: id}})
    return res.status(200)
      .json({
        status: 200,
        message: 'OK',
        result: product
      })
  } catch (e) {
    return res.status(500)
      .json({
        status: 500,
        message: 'Kesalahan Server!.'
      })

  }
}

export const productStore = async (req, res) => {
  try {

    // ekstrak object request body
    const {body, user} = req;

    // definisikan rule untuk validasi di form / body
    const productValidation = Joi
      .object()
      .keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        sku: Joi.string().required(),
        price: Joi.number().required(),
      })


    // lakukan validasi dari body berdasarkan schema rule yang dibuat
    const {error, value} = productValidation.validate(body);

    if (error) {
      // http code 422 untuk response "Unprocessable Entity"
      // atau bisa gunakan 400 untuk response "Bad request"
      return res.status(422)
        .json({
          status: 422,
          message: "Permintaan yang anda masukan salah atau tidak benar!",
          result: error.message
        })
    }

    await ProductModel.create({...value, user_id: user.id})

    return res.status(201)
      .json({
        status: 201,
        message: 'Produk berhasil ditambahkan'
      })

  } catch (e) {
    console.log(e)
    return res.status(500)
      .json({
        status: 500,
        message: 'Kesalahan Server!.'
      })

  }
}

export const productUpdate = async (req, res) => {
  try {
    const {body, params} = req;
    const id = params.id;

    // definisikan rule untuk validasi di form / body
    const productValidation = Joi
      .object()
      .keys({
        name: Joi.string().optional(),
        description: Joi.string().optional(),
        sku: Joi.string().optional(),
        price: Joi.number().optional(),
        user_id: Joi.number().optional(),
      })

    // lakukan validasi dari body berdasarkan schema rule yang dibuat
    const {error, value} = productValidation.validate(body);

    if (error) {
      // http code 422 untuk response "Unprocessable Entity"
      // atau bisa gunakan 400 untuk response "Bad request"
      return res.status(422)
        .json({
          status: 422,
          message: "Permintaan yang anda masukan salah atau tidak benar!",
          result: error.message
        })
    }

    console.log(value);

    const product = await ProductModel.findOne({where: {id: id}})
    if (product) {
      product.set(value)
      await product.save();

      return res.status(201)
        .json({
          status: 201,
          message: 'Produk berhasil diupdate',
          result: await product.reload()
        })
    }

    return res.status(404)
      .json({
        status: 404,
        message: 'Mohon maaf produk tidak ditemukan'
      })
  } catch (e) {
    return res.status(500)
      .json({
        status: 500,
        message: 'Kesalahan Server!.'
      })

  }
}

export const productDestroy = async (req, res) => {
  try {

    const {id} = req.params;

    const product = await ProductModel.findOne({where: {id: id}})
    if (product) {
      await product.destroy();
      return res.status(200)
        .json({
          status: 200,
          message: 'Produk berhasil dihapus',
        })
    }

    return res.status(404)
      .json({
        status: 404,
        message: 'Mohon maaf produk tidak ditemukan'
      })

  } catch (e) {
    console.log(e)
    return res.status(500)
      .json({
        status: 500,
        message: 'Kesalahan Server!.'
      })

  }
}