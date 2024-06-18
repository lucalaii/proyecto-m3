import { PORT } from "./config/envs";
import  app  from "./server/server";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize()
.then(res => {
    console.log("Conexión a la bd exitosa");
    app.listen(PORT, () => {
        console.log("App iniciada en el puerto 3000");
    })
})