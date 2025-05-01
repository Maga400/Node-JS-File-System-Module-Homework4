import { error } from "console";
import fs from "fs";

export const writeLog = (status, message, path) => {
  const exist = fs.existsSync("././log.txt", (error) => {
    if (error) {
      console.error("Error checking file existence:", error);
      return;
    }

    return true;
  });

  if (exist) {
    fs.appendFile(
      "././log.txt",
      `\n${path} => ${status} => ${message}`,
      (error) => {
        if (error) {
          console.error("Error writing to file:", error);
          return;
        }
      }
    );

    console.log("Log append successfully");
  } else {
    fs.writeFile(
      "././log.txt",
      `${path} => ${status} => ${message}`,
      (error) => {
        if (error) {
          console.error("Error writing to file:", error);
          return;
        }
      }
    );

    console.log("Log write successfully");
  }
};
