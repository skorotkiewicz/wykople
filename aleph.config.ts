import type { Config } from "https://deno.land/x/aleph@v0.3.0-beta.19/types.d.ts";
import tailwindcss from "https://deno.land/x/aleph_plugin_tailwindcss@v3.3.1/plugin.ts";

export default <Config>{
  // plugins: [tailwindcss],
  plugins: [tailwindcss({ verbose: true, version: "3.0.23" })],
};
