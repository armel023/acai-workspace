import { useEffect, useMemo } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  BusinessEntityOption,
  RoleOption,
  SubEntityOption,
  UserAssignmentItem,
  UserOption,
} from "../dto/userAssignmentDto";
import type { UserAssignmentFormMode } from "../stores/useUserAssignmentStore";
import {
  userAssignmentFormSchema,
  type UserAssignmentFormValues,
} from "../schemas/userAssignmentFormSchema";

type UserAssignmentFormDialogProps = {
  open: boolean;
  mode: UserAssignmentFormMode;
  item: UserAssignmentItem | null;
  users: UserOption[];
  roles: RoleOption[];
  businessEntities: BusinessEntityOption[];
  subEntities: SubEntityOption[];
  loading?: boolean;
  lookupWarning?: string;
  onClose: () => void;
  onSubmit: (values: UserAssignmentFormValues) => Promise<void>;
};

export function UserAssignmentFormDialog({
  open,
  mode,
  item,
  users,
  roles,
  businessEntities,
  subEntities,
  loading = false,
  lookupWarning,
  onClose,
  onSubmit,
}: UserAssignmentFormDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<UserAssignmentFormValues>({
    resolver: zodResolver(userAssignmentFormSchema),
    defaultValues: {
      userId: "",
      roleId: "",
      businessEntityId: "",
      subEntityId: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (open && mode === "edit" && item) {
      reset({
        userId: item.userId,
        roleId: item.roleId,
        businessEntityId: item.businessEntityId ?? "",
        subEntityId: item.subEntityId ?? "",
        isActive: item.isActive,
      });
      return;
    }

    if (open && mode === "create") {
      reset({
        userId: "",
        roleId: "",
        businessEntityId: "",
        subEntityId: "",
        isActive: true,
      });
    }
  }, [open, mode, item, reset]);

  const businessEntityId = useWatch({
    control,
    name: "businessEntityId",
  });

  const roleId = useWatch({
    control,
    name: "roleId",
  });

  const roleMap = useMemo(
    () => new Map(roles.map((option) => [option.id, option.name])),
    [roles],
  );

  const isScopedRoleSelected = useMemo(() => {
    const selectedRoleName = roleMap.get(roleId);
    if (!selectedRoleName) {
      return false;
    }

    const normalizedRoleName = selectedRoleName
      .replace(/\s+/g, "")
      .toLowerCase();

    return (
      normalizedRoleName === "assistant" ||
      normalizedRoleName === "businessentityadmin" ||
      normalizedRoleName === "subentityadmin"
    );
  }, [roleId, roleMap]);

  const filteredSubEntities = useMemo(() => {
    if (!businessEntityId) {
      return [];
    }

    return subEntities.filter(
      (itemOption) => itemOption.businessEntityId === businessEntityId,
    );
  }, [businessEntityId, subEntities]);

  useEffect(() => {
    if (!isScopedRoleSelected) {
      setValue("businessEntityId", "", { shouldValidate: true });
      setValue("subEntityId", "", { shouldValidate: true });
      clearErrors(["businessEntityId", "subEntityId"]);
    }
  }, [isScopedRoleSelected, setValue, clearErrors]);

  useEffect(() => {
    if (!businessEntityId) {
      setValue("subEntityId", "", { shouldValidate: true });
      clearErrors("subEntityId");
    }
  }, [businessEntityId, setValue, clearErrors]);

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle sx={{ fontWeight: 700 }}>
        {mode === "create" ? "Add User Assignment" : "Update User Assignment"}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 0.5 }}>
          {lookupWarning ? (
            <Alert severity="warning">{lookupWarning}</Alert>
          ) : null}

          <Controller
            name="userId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="User"
                fullWidth
                error={Boolean(errors.userId)}
                helperText={errors.userId?.message}
              >
                {users.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.displayName} ({option.email})
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="roleId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Role"
                fullWidth
                error={Boolean(errors.roleId)}
                helperText={
                  errors.roleId?.message ?? "Select an available role"
                }
              >
                <MenuItem value="">Select Role</MenuItem>
                {roles.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {isScopedRoleSelected ? (
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
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
                    helperText={
                      errors.businessEntityId?.message ??
                      "Required for the selected role"
                    }
                  >
                    <MenuItem value="">Select Business Entity</MenuItem>
                    {businessEntities.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name} ({option.code})
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              {businessEntityId ? (
                <Controller
                  name="subEntityId"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Sub Entity"
                      fullWidth
                      helperText="Optional"
                    >
                      <MenuItem value="">No Sub Entity</MenuItem>
                      {filteredSubEntities.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name} ({option.code})
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              ) : null}
            </Stack>
          ) : null}

          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={field.value}
                    onChange={(_, checked) => field.onChange(checked)}
                  />
                }
                label={
                  <Stack spacing={0.25}>
                    <Typography sx={{ fontWeight: 600 }}>
                      Active Assignment
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Active assignments sync user authorization automatically.
                    </Typography>
                  </Stack>
                }
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
            if (isScopedRoleSelected && !values.businessEntityId) {
              setError("businessEntityId", {
                type: "manual",
                message: "Business Entity is required for the selected role",
              });
              return;
            }

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
