"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const node_fs_1 = __importDefault(require("node:fs"));
const path_1 = __importDefault(require("path"));
const server = http_1.default.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === "/" && method === "GET") {
        res.end("Home Page");
        //! read file--------------------------------------------------
    }
    else if (url === "/file" && method === "GET") {
        const pathName = path_1.default.join(process.cwd(), "src/files", "hello.txt");
        const data = node_fs_1.default.readFileSync(pathName, { encoding: "utf8" });
        res.writeHead(200, { "content-type": "text/plain" });
        res.end(data);
        //! create file------------------------------------
    }
    else if (url === "/file" && method === "POST") {
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        });
        req.on("end", () => {
            const { fileName, contents } = JSON.parse(data);
            const filePathName = path_1.default.join(process.cwd(), "./src/files", path_1.default.basename(fileName));
            node_fs_1.default.writeFileSync(filePathName, contents);
            res.writeHead(201, { "content-type": "text/plain" });
            res.end(JSON.stringify("Created file successfully"));
        });
        //! update file ------------------------------------------
    }
    else if (url === "/file" && method === "PUT") {
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        });
        req.on("end", () => {
            const { fileName, contents } = JSON.parse(data);
            const filePathName = path_1.default.join(process.cwd(), "./src/files", path_1.default.basename(fileName));
            if (!node_fs_1.default.existsSync(filePathName)) {
                res.writeHead(404);
                return res.end("File not found");
            }
            node_fs_1.default.writeFileSync(filePathName, contents);
            res.writeHead(200, {
                "Content-Type": "text/plain",
            });
            res.end(JSON.stringify({
                message: "File updated successfully",
            }));
        });
        //! delete file -----------------------------------------
    }
    else if (url === "/file" && method === "DELETE") {
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        });
        req.on("end", () => {
            const { fileName } = JSON.parse(data);
            const filePathName = path_1.default.join(process.cwd(), "./src/files", path_1.default.basename(fileName));
            if (!node_fs_1.default.existsSync(filePathName)) {
                res.writeHead(404);
                return res.end("File not found");
            }
            node_fs_1.default.unlinkSync(filePathName);
            res.writeHead(200, { "content-type": "text/plain" });
            res.end("File Deleted");
        });
    }
    else {
        res.end("Server Not Found!");
    }
});
server.listen(5000, () => {
    console.log(`Server is running http://localhost:5000`);
});
//# sourceMappingURL=server.js.map