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
import { useGetOperatorHook } from "@/hooks/useGetOperatorHook";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, CircularProgress } from '@mui/material';
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";

const Operator = () => {
  const getOperatorksHook = useGetOperatorHook();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const options = {
    AirForce: [
      "Combat Controller/TACP",
      "Pararescue (PJ)",
      "24th Special Tactics Squadron (JSOC)",
    ],
    Army: [
      "Ranger (75th Regiment)",
      "Green Beret",
      "SMU",
      "Marine Force Recon",
      "160th Special Operations Aviation Regiment (SOAR) Night Stalkers",
    ],
    Navy: ["EOD", "SEAL", "SWCC"],
    Marines: ["Raider", "Marine Force Recon"],
  };

  const [selectedBranch, setSelectedBranch] = useState("AirForce");
  const [branchOptions, setBranchOptions] = useState(options[selectedBranch]);

  useEffect(() => {
    getOperatorksHook.handleGetOperator();
  }, [getOperatorksHook.loginResponse]);

  useEffect(() => {
    if (selectedUser) {
      setSelectedBranch(selectedUser.airForceAfSoc);
      setBranchOptions(options[selectedUser.airForceAfSoc]);
    }
  }, [selectedUser]);

  const handleBranchChange = (event) => {
    const branch = event.target.value;
    setSelectedBranch(branch);
    setBranchOptions(options[branch]);
    setSelectedUser({ ...selectedUser, airForceAfSoc: branch });
  };

  const handleSubDomainChange = (event) => {
    const subDomain = event.target.value;
    setSelectedUser({ ...selectedUser, EOD: subDomain });
  };

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const handleOpenViewModal = (user) => {
    setSelectedUser(user);
    setOpenViewModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedUser(null);
    setOpenEditModal(false);
  };

  const handleCloseViewModal = () => {
    setSelectedUser(null);
    setOpenViewModal(false);
  };

  const handleSaveChanges = () => {
    getOperatorksHook.handleEditOperatorForm(selectedUser);
    handleCloseEditModal();
  };

  const handleDelete = (id) => {
    getOperatorksHook.handleDelete(id);
  };

  const columns = [
    { field: 'fullName', headerName: 'Full Name', width: 200 },
    { field: 'DOB', headerName: 'DOB', width: 150 },
    { field: 'airForceAfSoc', headerName: 'Department', width: 200 },
    { field: 'EOD', headerName: 'Sub Domain', width: 200 },
    { field: 'currentlyEmployed', headerName: 'Employed', width: 150, renderCell: (params) => (
      <Typography className="text-xs font-semibold text-blue-gray-600 mt-7">
        {params.value ? 'Yes' : 'No'}
      </Typography>
    )},
    { field: 'location', headerName: 'Location', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div className="flex gap-2 mt-4">
          <MdVisibility className="cursor-pointer w-5 h-5" onClick={() => handleOpenViewModal(params.row)} />
          <MdEdit className="cursor-pointer w-5 h-5" onClick={() => handleOpenEditModal(params.row)} />
          <MdDelete className="cursor-pointer w-5 h-5" onClick={() => handleDelete(params.row._id)} />
        </div>
      )
    }
  ];

  const rows = getOperatorksHook.getOperators?.map((operator, index) => ({
    ...operator,
    id: operator._id,
    fullName: `${operator.firstName} ${operator.lastName}`,
    DOB:operator?.DOB?.slice(0,10)
  }));

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Operators
          </Typography>
        </CardHeader>
        {getOperatorksHook?.loading ? (
          <div className="flex justify-center">
            <Puff
              visible={true}
              height="80"
              width="80"
              color="#607d8b"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <CardBody className="px-0 pt-0 pb-2">
            <div style={{ height: 500, width: '100%' }}>
              <DataGrid rows={rows} columns={columns} pageSize={5}  rowHeight={80}/>
            </div>
          </CardBody>
        )}
      </Card>

      {/* Edit Modal */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Operator</DialogTitle>
        <DialogContent>
          <TextField
            label="Full Name"
            value={selectedUser?.firstName + " " + selectedUser?.lastName}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                firstName: e.target.value.split(" ")[0],
                lastName: e.target.value.split(" ")[1],
              })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="DOB"
            value={selectedUser?.DOB.slice(0, 10)}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, DOB: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Department"
            select
            value={selectedBranch}
            onChange={handleBranchChange}
            fullWidth
            margin="dense"
          >
            <MenuItem value="AirForce">Air Force AFSOC</MenuItem>
            <MenuItem value="Army">Army USASOC</MenuItem>
            <MenuItem value="Marines">Marines MARSOC</MenuItem>
            <MenuItem value="Navy">Navy NSW NSO</MenuItem>
          </TextField>
          <TextField
            label="Sub Domain"
            select
            value={selectedUser?.EOD}
            onChange={handleSubDomainChange}
            fullWidth
            margin="dense"
          >
            {branchOptions?.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Location"
            value={selectedUser?.location}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, location: e.target.value })
            }
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            {getOperatorksHook.loading ? <CircularProgress size={24} /> : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Modal */}
      <Dialog open={openViewModal} onClose={handleCloseViewModal}>
        <DialogTitle>View Operator</DialogTitle>
        <DialogContent>
          <TextField
            label="Full Name"
            value={selectedUser?.firstName + " " + selectedUser?.lastName}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="DOB"
            value={selectedUser?.DOB}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Department"
            value={selectedUser?.airForceAfSoc}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Sub Domain"
            value={selectedUser?.EOD}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Location"
            value={selectedUser?.location}
            fullWidth
            margin="dense"
            readOnly
          />
          <Typography variant="body2" color="textSecondary">
            Employed: {selectedUser?.currentlyEmployed ? 'Yes' : 'No'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Operator;
