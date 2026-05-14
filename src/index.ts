import http, { Server } from "http";
import { products } from "./data/products";
import { IProducts } from "./types/products.tyep";

const PORT = 5000;

const server: Server = http.createServer(async (req, res) => {
  //! home page----------------------------------------------
  if (req.url === "/" && req.method === "GET") {
    res.end("Home page");
    //! read body----------------------------------------------
  } else if (req.url === "/products" && req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(products));
    //! create body----------------------------------------------
  } else if (req.url === "/create-product" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const { name, description } = JSON.parse(body);
      const newBody = {
        id: products.length + 1,
        name,
        description,
      };

      products.push(newBody);

      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(newBody));
    });
    //! update body----------------------------------------------
  } else if (req.url === "/update-product" && req.method === "PUT") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const bodyData: IProducts = JSON.parse(body);

      const index = products.findIndex((p) => p.id === bodyData.id);

      if (index !== -1) {
        products[index] = {
          ...products[index],
          id: bodyData.id,
          name: bodyData.name,
          description: bodyData.description,
        };
      }

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");

      res.end(JSON.stringify(products[index]));
    });
    // delete product -------------------------------------------------------------
  } else if (req.url === "/delete-product" && req.method === "DELETE") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const bodyData: IProducts = JSON.parse(body);

      const index = products.findIndex((p) => p.id === bodyData.id);

      const deleteProduct = products.splice(index, 1);

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");

      res.end(JSON.stringify(deleteProduct));
    });
  } else {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });
    res.end("Route Not Found!");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running port: http://localhost:${PORT}`);
});
