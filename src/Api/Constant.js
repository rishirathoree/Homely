

export const createQuery = (orderby, RowCount, Pages,search,datefrom,dateto) => {
    let query = {}
    query.ORDER_BY = orderby || 'ASC'
    query.ROW_COUNT = RowCount || 10
    query.PAGE = Pages || 1
    if (search && search.length > 0) {query.search = search;}
    if (datefrom && dateto) {query.date_from = datefrom;query.date_to = dateto;}
    return query;
};
