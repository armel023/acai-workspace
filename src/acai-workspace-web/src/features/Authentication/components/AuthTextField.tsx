import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";

export function AuthTextField(props: TextFieldProps) {
  return (
    <TextField
      fullWidth
      size="medium"
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          bgcolor: "#f9fbfb",
          "&.Mui-focused fieldset": {
            borderWidth: 2,
          },
        },
      }}
      {...props}
    />
  );
}
