module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module-resolver",
                {
                    root: ["./"],
                    alias: {
                        actions: "./actions",
                        app: "./app",
                        assets: "./assets",
                        components: "./components",
                        constants: "./constants",
                        helpers: "./helpers",
                        hooks: "./hooks",
                        libs: "./libs",
                        icons: "./resources/icons",
                        types: "./types",
                    },
                },
            ],
        ],
    };
};
