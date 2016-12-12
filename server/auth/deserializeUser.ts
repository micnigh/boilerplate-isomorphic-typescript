import * as chalk from "chalk";

export let deserializeUser = (req, user, done) => {
  // console.log(chalk.bgCyan("passport deserializeUser"), JSON.stringify(user, null, 2));
  // console.log(chalk.bgCyan("passport deserializeUser"), req.session);
  done(null, user);
};

export default deserializeUser;
