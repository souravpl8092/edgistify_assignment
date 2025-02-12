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
exports.removeUser = exports.getAllUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = __importDefault(require("../models/user.model"));
dotenv_1.default.config();
// GET REQUEST --> To get all users information
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find({});
        res.status(200).json({ users });
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to fetch users.",
            details: error.message,
        });
    }
});
exports.getAllUser = getAllUser;
// DELETE REQUEST --> To delete user profile
const removeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield user_model_1.default.findByIdAndDelete({ _id: id });
        res.json({ status: 200, message: "Deleted The user" });
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to fetch users.",
            details: error.message,
        });
    }
});
exports.removeUser = removeUser;
