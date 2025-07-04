import moduleAlias from "module-alias";
import { resolve } from "path";

const root = {
  development: "src",
  production: "dist",
  test: "test",
};

const NODE_ENV = process.env.NODE_ENV as keyof typeof root;

console.log(`You're in ${NODE_ENV.toUpperCase()} mode`);

moduleAlias.addAliases({
  "@": resolve(__dirname, "../../", root[NODE_ENV]),
});
