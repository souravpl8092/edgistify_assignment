"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./configs/db");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.get("/", (req, res) => {
    res.send("Welcome Home Page");
});
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/product", product_routes_1.default);
app.use("/api/cart", cart_routes_1.default);
app.use("/api/order", order_routes_1.default);
(0, db_1.connectToDatabase)()
    .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
})
    .catch((err) => {
    console.error("❌ Database connection failed:", err);
});
