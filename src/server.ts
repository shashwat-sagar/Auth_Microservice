import app from "./app";
import { Config } from "./config";

const startServer = () => {
    const PORT = Config.PORT;

    try {
        app.listen(PORT, () => console.log(`listening on port ${PORT}`));
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

startServer();
