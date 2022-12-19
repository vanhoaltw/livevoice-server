"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
class BaseService {
    constructor(model) {
        this.model = model;
    }
    prefixModelName(filter, name) {
        return (Array.isArray(filter) &&
            filter.map((opt) => {
                if (opt.field && opt.field.includes('.'))
                    return opt;
                opt.field = `${name}.${opt.field}`;
                return opt;
            }));
    }
    sortJson(originalQuery, sorts) {
        if (sorts?.length > 0) {
            try {
                sorts.forEach((item) => {
                    originalQuery.orderBy(item.field, item.value);
                });
                return originalQuery;
            }
            catch (e) {
                console.log(e);
                throw new apollo_server_express_1.UserInputError('Wrong input sort');
            }
        }
        return originalQuery;
    }
    filterJson(originalQuery, filter) {
        if (filter?.length > 0) {
            try {
                let _query = originalQuery;
                filter.forEach((item) => {
                    _query = this.buildWhereClause(_query, item);
                });
                return _query;
            }
            catch (e) {
                console.log(e);
                throw new apollo_server_express_1.UserInputError('Wrong input filter');
            }
        }
        return originalQuery;
    }
    // Note this only work if relation and field name are exactly the same
    builWithGraphFetchClause(ctx, fieldName) {
        const selections = ctx.fieldNodes[0].selectionSet.selections;
        const fields = selections.filter((s) => s.kind === 'Field').map((s) => s?.name?.value);
        const inSelection = fieldName.filter((s) => {
            const parentField = s.split('.')[0];
            return fields.includes(parentField);
        });
        return `[${inSelection.join()}]`;
    }
    buildWhereClause(qb, { field, operator, value }) {
        if (Array.isArray(value) && !['or', 'in', 'nin'].includes(operator)) {
            return qb.where((subQb) => {
                for (const val of value) {
                    subQb.orWhere((q) => this.buildWhereClause(q, { field, operator, value: val }));
                }
            });
        }
        switch (operator) {
            case 'or':
                return qb.where((orQb) => {
                    value.forEach((orClause) => {
                        orQb.orWhere((subQb) => {
                            if (Array.isArray(orClause)) {
                                orClause.forEach((orClause) => subQb.where((andQb) => this.buildWhereClause(andQb, { ...orClause })));
                            }
                            else {
                                this.buildWhereClause(subQb, { ...orClause });
                            }
                        });
                    });
                });
            case 'eq':
                return qb.where(field, value);
            case 'ne':
                return qb.where(field, '!=', value);
            case 'lt':
                return qb.where(field, '<', value);
            case 'lte':
                return qb.where(field, '<=', value);
            case 'gt':
                return qb.where(field, '>', value);
            case 'gte':
                return qb.where(field, '>=', value);
            case 'in':
                return qb.whereIn(field, Array.isArray(value) ? value : [value]);
            case 'nin':
                return qb.whereNotIn(field, Array.isArray(value) ? value : [value]);
            case 'contains':
                return qb.whereRaw('?? ILIKE ?', [field, `%${value}%`]);
            case 'ncontains':
                return qb.whereRaw(`COALESCE(??, '') NOT ILIKE ?`, [field, `%${value}%`]);
            case 'containss':
                return qb.where(field, 'like', `%${value}%`);
            case 'like':
                return qb.where(field, 'like', `%${value}%`);
            case 'ncontainss':
                return qb.whereNot(field, 'like', `%${value}%`);
            case 'fts':
                return qb.whereRaw(`?? @@ plainto_tsquery('english', ?)`, [field, value]);
            case 'null': {
                return value ? qb.whereNull(field) : qb.whereNotNull(field);
            }
            default:
                throw new Error(`Unhandled whereClause : ${field} ${operator} ${value}`);
        }
    }
}
exports.default = BaseService;
//# sourceMappingURL=baseServiec.js.map