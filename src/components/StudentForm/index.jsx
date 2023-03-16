import { Button, TextField, Stack } from "@mui/material";

import React from "react";

export default function StudentForm({ onClick, name }) {
    const [student, setStudent] = React.useState();
    return (
        <React.Fragment>
            <Stack direction="row" spacing={2}>
                <TextField
                    label="Name"
                    size="small"
                    variant="outlined"
                    value={student?.name || ""}
                    onChange={(e) =>
                        setStudent((prev) => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                />
                <TextField
                    label="Age"
                    size="small"
                    variant="outlined"
                    value={student?.age || ""}
                    onChange={(e) =>
                        setStudent((prev) => ({
                            ...prev,
                            age: e.target.value,
                        }))
                    }
                />
                <Button
                    variant="contained"
                    onClick={() => {
                        onClick(student);
                        setStudent(undefined);
                    }}
                >
                    {name}
                </Button>
            </Stack>
        </React.Fragment>
    );
}
