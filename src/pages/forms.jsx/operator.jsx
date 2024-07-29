import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import { Puff } from "react-loader-spinner";
import { useGetOperatorHook } from "@/hooks/useGetOperatorHook";

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
  }, []);

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
    getOperatorksHook.handleEditOperator(selectedUser);
  };

  const handleDelete = (id) => {
    getOperatorksHook.handleDeleteOperator(id);
  };

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
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {[
                    "Full Name",
                    "DOB",
                    "Department",
                    "Sub Domain",
                    "Employed",
                    "Location",
                    "Actions",
                  ].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {getOperatorksHook?.getOperators?.length > 0 ? (
                  getOperatorksHook?.getOperators
                    ?.slice()
                    ?.reverse()
                    ?.map(
                      (
                        {
                          firstName,
                          lastName,
                          airForceAfSoc,
                          EOD,
                          currentlyEmployed,
                          location,
                          DOB,
                          _id,
                        },
                        key
                      ) => {
                        const className = `py-3 px-5 ${
                          key === getOperatorksHook?.getOperators?.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;

                        return (
                          <tr key={_id}>
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <div>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-semibold"
                                  >
                                    {firstName + " " + lastName}
                                  </Typography>
                                </div>
                              </div>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {DOB.slice(0, 10)}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {airForceAfSoc}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600 uppercase">
                                {EOD}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Chip
                                variant="gradient"
                                color={
                                  currentlyEmployed === true ? "red" : "green"
                                }
                                value={
                                  currentlyEmployed === true ? "Yes" : "No"
                                }
                                className="py-0.5 px-2 text-[11px] font-medium w-fit"
                              />
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600 uppercase">
                                {location}
                              </Typography>
                            </td>
                            <td
                              className={className}
                              style={{ display: "flex", gap: "6px" }}
                            >
                              <Typography
                                as="a"
                                href="#"
                                className="text-xs font-semibold text-blue-gray-600"
                                onClick={() =>
                                  handleOpenViewModal({
                                    firstName,
                                    lastName,
                                    airForceAfSoc,
                                    EOD,
                                    currentlyEmployed,
                                    location,
                                    DOB,
                                    _id,
                                  })
                                }
                              >
                                <MdVisibility className="h-4 w-4" />
                              </Typography>
                              <Typography
                                as="a"
                                href="#"
                                className="text-xs font-semibold text-blue-gray-600"
                                onClick={() =>
                                  handleOpenEditModal({
                                    firstName,
                                    lastName,
                                    airForceAfSoc,
                                    EOD,
                                    currentlyEmployed,
                                    location,
                                    DOB,
                                    _id,
                                  })
                                }
                              >
                                <MdEdit className="h-4 w-4" />
                              </Typography>
                              <Typography
                                as="a"
                                href="#"
                                className="text-xs font-semibold text-blue-gray-600"
                                onClick={() => handleDelete(_id)}
                              >
                                <MdDelete className="h-4 w-4" />
                              </Typography>
                            </td>
                          </tr>
                        );
                      }
                    )
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-3 px-5 text-center text-blue-gray-500"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardBody>
        )}
      </Card>

      {openEditModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 uppercase">
              Edit {selectedUser.firstName + " " + selectedUser.lastName}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={selectedUser.firstName + " " + selectedUser.lastName}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    firstName: e.target.value.split(" ")[0],
                    lastName: e.target.value.split(" ")[1],
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                DOB
              </label>
              <input
                type="text"
                value={selectedUser.DOB}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, DOB: e.target.value })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                className="w-full mt-5 py-2 bg-[#152252] border text-[#fff] rounded text-[#9ca3af] pl-2"
                value={selectedBranch}
                onChange={handleBranchChange}
              >
                <option value="AirForce">Air Force AFSOC</option>
                <option value="Army">Army USASOC</option>
                <option value="Marines">Marines MARSOC</option>
                <option value="Navy">Navy NSW NSO</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Sub Domain
              </label>
              <select
                className="w-full mt-5 py-2 bg-[#152252] border text-[#fff] rounded text-[#9ca3af] pl-2"
                value={selectedUser.EOD}
                onChange={handleSubDomainChange}
              >
                {branchOptions?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Employed
              </label>
              <input
                type="checkbox"
                checked={selectedUser.currentlyEmployed}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    currentlyEmployed: e.target.checked,
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={selectedUser.location}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, location: e.target.value })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                color="red"
                variant="outlined"
                onClick={handleCloseEditModal}
                size="sm"
              >
                Cancel
              </Button>
              <Button color="green" onClick={handleSaveChanges} size="sm">
                {getOperatorksHook.loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {openViewModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 uppercase">
              View {selectedUser.firstName + " " + selectedUser.lastName}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={selectedUser.firstName + " " + selectedUser.lastName}
                readOnly
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                DOB
              </label>
              <input
                type="text"
                value={selectedUser.DOB}
                readOnly
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                value={selectedUser.airForceAfSoc}
                readOnly
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Sub Domain
              </label>
              <input
                type="text"
                value={selectedUser.EOD}
                readOnly
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Employed
              </label>
              <input
                type="checkbox"
                checked={selectedUser.currentlyEmployed}
                readOnly
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={selectedUser.location}
                readOnly
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="flex justify-end">
              <Button color="blue" onClick={handleCloseViewModal} size="sm">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Operator;
