
import { Logger } from "apollo-server-types";

interface CBLogger {
    debug: string
    info: string
    warn: string
    error: string
}

const logHandler: Function = (message: string): void => console.log(`[CropBoard:Server ⚡🚀 ] -> Log | ${message}`);

const requestLogger: Logger = {
    debug: (msg: string) => logHandler(msg),
    info: (msg: string) => logHandler(msg),
    warn: (msg: string) => logHandler(msg),
    error: (msg: string) => logHandler(msg)
}

export { requestLogger };
