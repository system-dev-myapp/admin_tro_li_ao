export const RouterDTO = Object.freeze({
    dashboard: "/*",
    auth: "/auth/:method",
    intents: {
        manageIntents: "/intents/*",
        createIntents: "/intents/create-intents",
        allIntents: "intents/all-intents",
    },
    Year: {
        manageYear: "/year/*",
        createManageYear: "/year/create-manage-year",
        createPointYear: "/year/create-point-year",
    },
});
