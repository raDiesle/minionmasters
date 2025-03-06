import React from "react";
import css from "./elo-ranking-table.module.scss";
import { useTable, useBlockLayout, useSortBy, useGlobalFilter, useFilters, useAsyncDebounce } from "react-table";
import { FixedSizeList } from "react-window";
import {matchSorter} from 'match-sorter';
import { color } from "html2canvas";

const scrollbarWidth = () => {
  // thanks too https://davidwalsh.name/detect-scrollbar-width
  const scrollDiv = document.createElement("div");
  scrollDiv.setAttribute("style", "width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;");
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

// Define a default UI for filtering
function GlobalFilter({
                        preGlobalFilteredRows ,
                        globalFilter,
                        setGlobalFilter,
                      }) {
  console.log(preGlobalFilteredRows);
  const count = preGlobalFilteredRows.length || 0;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)
  return (
    <span>
      Search:{' '}
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  )
}

export const ReactTable = ({ columns, data, sortBy, minTableHeight, hiddenColumns = [], showGlobalFilter = true}) => {

  const defaultColumn = React.useMemo(() => ({
    width: 150,
    sortType: (rowA, rowB, columnId) => {
        const a = rowA.values[columnId];
        const b = rowB.values[columnId];

        const numA = parseFloat(a);
        const numB = parseFloat(b);

        if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB;
        }
        if (a == null || b == null){
          return a==null? 1 : -1
        }

        return (String(a) > String(b)) -1/2;
    }
  }), []);

  const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);


  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
  }
  // Let the table remove the filter if the string is empty
  fuzzyTextFilterFn.autoRemove = val => !val

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = useTable(
    {

      columns,
      data,
      defaultColumn,
      initialState: {sortBy,  hiddenColumns},
      filterTypes
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useBlockLayout
  );

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style
          })}
          className={css.tr}
        >
          {row.cells.map(cell => {
            const align = cell.column.align || 'right';
            const bgColor = cell.column.getColor;
            return (
              <div{...cell.getCellProps({
                style: {
                    ...cell.getCellProps().style,
                    ...cell.column.getCellProps?.(cell).style,
                    textAlign: align,
                    // backgroundColor: bgColor
                }
            })} className={css.td}>
                {cell.render("Cell")}
              </div>
              
            );
          })}
        </div>
      );
    },
    [prepareRow, rows]
  );

  return <div className={css.tableContainer}>
    {showGlobalFilter && (
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    )}

    <div {...getTableProps()} className={css.table}>
      <div>
        {headerGroups.map(headerGroup => (
          <div {...headerGroup.getHeaderGroupProps()} className={css.tr}>
            {headerGroup.headers.map(column => (
              <div {...column.getHeaderProps(column.getSortByToggleProps())} className={css.th}>
                {column.render("Header")}
                <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div {...getTableBodyProps()}>
        <FixedSizeList
          height={minTableHeight}
          itemCount={rows.length}
          itemSize={35}
          width={totalColumnsWidth + scrollBarSize}
        >
          {RenderRow}
        </FixedSizeList>
      </div>
    </div>
  </div>;
}