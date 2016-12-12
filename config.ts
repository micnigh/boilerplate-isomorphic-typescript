process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "development";

export let isDev = process.env.NODE_ENV === "development";
export let tmpPath = `.tmp/${process.env.NODE_ENV}`;
export let distPath = `${tmpPath}/dist`;

export const baseUrl = isDev ?
  process.env.BASE_URL || "/" :
  process.env.BASE_URL || "/";

export const port = isDev ?
  process.env.PORT || 3000 :
  process.env.PORT || 80;
