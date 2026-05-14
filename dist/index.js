"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const products_1 = require("./data/products");
const PORT = 5000;
const server = http_1.default.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //! home page----------------------------------------------
    if (req.url === "/" && req.method === "GET") {
        res.end("Home page");
        //! read body----------------------------------------------
    }
    else if (req.url === "/products" && req.method === "GET") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(products_1.products));
        //! create body----------------------------------------------
    }
    else if (req.url === "/create-product" && req.method === "POST") {
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
        //! update body----------------------------------------------
    }
    else if (req.url === "/update-product" && req.method === "PUT") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const bodyData = JSON.parse(body);
            const index = products_1.products.findIndex((p) => p.id === bodyData.id);
            if (index !== -1) {
                products_1.products[index] = Object.assign(Object.assign({}, products_1.products[index]), { id: bodyData.id, name: bodyData.name, description: bodyData.description });
            }
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(products_1.products[index]));
        });
        // delete product -------------------------------------------------------------
    }
    else if (req.url === "/delete-product" && req.method === "DELETE") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const bodyData = JSON.parse(body);
            const index = products_1.products.findIndex((p) => p.id === bodyData.id);
            const deleteProduct = products_1.products.splice(index, 1);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(deleteProduct));
        });
    }
    else {
        res.writeHead(404, {
            "Content-Type": "text/plain",
        });
        res.end("Route Not Found!");
    }
}));
server.listen(PORT, () => {
    console.log(`Server is running port: http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map