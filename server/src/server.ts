import "tsconfig-paths/register";
import "dotenv/config";
import { config } from "@/config/app.config";
import app from "@/app";
import { connectToDB } from "@/db/db-connect";


const PORT = config.PORT || 8000;

async function bootstrap () {

   await connectToDB();
   
   await app.listen(PORT , async() => {
        console.log(`Server is runing on port ${8000}`);
   });

}

bootstrap();