import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { DataGrid } from "@mui/x-data-grid";
import { Puff } from "react-loader-spinner";
import { useGetUsersHook } from "@/hooks/useGetUsersHook";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";
import Avatar from "@mui/material/Avatar";
import { useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";

export function Tables() {
  const usersHook = useGetUsersHook();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [file, setFile] = useState();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    usersHook.handleGetUsers();
  }, [usersHook.loginResponse]);

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setPreviewPhoto(user.photo); 
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedUser(null);
    setOpenEditModal(false);
  };

  const handleSaveChanges = () => {
    usersHook.handleEditUsers(selectedUser);
    handleCloseEditModal();
  };

  const handleDelete = (id) => {
    usersHook.handleDelete(id);
  };

  
  const handleCreateUser = (data) => {
    console.log(data, "data");
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("status", data.status);
    formData.append("password", data.password);
    formData.append("passwordConfirm", data.confirmPassword);

    formData.append("photo", file);

    usersHook.handleCreateUsers(formData);
    setOpenCreateModal(false);
    reset();
    setPreviewPhoto(null);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewPhoto(URL.createObjectURL(file));
      setFile(file);
    } else {
      setPreviewPhoto(null);
    }
  };

  const handleIconClick = () => {
    document.getElementById("fileInput").click();
  };

  const columns = [
    {
      field: "photo",
      headerName: "",
      renderCell: (params) =>
        params.value ? (
          <div className="p-3 mt-2">
            <Avatar src={params.value} alt={params.row.fullName} />
          </div>
        ) : (
          <div className="p-3 mt-2">
            <Avatar>
              {params.row.fullName[0]}
              {params.row.fullName.split(" ")[1]?.[0]}
            </Avatar>
          </div>
        ),
      sortable: false,
      filterable: false,
      width: 100,
    },
    { field: "fullName", headerName: "Full Name", flex:1 },
    { field: "email", headerName: "Email",flex:1 },
    { field: "phone", headerName: "Phone", flex:1 },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => (
        <div className="flex justify-start items-center">
          <Typography
            className="mt-5 p-1 text-xs text-white font-semibold rounded"
            style={{
              backgroundColor:
                params.value === "inactive"
                  ? "#eb4946"
                  : params.value === "pending"
                  ? "#7367f0"
                  : "blue-gray",
            }}
          >
            {params.value === "inactive"
              ? "Inactive"
              : params.value === "pending"
              ? "Pending"
              : "Active"}
          </Typography>
        </div>
      ),
      flex:1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex:1,
      renderCell: (params) => (
        <div className="mt-6 flex gap-2">
          <MdEdit
            className="h-5 w-5 cursor-pointer"
            onClick={() => handleOpenEditModal(params.row)}
          />
          <MdDelete
            className="h-5 w-5 cursor-pointer"
            onClick={() => handleDelete(params.row._id)}
          />
        </div>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  const rows = usersHook?.users?.slice()?.reverse()?.map((user) => ({
    id: user._id,
    photo: user.photo.startsWith("http://")
      ? user.photo.replace("http://", "https://")
      : user.photo,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    status: user.status,
  }));
console.log(usersHook?.users,"sdsd")
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-6 flex justify-between"
        >
          <Typography variant="h6" color="white">
            Users
          </Typography>
          <Button onClick={() => setOpenCreateModal(true)} color="primary">
            Create User
          </Button>
        </CardHeader>
        {usersHook.loading ? (
          <div className="flex justify-center">
            <Puff
              visible={true}
              height="80"
              width="80"
              color="#607d8b"
              ariaLabel="puff-loading"
            />
          </div>
        ) : (
          <CardBody className="px-0 pt-0 pb-2">
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                autoWidth
                rowHeight={80}
              />
            </div>
          </CardBody>
        )}
      </Card>

      {/* Edit Modal */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Full Name"
            variant="outlined"
            value={selectedUser?.fullName || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, fullName: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Email"
            variant="outlined"
            value={selectedUser?.email || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, email: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Phone"
            variant="outlined"
            value={selectedUser?.phone || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, phone: e.target.value })
            }
            fullWidth
            margin="dense"
          />
         
          <TextField
            label="Status"
            variant="outlined"
            select
            SelectProps={{
              native: true,
            }}
            value={selectedUser?.status || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, status: e.target.value })
            }
            fullWidth
            margin="dense"
          >
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
          </TextField>
          {/* Photo Upload for Edit */}
          <div className="pt-4">
            <input
              id="fileInputEdit"
              type="file"
              className="hidden"
              {...register("photo")}
              onChange={(e) => {
                handlePhotoChange(e);
                setSelectedUser({ ...selectedUser, photo: e.target.files[0] });
              }}
            />
            <div
              className="text-white text-center cursor-pointer"
              onClick={() => document.getElementById("fileInputEdit").click()}
            >
              {previewPhoto ? (
                <img
                  src={previewPhoto}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto"
                />
              ) : (
                <div className="flex justify-center">
                  <FaUserCircle size={50} />
                </div>
              )}
              <p>Upload Profile Picture</p>
            </div>
            {errors.photo && (
              <span className="text-red-500 text-center">
                Photo is required
              </span>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseEditModal}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            {usersHook.loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create User Modal */}
      <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleCreateUser)}>
            <TextField
              label="Full Name"
              variant="outlined"
              {...register("fullName", { required: "Full Name is required" })}
              fullWidth
              margin="dense"
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />
            <TextField
              label="Email"
              variant="outlined"
              {...register("email", { required: "Email is required" })}
              fullWidth
              margin="dense"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Phone"
              variant="outlined"
              {...register("phone", { required: "Phone is required" })}
              fullWidth
              margin="dense"
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
            <TextField
              label="Role"
              variant="outlined"
              select
              {...register("role", { required: "Role is required" })}
              fullWidth
              margin="dense"
              error={!!errors.role}
              helperText={errors.role?.message}
            >
              <MenuItem value="super_admin">Super Admin</MenuItem>
              <MenuItem value="operator">Operator</MenuItem>
              <MenuItem value="concierge">Concierge</MenuItem>
              <MenuItem value="peer_ambassador">Peer Ambassador</MenuItem>
              <MenuItem value="service_partner">Service Partner</MenuItem>
            </TextField>
            <TextField
              label="Status"
              variant="outlined"
              select
              SelectProps={{ native: true }}
              {...register("status", { required: "Status is required" })}
              fullWidth
              margin="dense"
              error={!!errors.status}
              helperText={errors.status?.message}
            >
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
            </TextField>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              {...register("password", { required: "Password is required" })}
              fullWidth
              margin="dense"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <p className="text-xs text-gray-500 my-1">Min 8 Characters</p>
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              fullWidth
              margin="dense"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
            {/* Photo Upload for Create */}
            <div className="pt-4">
              <input
                id="fileInputCreate"
                type="file"
                className="hidden"
                {...register("photo")}
                onChange={handlePhotoChange}
              />
              <div
                className="text-white text-center cursor-pointer"
                onClick={() =>
                  document.getElementById("fileInputCreate").click()
                }
              >
                {previewPhoto ? (
                  <img
                    src={previewPhoto}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto"
                  />
                ) : (
                  <div className="flex justify-center">
                    <div>
                      <FaUserCircle className="text-black ml-6" size={50} />
                      <p className="text-black">Upload Photo</p>
                    </div>
                  </div>
                )}
                <p>Upload Profile Picture</p>
              </div>
              {errors.photo && (
                <span className="text-red-500 text-center">
                  Photo is required
                </span>
              )}
            </div>
            <DialogActions>
              <Button
                onClick={() => setOpenCreateModal(false)}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
              <Button type="submit" color="primary">
                {usersHook.loading ? "Creating..." : "Create User"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Tables;
