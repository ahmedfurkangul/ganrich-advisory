// Light map from a programme to its rule hub, for client components. Full hub content is in rule-hubs-content.ts.
export const hubBySolution: Record<string, string> = { solutionCbam: "hubCbam", solutionCra: "hubCra", solutionEudr: "hubEudr" };
export const hubLabel = { en: "Everything on this rule in one place", tr: "Bu kural hakkında her şey tek sayfada" } as const;
