import {UserModel} from "../models/index.js";

// plugin untuk validasi form atau body
import Joi from 'joi'

// plugin untuk membuat token untuk validasi request api
import Jwt from 'jsonwebtoken'

// plugin untuk encrypt string
import Bcrypt from 'bcrypt'

// import config
import JwtConfig from "../config/jwt.config.js";

export const register = async (req, res) => {
  try {
    // ekstrak object request body
    const {body} = req;

    // definisikan rule untuk validasi di form / body
    const userValidation = Joi
      .object()
      .keys({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      })


    // lakukan validasi dari body berdasarkan schema rule yang dibuat
    const {error} = userValidation.validate(body);

    if (error) {
      // http code 422 untuk response "Unprocessable Entity"
      // atau bisa gunakan 400 untuk response "Bad request"
      return res.status(422)
        .json({
          status: 422,
          message: "Request yang anda masukan salah atau tidak benar!",
          result: error.message
        })
    }

    const data = {
      ...body,
      password: await Bcrypt.hash(body.password, 10)
    }

    await UserModel.create(data)
    return res.json({
      status: 201,
      message: "User successfully created"
    })
  } catch (e) {

    if (e.name === "SequelizeUniqueConstraintError") {
      return res.status(400)
        .json({
          status: 400,
          message: 'Mohon maaf user sudah terdaftar'
        })
    }

    console.log(e)

    return res.status(500)
      .json({
        status: 500,
        message: "Kesalahan server!."
      })
  }
}

export const login = async (req, res) => {
  try {

    const {body} = req;
    const userValidation = Joi
      .object()
      .keys({
        email: Joi.string().required(),
        password: Joi.string().required()
      })

    const {error} = userValidation.validate(body)

    if (error) {
      return res.status(422)
        .json({
          status: 422,
          message: "Request yang anda masukan salah atau tidak benar!",
          result: error.message
        })
    }

    // cari email yang di request
    const userIsFound = await UserModel.findOne({where: {email: body.email}})

    // jika email ditemukan
    if (userIsFound) {

      // lakukan pengecekan decrypt dari request password dan password yang ada didalam database
      const valid = await Bcrypt.compare(body.password, userIsFound.password)

      // jika valid
      if (valid) {
        // generate jwt token, assign expire selama 1 jam
        const token = Jwt.sign({
          id: userIsFound.id,
          name: `${userIsFound.firstname} ${userIsFound.lastname}`,
          email: userIsFound.email
        }, JwtConfig.secret, {
          algorithm: "HS256",
          expiresIn: JwtConfig.expiresIn,
        })

        return res.status(200)
          .json({
            status: 200,
            message: 'OK',
            result: {
              name: `${userIsFound.firstname} ${userIsFound.lastname}`,
              email: userIsFound.email,
              token: token
            }
          })
      }

      // jika pengecekan password gagal
      return res.status(400)
        .json({
          status: 400,
          message: 'Mohon maaf password salah!'
        })

    }

    // jika email tidak ditemukan
    return res.status(404)
      .json({
        status: 404,
        message: 'Mohon maaf email belum terdaftar'
      })

  } catch (e) {
    console.log(e)
    return res.status(500)
      .json({
        status: 500,
        message: "Kesalahan server!."
      })
  }
}