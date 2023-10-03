import app from "./app";
import { Config } from "./config";
import logger from "./config/logger";
const startServer = () => {
    const PORT = Config.PORT;

    try {
        app.listen(PORT, () =>
            logger.info(`listening on port ${PORT}`, { test: 1 }),
        );
    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.error(err.message);
            setTimeout(() => {
                process.exit(1);
            }, 1000);
        }
    }
};

startServer();
