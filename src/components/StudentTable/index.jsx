import React from "react";
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    TableHead,
    IconButton,
    TextField,
} from "@mui/material";
import { styled } from "@mui/system";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: "#F5F5F5",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const StyledTableTitle = styled(TableCell)({
    backgroundColor: "#333",
    color: "#fff",
    textTransform: "uppercase",
});

export default function StudentTable({
    listStudent,
    onDelete,
    handleSaveEdit,
    handleEdit,
    rowSelected,
}) {
    const [studentState, setStudentState] = React.useState();
    return (
        <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableTitle>Name</StyledTableTitle>
                        <StyledTableTitle align="right">Age</StyledTableTitle>
                        <StyledTableTitle align="right">
                            Actions
                        </StyledTableTitle>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listStudent?.map((student, index) => (
                        <StyledTableRow key={index}>
                            <TableCell component="th" scope="row">
                                {rowSelected === index ? (
                                    <TextField
                                        size="small"
                                        value={studentState?.name}
                                        onChange={(e) =>
                                            setStudentState((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    student.name
                                )}
                            </TableCell>
                            <TableCell align="right">
                                {rowSelected === index ? (
                                    <TextField
                                        size="small"
                                        value={studentState?.age}
                                        onChange={(e) =>
                                            setStudentState((prev) => ({
                                                ...prev,
                                                age: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    student.age
                                )}
                            </TableCell>
                            <TableCell align="right">
                                {rowSelected === index ? (
                                    <IconButton
                                        color="primary"
                                        onClick={() =>
                                            handleSaveEdit(studentState)
                                        }
                                    >
                                        <SaveIcon />
                                    </IconButton>
                                ) : (
                                    <IconButton
                                        color="primary"
                                        onClick={() => {
                                            handleEdit(index);
                                            setStudentState({
                                                name: student.name,
                                                age: student.age,
                                            });
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                )}

                                <IconButton
                                    color="error"
                                    onClick={() => onDelete(index)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
