interface WebpackConfigGeneratorOptions {
  /** lodash `_.get` string to retrieve from gulpfile.config */
  gulpfileConfigField: string;

  entry: string;

  /** output directory path */
  dest: string;

  relativePath: string;

  /** port server is running on */
  port: number;
}
