import React, { useRef, useEffect, forwardRef } from 'react';
import {
    useTable,
    useSortBy,
    usePagination,
    useRowSelect,
    useGlobalFilter,
    useAsyncDebounce,
    useExpanded,
} from 'react-table';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import logger from 'sabio-debug';
import Pagination from './PollsterPagination';

const _logger = logger.extend('PollstersTable');

const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter, searchBoxClass }) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    _logger('preGlobalFilteredRows', preGlobalFilteredRows);
    _logger('globalFilter', globalFilter);
    _logger('setGlobalFilter', setGlobalFilter);
    _logger('searchBoxClass', searchBoxClass);

    return (
        <div className={classNames(searchBoxClass)}>
            <span className="d-flex align-items-center tableText12">
                Search :{' '}
                <input
                    value={value || ''}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder={`${count} records...`}
                    className="form-control w-auto ms-1 tableText12"
                />
            </span>
        </div>
    );
};

GlobalFilter.propTypes = {
    preGlobalFilteredRows: PropTypes.arrayOf(null),
    length: PropTypes.number,
    globalFilter: PropTypes.arrayOf(null),
    setGlobalFilter: PropTypes.arrayOf(null),
    searchBoxClass: PropTypes.string,
};

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" ref={resolvedRef} {...rest} />
                <label htmlFor="form-check-input" className="form-check-label"></label>
            </div>
        </>
    );
});

IndeterminateCheckbox.propTypes = {
    indeterminate: PropTypes.arrayOf,
};

const Table = (props) => {
    const isSearchable = props['isSearchable'] || false;
    const isSortable = props['isSortable'] || false;
    const pagination = props['pagination'] || false;
    const isSelectable = props['isSelectable'] || false;
    const isExpandable = props['isExpandable'] || false;

    _logger('isSearchable', isSearchable);
    _logger('isSortable', isSortable);
    _logger('pagination', pagination);
    _logger('isSelectable', isSelectable);
    _logger('isExpandable', isExpandable);
    // We export table to CSV file from here, calling the useTable hook with the column
    // and data prps to return an object that has the properties we use to create the table.
    // Next we add a CSV download link by using the CSVLink component
    //https://thewebdev.info/2021/11/18/how-to-add-export-to-csv-button-in-a-react-table/
    const dataTable = useTable(
        {
            columns: props['columns'],
            data: props['data'],
            initialState: { pageSize: props['pageSize'] || 10 },
        },
        isSearchable && useGlobalFilter,
        isSortable && useSortBy,
        isExpandable && useExpanded,
        pagination && usePagination,
        isSelectable && useRowSelect,
        (hooks) => {
            isSelectable &&
                hooks.visibleColumns.push((columns) => [
                    {
                        id: 'selection',

                        Header: ({ getToggleAllPageRowsSelectedProps }) => (
                            <div>
                                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                            </div>
                        ),

                        Cell: ({ row }) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        ),
                    },
                    ...columns,
                ]);

            isExpandable &&
                hooks.visibleColumns.push((columns) => [
                    {
                        id: 'expander',
                        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
                            <span {...getToggleAllRowsExpandedProps()}>{isAllRowsExpanded ? '-' : '+'}</span>
                        ),
                        Cell: ({ row }) =>
                            row.canExpand ? (
                                <span
                                    {...row.getToggleRowExpandedProps({
                                        style: {
                                            paddingLeft: `${row.depth * 2}rem`,
                                        },
                                    })}>
                                    {row.isExpanded ? '-' : '+'}
                                </span>
                            ) : null,
                    },
                    ...columns,
                ]);
        }
    );
    _logger('isExpandable', isExpandable);

    Table.propTypes = {
        isSearchable: PropTypes.bool,
        isSortable: PropTypes.bool,
        pagination: PropTypes.number,
        isSelectable: PropTypes.number,
        isExpandable: PropTypes.bool,
        columns: PropTypes.number,
        data: PropTypes.number,
        pageSize: PropTypes.number,
        getToggleAllPageRowsSelectedProps: PropTypes.number,
        getToggleAllRowsExpandedProps: PropTypes.number,
        isAllRowsExpanded: PropTypes.number,
        canExpand: PropTypes.number,
        row: PropTypes.number,
        getToggleRowExpandedProps: PropTypes.number,
        getToggleRowSelectedProps: PropTypes.number,
        depth: PropTypes.number,
        isExpanded: PropTypes.number,
        searchBoxClass: PropTypes.string,
        tableClass: PropTypes.string,
        theadClass: PropTypes.string,
        sizePerPageList: PropTypes.number,
    };

    let rows = pagination ? dataTable.page : dataTable.rows;

    return (
        <>
            {isSearchable && (
                <GlobalFilter
                    preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
                    globalFilter={dataTable.state.globalFilter}
                    setGlobalFilter={dataTable.setGlobalFilter}
                    searchBoxClass={props['searchBoxClass']}
                />
            )}

            <div className="table-responsive">
                <table
                    {...dataTable.getTableProps()}
                    className={classNames('table table-centered react-table', props['tableClass'])}>
                    <thead className={props['theadClass']}>
                        {dataTable.headerGroups.map((headerGroup) => (
                            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        key={column.id}
                                        {...column.getHeaderProps(column.sort && column.getSortByToggleProps())}
                                        className={classNames({
                                            sortingDesc: column.isSortedDesc === true,
                                            sortingSsc: column.isSortedDesc === false,
                                            sortable: column.sort === true,
                                        })}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...dataTable.getTableBodyProps()}>
                        {(rows || []).map((row) => {
                            dataTable.prepareRow(row);
                            return (
                                <tr key={row.id} {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td key={cell.id} {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {pagination && <Pagination tableProps={dataTable} sizePerPageList={props['sizePerPageList']} />}
        </>
    );
};

Table.defaultProps = {
    Tables: '',
};

Table.propTypes = {
    tableProps: PropTypes.string,
};
export default Table;
