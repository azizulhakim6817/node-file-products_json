import { IncomingMessage, ServerResponse } from "http";
import { products } from "../data/products";
import { IProducts } from "../types/products.tyep";

export const productsController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  //! read body----------------------------------------------
  if (url === "/products" && method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(products));
    //! create body-------------------------------------------
  } else if (url === "/create-product" && method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const { name, description } = JSON.parse(body);
      const newBody: IProducts = {
        id: products.length + 1,
        name,
        description,
      };

      products.push(newBody);

      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(newBody));
    });
  }
};
