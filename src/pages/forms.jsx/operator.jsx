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
import { useGetOperatorHook } from "@/hooks/useGetOperatorHook";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
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

  const roles = ["Service partner", "Concierge", "Peer Ambassador"];

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

  const handleAssignToChange = (event) => {
    const role = event.target.value;
    setSelectedUser({ ...selectedUser, assignTo: role });
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
    {
      field: "fullName",
      headerName: "Full Name",
      width: 200,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "DOB",
      headerName: "DOB",
      width: 150,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "airForceAfSoc",
      headerName: "Department",
      width: 200,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "EOD",
      headerName: "Sub Domain",
      width: 200,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "currentlyEmployed",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Employed",
      width: 150,
      renderCell: (params) => (
        <Typography className="text-xs font-semibold text-blue-gray-600 mt-7">
          {params.value ? "Yes" : "No"}
        </Typography>
      ),
    },
    {
      field: "location",
      headerName: "Location",
      width: 200,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "assignTo",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Assign to",
      width: 200,
      renderCell: (params) => (
        <div className="mt-3 text-white">
         <FormControl sx={{ width: "150px" }}>
      <InputLabel id="demo-simple-select-label" sx={{ color: 'white' }}>Assign To</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        variant="standard"
        label="Assign To"
        sx={{
          color: 'white', // Changes the selected text color
          '& .MuiSvgIcon-root': {
            color: 'white', // Changes the dropdown arrow color
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              // Background color of the dropdown
              '& .MuiMenuItem-root': {
                color: 'black', // Text color of the dropdown options
              },
            },
          },
        }}
      >
        <MenuItem value={10}>Concierge</MenuItem>
        <MenuItem value={20}>Peer Ambassador</MenuItem>
        <MenuItem value={30}>Service Partner</MenuItem>
      </Select>
    </FormControl>
        </div>
      ),
    },
    {
      field: "actions",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className="flex gap-2 mt-4">
          <MdVisibility
            className="cursor-pointer w-5 h-5"
            onClick={() => handleOpenViewModal(params.row)}
          />
          <MdEdit
            className="cursor-pointer w-5 h-5"
            onClick={() => handleOpenEditModal(params.row)}
          />
          <MdDelete
            className="cursor-pointer w-5 h-5"
            onClick={() => handleDelete(params.row._id)}
          />
        </div>
      ),
    },
  ];

  const rows = getOperatorksHook.getOperators?.map((operator, index) => ({
    ...operator,
    id: operator._id,
    fullName: `${operator.firstName} ${operator.lastName}`,
    DOB: operator?.DOB?.slice(0, 10),
  }));

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card  sx={{ backgroundColor: "#191a45" }}>
        <CardHeader variant="gradient"  color="#000032" className="mb-8 p-6 bg-[#191a45]"  sx={{ backgroundColor: "#191a45" }}>
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
          <CardBody className="px-0 pt-0 pb-2 p-0">
            <div
              style={{
                height: 500,
                width: "100%",
                backgroundColor: "#191a45",
                color: "white",
              }}
            >
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowHeight={80}
                sx={{
                  "& .MuiDataGrid-root": {
                    backgroundColor: "#191a45",
                    color: "white",
                  },
                  "& .MuiDataGrid-cell": {
                    backgroundColor: "#191a45",
                    color: "white",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    color: "#fff", // Change footer background color to white
                  },
                  "& .MuiTablePagination-root": {
                    color: "#fff", // Change text color in footer if needed
                  },
               
                  "& .MuiDataGrid-columnHeaders": {
                    color: "#000",
                    backgroundColor: "#000032",
                  },
                  "& .MuiDataGrid-columnHeaderRow": {
                    background: "#000032 !important", // Remove any background
                  },
                }}
              />
            </div>
          </CardBody>
        )}
      </Card>

      {/* Edit Modal */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Operator</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            value={selectedUser?.firstName}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                firstName: e.target.value,
              })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Last Name"
            value={selectedUser?.lastName}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                lastName: e.target.value,
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
          <TextField
            label="Assign to"
            select
            value={selectedUser?.assignTo || ""}
            onChange={handleAssignToChange}
            fullWidth
            margin="dense"
          >
            {roles.map((role, index) => (
              <MenuItem key={index} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
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
            {getOperatorksHook.loading ? (
              <CircularProgress size={24} />
            ) : (
              "Save Changes"
            )}
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
          <TextField
            label="Assign to"
            value={selectedUser?.assignTo}
            fullWidth
            margin="dense"
            readOnly
          />
          <Typography variant="body2" color="textSecondary">
            Employed: {selectedUser?.currentlyEmployed ? "Yes" : "No"}
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
