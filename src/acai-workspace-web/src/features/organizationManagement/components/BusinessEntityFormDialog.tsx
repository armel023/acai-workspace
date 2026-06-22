import { useEffect } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { BusinessEntityItem } from "../dto/organizationManagementDto";
import type { BusinessEntityFormMode } from "../stores/useBusinessEntityStore";
import {
  businessEntityFormSchema,
  type BusinessEntityFormValues,
} from "../schemas/businessEntityFormSchema";

type BusinessEntityFormDialogProps = {
  open: boolean;
  mode: BusinessEntityFormMode;
  item: BusinessEntityItem | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (values: BusinessEntityFormValues) => Promise<void>;
};

export function BusinessEntityFormDialog({
  open,
  mode,
  item,
  loading = false,
  onClose,
  onSubmit,
}: BusinessEntityFormDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BusinessEntityFormValues>({
    resolver: zodResolver(businessEntityFormSchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
    },
  });

  useEffect(() => {
    if (open && mode === "edit" && item) {
      reset({
        name: item.name,
        code: item.code,
        description: item.description ?? "",
      });
      return;
    }

    if (open && mode === "create") {
      reset({ name: "", code: "", description: "" });
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
        {mode === "create" ? "Add Business Entity" : "Update Business Entity"}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 0.5 }}>
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
