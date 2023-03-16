import React from "react";
import { Container, Stack, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";

import StudentTable from "./components/StudentTable";

import LIST_STUDENT from "./shared/students.json";
import StudentForm from "./components/StudentForm";

const Wrapper = styled(Container)({
    paddingTop: 20,
});

function App() {
    const [listStudent, setListStudent] = React.useState(LIST_STUDENT);

    const [searchValue, setSearchValue] = React.useState("");

    const [search, setSearch] = React.useState("");

    const [indexSelected, setIndexSelected] = React.useState(null);

    const handleSearch = () => {
        setSearch(searchValue);
    };

    const handleAddStudent = (student) => {
        if (student) {
            setListStudent((prev) => [student, ...prev]);
        }
    };

    const handleEdit = (index) => {
        setIndexSelected(index);
    };

    const handleSaveEdit = (student) => {
        if (student) {
            let newList = [...listStudent];
            newList[indexSelected] = student;
            setListStudent([...newList]);
            setIndexSelected(null);
        }
    };

    const handleDelete = (index) => {
        let newList = listStudent;
        if (index > -1) {
            newList.splice(index, 1);
        }

        setListStudent([...newList]);
        setIndexSelected(null);
    };

    const listStudentFiltered = React.useMemo(() => {
        return [
            ...listStudent.filter((student) => student.name.includes(search)),
        ];
    }, [search, listStudent]);

    return (
        <React.Fragment>
            <Wrapper>
                <Stack spacing={3}>
                    <Stack direction="row" spacing={2}>
                        <TextField
                            variant="outlined"
                            placeholder="Search..."
                            size="small"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            onClick={() => {
                                handleSearch();
                            }}
                        >
                            Search
                        </Button>
                    </Stack>
                    <StudentTable
                        listStudent={listStudentFiltered}
                        onDelete={handleDelete}
                        rowSelected={indexSelected}
                        handleEdit={handleEdit}
                        handleSaveEdit={handleSaveEdit}
                    />
                    <StudentForm name="Add" onClick={handleAddStudent} />
                </Stack>
            </Wrapper>
        </React.Fragment>
    );
}

export default App;
