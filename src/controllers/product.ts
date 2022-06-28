import { NextFunction, Request, Response } from 'express';
//import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';

//const NAMESPACE = 'Books';

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    //logging.info(NAMESPACE, 'Inserting books');

    let { country, make, price } = req.body;

    let query = `INSERT INTO products (country, make, price) VALUES ("${country}", "${make}, "${price}")`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                   // logging.info(NAMESPACE, 'Book created: ', result);

                    return res.status(200).json({
                        result
                    });
                })
                .catch((error) => {
                 //   logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                //    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
         //   logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  //  logging.info(NAMESPACE, 'Getting all books.');

    let query = 'SELECT * FROM products';

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
       //             logging.info(NAMESPACE, 'Retrieved books: ', results);

                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {
           //         logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                //    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
         //   logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

export default { createProduct, getAllProducts };