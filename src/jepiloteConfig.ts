import { integer } from "vscode-languageclient";
import { templates, Config, HfCodeLlama13BConfig } from "./configTemplates";
import {
	DocumentFilter,
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

function buildConfig(): Config | undefined {
    let config = templates["hf/codellama/CodeLlama-13b-hf"];

    if (config) {
        config['url'] = "http://localhost:8081/jepilote"
        return config;
    }
}

interface fullConfig extends Config {
    enableAutoSuggest: boolean,
    requestDelay: integer,
    "lsp.binaryPath"?: string,
    "lsp.logLevel": string,
    "documentFilter": DocumentFilter,
    fillInTheMiddle: Object,
    tlsSkipVerifyInsecure: boolean,
}

const JePiloteConfig: fullConfig = {
    ...HfCodeLlama13BConfig,
    url: "http://localhost:8081/jepilote",
    enableAutoSuggest: true,
    fillInTheMiddle: {
        enabled: true,
	    prefix: "<PRE> ",
	    middle: " <MID>",
	    suffix: " <SUF>",
    },
    requestDelay: 300,
    "documentFilter": { "pattern": "**" },
    tlsSkipVerifyInsecure: false,
    "lsp.logLevel": "debug",
}

export const jePiloteConfig = new Map(Object.entries(JePiloteConfig));