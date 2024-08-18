const fs = require("fs");
const path = require("path");
import * as yaml from "js-yaml";

interface EnvironmentConfig {
  baseUrl: string;
  username: string;
  password: string;
}

interface Config {
  environments: {
    [key: string]: EnvironmentConfig;
  };
}

export function loadConfig(env: string): EnvironmentConfig {
  try {
    const filePath = path.join(__dirname, "../configs/config.yaml");
    console.log(filePath);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = yaml.load(fileContents) as Config;
    return data.environments[env];
  } catch (e) {
    console.log(e);
    throw new Error(`Failed to load config for environment ${env}: ${e}`);
  }
}
