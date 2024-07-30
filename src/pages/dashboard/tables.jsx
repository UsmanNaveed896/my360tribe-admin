import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { DataGrid } from '@mui/x-data-grid';
import { Puff } from "react-loader-spinner";
import { useGetUsersHook } from "@/hooks/useGetUsersHook";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import { MdDelete, MdEdit } from "react-icons/md";
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';

export function Tables() {
  const usersHook = useGetUsersHook();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    usersHook.handleGetUsers();
  }, [usersHook.loginResponse]);

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
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
    usersHook.handleCreateUser(data);
    setOpenCreateModal(false);
    reset();
  };

  const columns = [
    {
      field: 'photo',
      headerName: '',
      renderCell: (params) => (
        params.value ? (
          <div className="p-3 mt-2">
            <Avatar src={params.value} alt={params.row.fullName} />
          </div>
        ) : (
          <div className="p-3 mt-2">
            <Avatar>
              {params.row.fullName[0]}
              {params.row.fullName.split(' ')[1]?.[0]}
            </Avatar>
          </div>
        )
      ),
      sortable: false,
      filterable: false,
      width: 100,
    },
    { field: 'fullName', headerName: 'Full Name', width: 170 },
    { field: 'email', headerName: 'Email', width: 220 },
    { field: 'phone', headerName: 'Phone', width: 170 },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: (params) => (
        <div className="flex justify-start items-center">
          <Typography className="mt-5 p-1 text-xs text-white font-semibold rounded" style={{
            backgroundColor: params.value === "inactive" ? "#eb4946" : params.value === "pending" ? "#7367f0" : "blue-gray"
          }}>
            {params.value === "inactive" ? "Inactive" : params.value === "pending" ? "Pending" : "Active"}
          </Typography>
        </div>
      ),
      width: 170,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 170,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
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

  const rows = usersHook?.users?.map((user) => ({
    id: user._id,
    photo: user.photo.startsWith("http://")
      ? user.photo.replace("http://", "https://")
      : user.photo,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    status: user.status,
    role: user.role,
  }));

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader  variant="gradient" color="gray" className="mb-8 p-6 flex justify-between">
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
            <div style={{ height: 400, width: '100%' }}>
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
            value={selectedUser?.fullName || ''}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, fullName: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Email"
            variant="outlined"
            value={selectedUser?.email || ''}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, email: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Phone"
            variant="outlined"
            value={selectedUser?.phone || ''}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, phone: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Role"
            variant="outlined"
            value={selectedUser?.role || ''}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, role: e.target.value })
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
            value={selectedUser?.status || ''}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal} variant="outlined" color="secondary">
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
              {...register('fullName', { required: 'Full Name is required' })}
              fullWidth
              margin="dense"
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />
            <TextField
              label="Email"
              variant="outlined"
              {...register('email', { required: 'Email is required' })}
              fullWidth
              margin="dense"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Phone"
              variant="outlined"
              {...register('phone', { required: 'Phone number is required' })}
              fullWidth
              margin="dense"
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
            <TextField
              label="Role"
              variant="outlined"
              {...register('role', { required: 'Role is required' })}
              fullWidth
              margin="dense"
              error={!!errors.role}
              helperText={errors.role?.message}
            />
            <TextField
              label="Status"
              variant="outlined"
              select
              SelectProps={{ native: true }}
              {...register('status', { required: 'Status is required' })}
              fullWidth
              margin="dense"
              error={!!errors.status}
              helperText={errors.status?.message}
            >
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
            </TextField>
            <DialogActions>
              <Button onClick={() => setOpenCreateModal(false)} variant="outlined" color="secondary">
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
