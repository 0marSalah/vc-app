// src/config.js
import dotenv from 'dotenv';

dotenv.config();

export const ISSUER_ADDRESS = process.env.REACT_APP_ISSUER_ADDRESS;
export const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;
