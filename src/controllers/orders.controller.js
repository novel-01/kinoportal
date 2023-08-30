const Joi = require('joi');
const { knex } = require('../database');
const CustomError = require('../utils/custom-error');

const create = async (req, res, next) => {
    try {
        const { film_id } = req.body;
        const user = req.user;

        const { error } = Joi.object({
            film_id: Joi.string().required()
        }).validate({ film_id });

        if (error) {
            throw new CustomError(400, error.message);
        }

        const film = await knex('films').select('*').where({ id: film_id }).first();
        await knex('users').where({ id: user.id }).update({ balance: user.balance - film.price });

        const order = await knex('orders').insert({ user_id: user.id, film_id });

        res.status(201).json({ message: "Succes, movie added", order });
    } catch (error) {
        next(error);
    }
};

const get = async (req, res, next) => {
    try {
        const { id } = req.params;
        const orders = await knex('orders').select('*').where({ id });

        res.status(200).json({ message: "All orders here", orders });
    } catch (error) {
        next(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const { date } = req.query;
        let query = knex('orders').select('*').where({ user_id: req.user.id });

        if (date) {
            query = query.orderBy('created_at', date);
        }

        const orders = await query;

        res.status(200).json({ message: "All orders", orders });
    } catch (error) {
        next(error);
    }
};

module.exports = { create, get, getAll };