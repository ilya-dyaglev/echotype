import React from 'react';
import '../styles/CustomTable.css'; // We'll create this CSS file for styling

interface Column {
    field: string;
    headerName: string;
    width?: number;
    flex?: number;
}

interface RowData {
    [key: string]: any;
    id: string;
}

interface CustomTableProps {
    columns: Column[];
    rows: RowData[];
    onRowClick: (rowId: string) => void;
    selectedRowId: string | null;
}

const CustomTable: React.FC<CustomTableProps> = ({ columns, rows, onRowClick, selectedRowId }) => {
    return (
        <div className="custom-table-container">
            <table className="custom-table">
                <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.field} style={{ width: col.width, flex: col.flex }}>
                            {col.headerName}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {rows.map((row) => {
                    const isSelected = row.id === selectedRowId;
                    return (
                        <tr
                            key={row.id}
                            className={isSelected ? 'selected-row' : ''}
                            onClick={() => onRowClick(row.id)}
                        >
                            {columns.map((col) => (
                                <td key={col.field}>{row[col.field]}</td>
                            ))}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default CustomTable;
