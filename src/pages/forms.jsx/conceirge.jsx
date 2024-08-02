import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { Puff } from "react-loader-spinner";
import { useGetConciergeHook } from "@/hooks/useGetConciergeHook";

const Concierge = () => {
  const concierge = useGetConciergeHook();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    
    concierge.handleGetConcierge();
    if(concierge.loginResponse){
      handleCloseEditModal();
    }
  }, [concierge.loginResponse]);

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
    concierge.handleEditConciergeForm(selectedUser);
  };

  const handleDelete = (id) => {
    concierge.handleDelete(id);
  };

  const columns = [
    {
      field: 'fullName',
      headerName: 'Full Name',
      width:150.5,
      renderCell: (params) => (
       
        <div>
           {console.log(params,"params")}
        <Tooltip title={params.value} arrow>
          <Typography className="mt-3 text-sm" noWrap>{params.value}</Typography>
        </Tooltip>
        <Tooltip title={params.row.DOB} arrow>
          <Typography className="mt-3 text-sm" noWrap><span className="font-bold">Dob:</span> {params.row.DOB.slice(0, 10)}</Typography>
        </Tooltip>
        </div>
      ),
    },
   
    {
      field: 'branchOfService',
      headerName: 'Branch of Service',
      width:150,
      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <Typography className="mt-6" noWrap>{params.value}</Typography>
        </Tooltip>
      ),
    },
    {
      field: 'contactMethod',
      headerName: 'Contact Method',
      width:150,
    },
    {
      field: 'howHeardAboutUs',
      headerName: 'Source',
      width:150,
    },
    {
      field: 'whyConcierge',
      headerName: 'Reason',
      width:150.5,
      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <Typography className="mt-6" noWrap>{params.value}</Typography>
        </Tooltip>
      ),
    },
    {
      field: 'hoursPerMonth',
      headerName: 'No of Hr/Operators',
      width:150,
      renderCell: (params) => (
        <Typography className="text-center mt-6">{params.value} / {params.row.numberOfOperators}</Typography>
      ),
    },
    {
      field: 'transitionServices',
      headerName: 'Organization',
      width:150,
    },
    {
      field: 'recommendedTransitionServices',
      headerName: 'Support Areas',
      width:150,
    },
    {
      field: 'uncomfortableTopics',
      headerName: 'Topics',
      width:150,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<MdVisibility className="w-5 h-5" />}
          label="View"
          onClick={() => handleOpenViewModal(params.row)}
        />,
        <GridActionsCellItem
          icon={<MdEdit className="w-5 h-5"/>}
          label="Edit"
          onClick={() => handleOpenEditModal(params.row)}
        />,
        <GridActionsCellItem
          icon={<MdDelete className="w-5 h-5"/>}
          label="Delete"
          onClick={() => handleDelete(params.row._id)}
        />,
      ],
    },
  ];

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Concierge
          </Typography>
        </CardHeader>
        {concierge?.loading ? (
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
              <DataGrid
                rows={concierge.getConcierge || []}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                getRowId={(row) => row._id}
                disableSelectionOnClick
                rowHeight={80}
              />
            </div>
          </CardBody>
        )}
      </Card>

      <Dialog
  open={openEditModal}
  onClose={handleCloseEditModal}
  maxWidth="md"
  fullWidth
