import {
    Box,
    Card,
    FormControl,
    makeStyles,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Pagination } from "@material-ui/lab";
import { mdiSort, mdiSortAscending, mdiSortDescending } from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useLocation, useNavigate } from "react-router-dom";
import { rowsPerPageOptions } from "../../utils/halper";
import TableSearch from "src/components/TableSearch";
import { customAlert } from "src/utils/customAlert";
import { ADMIN } from "src/utils/constant";

const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const TableList = ({ className = "commonPage", tableData, ...rest }) => {
    const {
        sortField,
        data,
        isDeletedButtonShow,
        isUpdatedButtonShow,
        isViewButtonShow,
        action,
        pageSet,
        limit,
        page,
        total,
        filters,
        eventLister,
        tableConfig,
        dynamicButtonShow,
        isPagination
    } = tableData;
    const classes = useStyles();
    const navigate = useNavigate();

    const [sortVlaues, setSortValues] = useState(sortField);
    const [tableHeader, setTableHeader] = useState([]);
    const [sortHeader, setSortHeader] = useState([]);
    const [sortKey, setSortKey] = useState([]);
    const [tableSortKey, setTableSortKey] = useState([]);
    const [filterColumn, setFilterColumn] = useState([]);

    useEffect(() => {
        var tableH = [];
        var sortH = [];
        var sortK = [];
        var tableSK = [];
        var filterH = [];
        if (tableConfig.length) {
            for (const pf of tableConfig) {
                if (pf?.title && pf?.visible) {
                    tableH.push(pf);
                    if (pf.key) {
                        tableSK.push(pf);
                    }
                }
                if (pf?.key && pf?.visible && pf?.filter) {
                    filterH.push(pf.title);
                }
                if (pf?.sort && pf?.visible) {
                    sortH.push(pf.title);
                    sortK.push(pf.key);
                }
            }
        }
        setTableHeader(tableH);
        setSortHeader(sortH);
        setSortKey(sortK);
        setTableSortKey(tableSK);
        // setFilterColumn(filterH);
    }, [])

    const handlePageChange = (event, newPage) => {
        filters['page'] = newPage;
        pageSet(newPage);
    };

    const sortData = (key) => {
        let value = sortVlaues[key];
        value = value === "" ? 1 : value * -1;
        let sortObj = {};
        let sortKey = Object.keys(sortField);

        for (let i = 0; i < sortKey.length; i++) {
            sortObj["sort_" + sortKey[i]] = sortKey[i] === key ? value : ""
        }
        let newSortState = {};
        Object.keys(sortVlaues).forEach((key2) => {
            newSortState[key2] = key2 === key ? sortVlaues[key2] : "";
        });
        newSortState[key] = value;
        setSortValues(newSortState);
        eventLister.ListData({ ...sortObj, limit, page });
    };

    useEffect(() => {
        if (filters?.page) {
            pageSet(filters.page);
        }
    }, [filters]);

    const searchData = (e) => {
        pageSet(1);
        filters["page"] = 1;
        filters[e.target.name] = e.target.value;
        eventLister.ListData(filters);
    };

    const updateData = (id) => {
        navigate(`${action?.update}/${id}`);
    };

    const handleDelete = (ids) => {
        customAlert("Are you sure you want to delete this?", () =>
            eventLister.deleteItem(ids)
        );
    };
    const dynamicButton = (id, key) => {
        dynamicButtonShow(id, key)
    }
    return (
        <Card className={clsx(classes.root, className)} {...rest} elevation={0}>
            <PerfectScrollbar>
                <Box minWidth={1050}>
                    <Table dense="true" size="small" table="true">
                        <TableHead>
                            <TableRow>
                                <TableCell className="tableCell">
                                    S.No
                                </TableCell>
                                {tableHeader.map((column, i) => {
                                    // let fData = tableConfig.length ? tableConfig.find(e => e.title === column?.title)?.filter_data : []
                                    if (sortHeader.includes(column?.title)) {
                                        let index = sortHeader.findIndex((e) => e === column?.title);
                                        let value = sortVlaues[sortKey[index]];
                                        let order = "";
                                        if (value === "") {
                                            order = mdiSort;
                                        } else if (value === 1) {
                                            order = mdiSortAscending;
                                        } else {
                                            order = mdiSortDescending;
                                        }
                                        return (
                                            <TableCell className="tableCell" key={i}>
                                                <Box onClick={() => sortData(sortKey[index])}>
                                                    {column?.title}
                                                    {order && (
                                                        <Icon
                                                            style={{ marginLeft: "5px" }}
                                                            path={order}
                                                            size={0.8}
                                                            color="black"
                                                        />
                                                    )}
                                                </Box>
                                                {filterColumn?.includes(column?.title) &&
                                                    (<TableSearch
                                                        filter_data={column?.filter_data || []}
                                                        data={column}
                                                        column={sortKey[index]}
                                                        onChange={searchData}
                                                    />
                                                    )
                                                }
                                            </TableCell>
                                        );
                                    } else {
                                        if (
                                            isDeletedButtonShow &&
                                            isUpdatedButtonShow &&
                                            column?.title === "Action"
                                        ) {
                                            return (
                                                <TableCell className="tableCell" key={i}>
                                                    {column?.title}
                                                </TableCell>
                                            );
                                        } else {
                                            return (
                                                <TableCell className="tableCell" key={i}>
                                                    {column?.title}
                                                </TableCell>
                                            );
                                        }
                                    }
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.length > 0
                                ? data.map((singleData, i) => {
                                    var rowCells = [];
                                    rowCells.push(
                                        <TableCell key={("row" + i + singleData.id)} className="tableCell">
                                            {((page - 1) * limit) + (i + 1)}
                                        </TableCell>
                                    );
                                    for (let index = 0; index < tableSortKey.length; index++) {
                                        let objTableConfig = tableSortKey[index];
                                        if (singleData.hasOwnProperty(objTableConfig?.key) && objTableConfig?.type !== "button") {
                                            if (objTableConfig?.type === "date") {
                                                rowCells.push(
                                                    <TableCell key={index + singleData.id} className="tableCell">
                                                        {singleData[objTableConfig.key] ? moment(singleData[objTableConfig.key]).format(objTableConfig.date_format) : ""}
                                                    </TableCell>
                                                );
                                            } else if (objTableConfig?.type === "string") {
                                                rowCells.push(
                                                    <TableCell key={index + singleData.id} className="tableCell">
                                                        {singleData[objTableConfig.key]}
                                                    </TableCell>
                                                );
                                            } else if (objTableConfig?.type === "url") {
                                                rowCells.push(
                                                    <TableCell key={index + singleData.id} className="tableCell">
                                                        {singleData[objTableConfig.key] && (
                                                            <a
                                                                className="form-p-span image-zoom"
                                                                href={singleData[objTableConfig.key]}
                                                                target="_blank"
                                                            >
                                                                {
                                                                    <img
                                                                        height={115}
                                                                        width={115}
                                                                        src={singleData[objTableConfig.key]}
                                                                    />
                                                                }
                                                            </a>
                                                        )}
                                                        {/* {singleData[objTableConfig.key] ? (<a href={singleData[objTableConfig.key]} target="_blank"><LinkIcon /></a>) : ""} */}
                                                    </TableCell>
                                                );
                                            }
                                        } else {
                                            if (objTableConfig?.type === "button" && (singleData?.role_id !== ADMIN)) {
                                                rowCells.push(
                                                    <TableCell key={index + singleData.id} className="tableCell">
                                                        <VisibilityIcon
                                                            className={objTableConfig?.type?.config?.className}
                                                            onClick={() => dynamicButton(singleData.id, objTableConfig?.key)}
                                                        />
                                                    </TableCell>
                                                );
                                            } else { rowCells.push(<TableCell>-</TableCell>) }
                                        }
                                    }
                                    return (
                                        <TableRow hover key={singleData.id}>
                                            {rowCells}
                                            <TableCell className="tableCell">
                                                {isViewButtonShow && action?.view && (singleData?.role_id !== ADMIN) && (
                                                    <VisibilityIcon
                                                        className="cellViewBtn"
                                                        onClick={() =>
                                                            navigate(`${action?.view}/${singleData.id}`, { state: singleData })
                                                        }
                                                    />
                                                )}
                                                {isUpdatedButtonShow && action?.update && (singleData?.role_id !== ADMIN) && (
                                                    <EditIcon
                                                        className="cellEditBtn"
                                                        onClick={() => updateData(singleData.id)}
                                                    />
                                                )}
                                                {isUpdatedButtonShow && action?.delete && (singleData?.role_id !== ADMIN) && (
                                                    <DeleteIcon
                                                        className="cellDeleteBtn"
                                                        onClick={() => handleDelete(singleData.id)}
                                                    />
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                                : (<TableRow><TableCell colSpan={tableHeader.length}> No Data Found!</TableCell></TableRow>)}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <Box display="flex" style={{ "display": total > 10 && isPagination ? "" : "none" }} alignItems="center" justifyContent="flex-end" >
                {/* <label>Rows per page:</label>
                <FormControl className={classes.formControl}>
                    <Select
                        value={limit}
                        onChange={handleLimitChange}
                    >
                        {rowsPerPageOptions().map((e, i) => (
                            <MenuItem key={i} value={e}>
                                {e}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl> */}
                <Pagination
                    style={{ position: "relative" }}
                    showFirstButton
                    showLastButton
                    count={Math.ceil(total / limit)}
                    page={page}
                    siblingCount={1}
                    boundaryCount={1}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                />
            </Box>
        </Card>
    );
};
TableList.propTypes = {
    className: PropTypes.string,
};
export default TableList;
