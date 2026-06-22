import { useEffect } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  BusinessEntityOption,
  SubEntityItem,
} from "../dto/organizationManagementDto";
import type { SubEntityFormMode } from "../stores/useSubEntityStore";
import {
  subEntityFormSchema,
  type SubEntityFormValues,
} from "../schemas/subEntityFormSchema";

type SubEntityFormDialogProps = {
  open: boolean;
  mode: SubEntityFormMode;
  item: SubEntityItem | null;
  businessEntityOptions: BusinessEntityOption[];
  loading?: boolean;
  onClose: () => void;
  onSubmit: (values: SubEntityFormValues) => Promise<void>;
};

export function SubEntityFormDialog({
  open,
  mode,
  item,
  businessEntityOptions,
  loading = false,
  onClose,
  onSubmit,
}: SubEntityFormDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubEntityFormValues>({
    resolver: zodResolver(subEntityFormSchema),
    defaultValues: {
      businessEntityId: "",
      name: "",
      code: "",
      description: "",
    },
  });

  useEffect(() => {
    if (open && mode === "edit" && item) {
      reset({
        businessEntityId: item.businessEntityId,
        name: item.name,
        code: item.code,
        description: item.description ?? "",
      });
      return;
    }

    if (open && mode === "create") {
      reset({
        businessEntityId: "",
        name: "",
        code: "",
        description: "",
      });
    }
  }, [open, mode, item, reset]);

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle sx={{ fontWeight: 700 }}>
        {mode === "create" ? "Add Sub Entity" : "Update Sub Entity"}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 0.5 }}>
          <Controller
            name="businessEntityId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Business Entity"
                fullWidth
                error={Boolean(errors.businessEntityId)}
                helperText={errors.businessEntityId?.message}
              >
                {businessEntityOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name} ({option.code})
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />
            )}
          />

          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Code"
                fullWidth
                error={Boolean(errors.code)}
                helperText={errors.code?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                multiline
                minRows={3}
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
              />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit(async (values) => {
            await onSubmit(values);
          })}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={18} color="inherit" />
          ) : mode === "create" ? (
            "Create"
          ) : (
            "Save Changes"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
