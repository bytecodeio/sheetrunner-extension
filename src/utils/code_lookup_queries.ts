import { IWriteQuery } from "@looker/sdk/lib/sdk/3.1/models";

export const ahrqCssQuery = (codeType: string): IWriteQuery => {
    return {
        fields: ["dim_d1_code_ahrq_ccs.code_value"],
        filters: { "dim_d1_code_ahrq_ccs.code_type": `${codeType}` },
        limit: "-1",
        model: "feasability_new_codeset_finder_explores",
        sorts: ["dim_d1_code_ahrq_ccs.code_value"],
        view: "dim_d1_code_ahrq_ccs_lookup"
    }
};  
export const generalQuery = (codeType: string): IWriteQuery => {
    return {
        fields: ["dim_d1_code.code_value"],
        filters: { "dim_d1_code.code_type": `${codeType}` },
        limit: "-1",
        model: "feasability_new_codeset_finder_explores",
        sorts: ["dim_d1_code.code_value"],
        view: "dim_d1_code_lookup"
    }
};  
export const ingredientsQuery = (codeType: string): IWriteQuery => {
    return {
        fields: ["dim_d1_code_lookup.code_value"],
        filters: { "dim_d1_code_lookup.code_type": `${codeType}` },
        limit: "-1",
        model: "feasability_new_codeset_finder_explores",
        sorts: ["dim_d1_code_lookup.code_value"],
        view: "lkp_ndc_ingredient_lookup"
    }
};  
export const ndcQuery = (codeType: string): IWriteQuery => {
    return {
        fields: ["dim_d1_code_ndc.code_value"],
        filters: { "dim_d1_code_ahrq_ccs.code_type": `${codeType}` },
        limit: "-1",
        model: "dim_d1_code_ndc.code_type",
        sorts: ["feasability_new_codeset_finder_explores"],
        view: "dim_d1_code_ndc_lookup"
    }
};  