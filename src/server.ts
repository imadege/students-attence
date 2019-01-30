import app from "./app";
import * as config from "config";

const PORT = config.get('PORT');
app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})

export default app;
