import * as chalk from "chalk";

export let serializeUser = (req, user, done) => {
  console.log(chalk.bgBlue("passport serializeUser"), JSON.stringify(user, null, 2));
  // console.log(chalk.bgBlue("passport serializeUser"), req.session);
  done(null, user);
};

export default serializeUser;
