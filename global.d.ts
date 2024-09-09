import { RequestUser } from "./src/index";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      MONGO_URI: string;
      JWT_SECRET: string;
      JWT_LIFETIME: string;
    }
  }
  namespace Express {
    interface Request {
      user: RequestUser;
    }
  }
}

export {};
