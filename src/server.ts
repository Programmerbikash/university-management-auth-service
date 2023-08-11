import mongoose from "mongoose";
import config from "./config";
import colors from "colors";
import app from "./app";

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(colors.yellow(`Database is connected successfully`));

    app.listen(config.port, () => {
      console.log(colors.yellow(`Application listening on port ${config.port}`));
    });
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
