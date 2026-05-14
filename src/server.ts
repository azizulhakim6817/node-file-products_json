import http, { IncomingMessage, Server, ServerResponse } from "http";
import fs from "node:fs";
import path from "path";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;

    if (url === "/" && method === "GET") {
      res.end("Home Page");
      //! read file--------------------------------------------------
    } else if (url === "/file" && method === "GET") {
      const pathName = path.join(process.cwd(), "src/files", "hello.txt");
      const data = fs.readFileSync(pathName, { encoding: "utf8" });

      res.writeHead(200, { "content-type": "text/plain" });
      res.end(data);
      //! create file------------------------------------
    } else if (url === "/file" && method === "POST") {
      let data = "";

      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        const { fileName, contents } = JSON.parse(data);
        const filePathName = path.join(
          process.cwd(),
          "./src/files",
          path.basename(fileName),
        );

        fs.writeFileSync(filePathName, contents);

        res.writeHead(201, { "content-type": "text/plain" });
        res.end(JSON.stringify("Created file successfully"));
      });
      //! update file ------------------------------------------
    } else if (url === "/file" && method === "PUT") {
      let data = "";

      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        const { fileName, contents } = JSON.parse(data);
        const filePathName = path.join(
          process.cwd(),
          "./src/files",
          path.basename(fileName),
        );

        if (!fs.existsSync(filePathName)) {
          res.writeHead(404);
          return res.end("File not found");
        }

        fs.writeFileSync(filePathName, contents);

        res.writeHead(200, {
          "Content-Type": "text/plain",
        });

        res.end(
          JSON.stringify({
            message: "File updated successfully",
          }),
        );
      });

      //! delete file -----------------------------------------
    } else if (url === "/file" && method === "DELETE") {
      let data = "";

      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        const { fileName } = JSON.parse(data);
        const filePathName = path.join(
          process.cwd(),
          "./src/files",
          path.basename(fileName),
        );

        if (!fs.existsSync(filePathName)) {
          res.writeHead(404);
          return res.end("File not found");
        }

        fs.unlinkSync(filePathName);

        res.writeHead(200, { "content-type": "text/plain" });
        res.end("File Deleted");
      });
    } else {
      res.end("Server Not Found!");
    }
  },
);

server.listen(5000, () => {
  console.log(`Server is running http://localhost:5000`);
});
