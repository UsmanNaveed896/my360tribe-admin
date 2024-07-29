import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { useGetUsersHook } from "@/hooks/useGetUsersHook";
import { MdDelete, MdEdit } from "react-icons/md";
import { Puff } from "react-loader-spinner";

const Concierge = () => {
  const usersHook = useGetUsersHook();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    usersHook.handleGetUsers();
    if (usersHook.loginResponse) {
      handleCloseEditModal();
    }
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
  };

  const handleDelete = (id) => {
    usersHook.handleDelete(id);
  };
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Concierge
          </Typography>
        </CardHeader>
        {usersHook.loading ? (
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
          <CardBody className="overflow-auto px-0 pt-0 pb-2  ">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Full Name", "Phone", "Status", "Role", "Actions"].map(
                    (el) => (
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
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {usersHook?.users?.filter(({ role }) => role === "concierge")
                  .length > 0 ? (
                  usersHook?.users
                    ?.filter(({ role }) => role === "concierge")
                    ?.slice()
                    ?.reverse()
                    ?.map(
                      (
                        { photo, fullName, email, status, phone, role, _id },
                        key
                      ) => {
                        const className = `py-3 px-5 ${
                          key === usersHook?.users?.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;

                        const photoUrl = photo.startsWith("http://")
                          ? photo.replace("http://", "https://")
                          : photo;

                        return (
                          <tr key={_id}>
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <Avatar
                                  src={photoUrl}
                                  alt={fullName}
                                  size="sm"
                                  variant="rounded"
                                />
                                <div>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-semibold"
                                  >
                                    {fullName}
                                  </Typography>
                                  <Typography className="text-xs font-normal text-blue-gray-500">
                                    {email}
                                  </Typography>
                                </div>
                              </div>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {phone}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Chip
                                variant="gradient"
                                color={
                                  status === "inactive"
                                    ? "red"
                                    : status === "pending"
                                    ? "blue"
                                    : "blue-gray"
                                }
                                value={
                                  status === "inactive"
                                    ? "inactive"
                                    : status === "pending"
                                    ? "pending"
                                    : "active"
                                }
                                className="py-0.5 px-2 text-[11px] font-medium w-fit"
                              />
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600 uppercase">
                                {role}
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
                                  handleOpenEditModal({
                                    _id,
                                    photo,
                                    fullName,
                                    email,
                                    status,
                                    phone,
                                    role,
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
                      colSpan="5"
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
              Edit {selectedUser.fullName}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={selectedUser.fullName}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, fullName: e.target.value })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                value={selectedUser.phone}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, phone: e.target.value })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <input
                type="text"
                value={selectedUser.role}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, role: e.target.value })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, status: e.target.value })
                }
                value={selectedUser.status}
              >
                {/* <option value="active">Active</option> */}
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
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
                {usersHook.loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Concierge;
