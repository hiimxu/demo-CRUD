import React, { useEffect, useMemo, useState } from "react";
import LIST_STUDENT from "./shared/students.json";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Box,
    Button,
    Stack,
    TextField,
    IconButton,
    Tooltip,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
    const [listStudent, setListStudent] = useState(LIST_STUDENT);

    const [student, setStudent] = useState({
        id: Math.max(...listStudent.map((item) => item.id)) + 1,
        name: "",
        gender: "Male",
        class: "",
    });

    const [studentSelected, setStudentSelected] = useState();

    const [search, setSearch] = useState("");

    const [searchValue, setSearchValue] = useState("");

    const [openDialog, setOpenDialog] = useState(false);

    const listClass = useMemo(() => {
        return [...new Set(listStudent.map((student) => student.class))];
    }, [listStudent]);

    const handleAdd = () => {
        setListStudent((prev) => [...prev, student]);
    };

    const handleDelete = (id) => {
        setListStudent((prev) => prev.filter((item) => item.id !== id));
        setStudentSelected(undefined);
        setOpenDialog(false);
    };

    const handleEdit = () => {
        const index = listStudent.findIndex(
            (item) => item.id === studentSelected.id
        );
        let newArray = listStudent;
        newArray[index] = studentSelected;
        setListStudent([...newArray]);
    };

    const listStudentFilter = useMemo(() => {
        return [
            ...listStudent.filter((student) =>
                student.name.toLowerCase().includes(searchValue.toLowerCase())
            ),
        ];
    }, [searchValue, listStudent]);

    return (
        <React.Fragment>
            <React.Fragment>
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>Confirm delete</DialogTitle>
                    <DialogContent>
                        Do you want delete this student?
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            onClick={() => handleDelete(studentSelected?.id)}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => setOpenDialog(false)}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
            <Box
                sx={{
                    mt: 5,
                }}
            >
                <Stack direction="row" spacing={2}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button
                        variant="outlined"
                        onClick={() => setSearchValue(search)}
                    >
                        Search
                    </Button>
                </Stack>
            </Box>
            <Box>
                <input
                    type="text"
                    value={student?.name}
                    onChange={(e) =>
                        setStudent((prev) => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                />
                Male:{" "}
                <input
                    type="radio"
                    value="Male"
                    name="gender"
                    checked={student?.gender === "Male"}
                    onChange={(e) =>
                        setStudent((prev) => ({
                            ...prev,
                            gender: e.target.value,
                        }))
                    }
                />
                Female:{" "}
                <input
                    type="radio"
                    value="Female"
                    name="gender"
                    checked={student?.gender === "Female"}
                    onChange={(e) =>
                        setStudent((prev) => ({
                            ...prev,
                            gender: e.target.value,
                        }))
                    }
                />
                <select
                    name="class"
                    onChange={(e) =>
                        setStudent((prev) => ({
                            ...prev,
                            class: e.target.value,
                        }))
                    }
                >
                    {listClass.map((classItem) => (
                        <option value={classItem}>{classItem}</option>
                    ))}
                </select>
                <button onClick={() => handleAdd()}>Add</button>
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Class</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listStudentFilter.map((student) => (
                        <TableRow>
                            <TableCell>{student.id}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.gender}</TableCell>
                            <TableCell>{student.class}</TableCell>
                            <TableCell>
                                <Stack direction="row" spacing={2}>
                                    <Tooltip title="Edit">
                                        <IconButton
                                            onClick={() =>
                                                setStudentSelected(student)
                                            }
                                            color="primary"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            color="error"
                                            // onClick={() =>
                                            //     handleDelete(student.id)
                                            // }
                                            onClick={() => {
                                                setOpenDialog(true);
                                                setStudentSelected(student);
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {studentSelected && (
                <Box>
                    <input
                        type="text"
                        value={studentSelected?.name}
                        onChange={(e) =>
                            setStudentSelected((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                    />
                    Male:{" "}
                    <input
                        type="radio"
                        value="Male"
                        name="gender"
                        checked={studentSelected?.gender === "Male"}
                        onChange={(e) =>
                            setStudentSelected((prev) => ({
                                ...prev,
                                gender: e.target.value,
                            }))
                        }
                    />
                    Female:{" "}
                    <input
                        type="radio"
                        value="Female"
                        name="gender"
                        checked={studentSelected?.gender === "Female"}
                        onChange={(e) =>
                            setStudentSelected((prev) => ({
                                ...prev,
                                gender: e.target.value,
                            }))
                        }
                    />
                    <select
                        name="class"
                        onChange={(e) =>
                            setStudentSelected((prev) => ({
                                ...prev,
                                class: e.target.value,
                            }))
                        }
                    >
                        {listClass.map((classItem) => (
                            <option value={classItem}>{classItem}</option>
                        ))}
                    </select>
                    <button
                        onClick={() => {
                            handleEdit();
                        }}
                    >
                        Edit
                    </button>
                </Box>
            )}
        </React.Fragment>
    );
}

export default App;
