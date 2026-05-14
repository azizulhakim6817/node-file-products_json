import { IncomingMessage, ServerResponse } from "http";
import { productsController } from "../controllers/products.controller";

export const productsHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  // read body----------------------------------------------
  if (url === "/products" && method === "GET") {
    await productsController(req, res);
    // create body----------------------------------------------
  } else if (url === "/create-product" && method === "POST") {
    return productsController(req, res);
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
};