>
  <DialogTitle>Edit {selectedUser?.fullName}</DialogTitle>
  <DialogContent dividers>
    <div className="mb-4">
      <Input
        type="text"
        label="Full Name"
        value={selectedUser?.fullName || ''}
        onChange={(e) =>
          setSelectedUser({ ...selectedUser, fullName: e.target.value })
        }
        fullWidth
      />
    </div>
    <div className="mb-4">
      <Input
        type="text"
        label="DOB"
        value={selectedUser?.DOB?.slice(0, 10) || ''}
        onChange={(e) =>
          setSelectedUser({ ...selectedUser, DOB: e.target.value })
        }
        fullWidth
      />
    </div>
    <div className="mb-4">
      <Input
        type="text"
        label="Branch of Service"
        value={selectedUser?.branchOfService || ''}
        onChange={(e) =>
          setSelectedUser({
            ...selectedUser,
            branchOfService: e.target.value,
          })
        }
        fullWidth
      />
    </div>
    <div className="mb-4">
      <Input
        type="text"
        label="Contact Method"
        value={selectedUser?.contactMethod || ''}
        onChange={(e) =>
          setSelectedUser({
            ...selectedUser,
            contactMethod: e.target.value,
          })
        }
        fullWidth
      />
    </div>
    <div className="mb-4">
      <Input
        type="text"
        label="Source"
        value={selectedUser?.howHeardAboutUs || ''}
        onChange={(e) =>
          setSelectedUser({
            ...selectedUser,
            howHeardAboutUs: e.target.value,
          })
        }
        fullWidth
      />
    </div>
    <div className="mb-4">
      <Input
        type="text"
        label="Reason"
        value={selectedUser?.whyConcierge || ''}
        onChange={(e) =>
          setSelectedUser({
            ...selectedUser,
            whyConcierge: e.target.value,
          })
        }
        fullWidth
      />
    </div>
    <div className="mb-4 flex gap-2">
      <Input
        type="text"
        label="No of Hours/Operators"
        value={selectedUser?.hoursPerMonth || ''}
        onChange={(e) =>
          setSelectedUser({
            ...selectedUser,
            hoursPerMonth: e.target.value,
          })
        }
        fullWidth
      />
      <Input
 
        type="text"
        label="Number of Operators"
        value={selectedUser?.numberOfOperators || ''}
        onChange={(e) =>
          setSelectedUser({
            ...selectedUser,
            numberOfOperators: e.target.value,
          })
        }
        fullWidth
      />
    </div>
    <div className="mb-4">
      <Input
        type="text"
        label="Organization"
        value={selectedUser?.transitionServices || ''}
        onChange={(e) =>
          setSelectedUser({
            ...selectedUser,
            transitionServices: e.target.value,
          })
        }
        fullWidth
      />
    </div>
    <div className="mb-4">
      <Input
        type="text"
        label="Support Areas"
        value={selectedUser?.recommendedTransitionServices || ''}
        onChange={(e) =>
          setSelectedUser({
            ...selectedUser,
            recommendedTransitionServices: e.target.value,
          })
        }
        fullWidth
      />
    </div>
    <div className="mb-4">
      <Input
        type="text"
        label="Topics"
        value={selectedUser?.uncomfortableTopics || ''}
        onChange={(e) =>
          setSelectedUser({
            ...selectedUser,
            uncomfortableTopics: e.target.value,
          })
        }
        fullWidth
      />
    </div>
  </DialogContent>
  <DialogActions>
    
    <Button variant="outlined" color="gray" onClick={handleCloseEditModal}>Cancel</Button>
    <Button onClick={handleSaveChanges}>Save Changes</Button>
  </DialogActions>
</Dialog>

<Dialog
  open={openViewModal}
  onClose={handleCloseViewModal}
  maxWidth="md"
  fullWidth
>
  <DialogTitle>{selectedUser?.fullName}</DialogTitle>
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <DialogContent dividers style={{ flex: 1, overflowY: 'auto' }}>
      <Typography variant="body1">
        <b>DOB:</b> {selectedUser?.DOB?.slice(0, 10)}
      </Typography>
      <Typography variant="body1">
        <strong>Branch of Service:</strong> {selectedUser?.branchOfService}
      </Typography>
      <Typography variant="body1">
        <strong>Contact Method:</strong> {selectedUser?.contactMethod}
      </Typography>
      <Typography variant="body1">
        <strong>Source:</strong> {selectedUser?.howHeardAboutUs}
      </Typography>
      <Typography variant="body1">
        <strong>Reason:</strong> {selectedUser?.whyConcierge}
      </Typography>
      <Typography variant="body1">
        <strong>No of Hours/Operators:</strong> {selectedUser?.hoursPerMonth} / {selectedUser?.numberOfOperators}
      </Typography>
      <Typography variant="body1">
        <strong>Organization:</strong> {selectedUser?.transitionServices}
      </Typography>
      <Typography variant="body1">
        <strong>Support Areas:</strong> {selectedUser?.recommendedTransitionServices}
      </Typography>
      <Typography variant="body1">
        <strong>Topics:</strong> {selectedUser?.uncomfortableTopics}
      </Typography>
    </DialogContent>
    <DialogActions style={{ justifyContent: 'flex-end', padding: '16px' }}>
      <Button color="gray" onClick={handleCloseViewModal}>Close</Button>
    </DialogActions>
  </div>
</Dialog>

    </div>
  );
};

export default Concierge;
