// vinext 1.x imports `cloudflare:workers` at the top of the server bundle. Node cannot load that
// scheme, so the tests map it to an empty stand-in; bindings still come from the env passed to fetch().
import { register } from "node:module";

register("data:text/javascript," + encodeURIComponent(`
export async function resolve(specifier, context, next) {
  if (specifier.startsWith("cloudflare:")) return { url: "data:text/javascript,export const env = {};", shortCircuit: true };
  return next(specifier, context);
}`));
