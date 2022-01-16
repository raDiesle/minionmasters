import React from "react";
import css from "./elo-ranking-table.module.scss";
import { useTable, useBlockLayout, useSortBy } from "react-table";
import { FixedSizeList } from "react-window";

const scrollbarWidth = () => {
  // thanks too https://davidwalsh.name/detect-scrollbar-width
  const scrollDiv = document.createElement("div");
  scrollDiv.setAttribute("style", "width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;");
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

export default scrollbarWidth;

export function ReactTable({ columns, data, sortBy  }) {

  const defaultColumn = React.useMemo(
    () => ({
      width: 150
    }),
    []
  );

  const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {sortBy}
    },
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
            return (
              <div {...cell.getCellProps()} className={css.td}>
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
          height={400}
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