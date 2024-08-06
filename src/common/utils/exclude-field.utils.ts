export const excludeFieldUtil = (model: any, fieldsToExclude: string[]) => {
    return Object.fromEntries(
        Object.keys(model.fields)
            .filter((field) => !fieldsToExclude.includes(field))
            .map((field) => [field, true]),
    );
};
