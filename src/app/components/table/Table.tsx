import React, { FC } from "react";
import { useTable, useRowSelect } from "react-table";   
import './styles.scss';
import Props from './typing';

const Table: React.FC<Props> = ({ columns, data, onRowClick=null, tableCellStyle=null }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, toggleAllRowsSelected } =
        useTable(
            {
                columns,
                data,
            },
            useRowSelect
        );

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => {
                    const { key, ...restHeaderGroupProps } =
                        headerGroup.getHeaderGroupProps();
                    return (
                        <tr key={key} {...restHeaderGroupProps}>
                            {headerGroup.headers.map((column) => {
                                const { key, ...restColumn } = column.getHeaderProps({
                                    style: column.style,    
                            });
                                
                                return (
                                    <th key={key} {...restColumn} >
                                        {column.render("Header")}
                                    </th>
                                );
                            })}
                        </tr>
                    );
                })}
            </thead>
            <tbody {...getTableBodyProps}>
                {rows.map((row) => {
                    prepareRow(row);
                    const { key, ...restRowProps } = row.getRowProps({
                        style: {
                            backgroundColor: row['isSelected'] ? "#D3E8DE" : ""
                        },
                        onClick: (e) => {
                            toggleAllRowsSelected(false);
                            row.toggleRowSelected();
                            onRowClick(row.values)
                        }
                    })
                    return (
                        <tr key={key} {...restRowProps}>
                            {row.cells.map((cell) => {
                                const { key, ...restCellProps } = cell.getCellProps({
                                    style: tableCellStyle,
                                });
                                return (
                                    <td key={key} {...restCellProps}>
                                        {cell.render("Cell")}
                                    </td>
                                );
                            })}
                        </tr>

                    );
                })}
            </tbody>
        </table>
    );
};
export default Table;

