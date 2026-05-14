"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsController = void 0;
const products_1 = require("../data/products");
const productsController = (req, res) => {
    const url = req.url;
    const method = req.method;
    //! read body----------------------------------------------
    if (url === "/products" && method === "GET") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(products_1.products));
        //! create body-------------------------------------------
    }
    else if (url === "/create-product" && method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const { name, description } = JSON.parse(body);
            const newBody = {
                id: products_1.products.length + 1,
                name,
                description,
            };
            products_1.products.push(newBody);
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(newBody));
        });
    }
};
exports.productsController = productsController;
//# sourceMappingURL=products.controller.js.map