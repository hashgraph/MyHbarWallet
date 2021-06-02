declare namespace NodeJS {
  interface Process {
    env: ProcessEnv;
  }
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production";
  }
}

declare const process: NodeJS.Process;
