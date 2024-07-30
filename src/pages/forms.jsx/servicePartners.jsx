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
import { Puff } from "react-loader-spinner";

import { useServicePartnerHook } from "@/hooks/useServicePartners";

const ServicePartners = () => {
  const getService = useServicePartnerHook();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getService.handleGetServicePartner();
    if(getService.loginResponse){
      handleCloseEditModal()
        }
  }, [getService.loginResponse]);

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
    console.log(selectedUser, "users");
    getService.handleEditServicePartnerForm(selectedUser);
  };

  const handleDelete = (id) => {
    getService.handleDelete(id);
  };
  console.log(getService?.getServicePartner,"kio")
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Organizations
          </Typography>
        </CardHeader>
        {getService?.loading ? (
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
                    "Organization Name",
                    "Phone",
                    "Address",
                    "Website",
                    "Point of Contact",
                    "Point of Contact Email",
                    "How Heard About Us",
                    "Veteran Specific Services",
                    "Services Provided",
                    "Description",
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
                {getService?.getServicePartner?.length > 0 ? (
                  getService?.getServicePartner
                    ?.slice()
                    ?.reverse()
                    ?.map(
                      (
                        {
                          organizationName,
                          phone,
                          address,
                          websiteUrl,
                          pointOfContactName,
                          pointOfContactEmail,
                          howHeardAboutUs,
                          veteranSpecificServices,
                          servicesProvided,
                          description,
                          _id,
                        },
                        key
                      ) => {
                        const className = `py-3 px-5 ${
                          key === getService?.getServicePartner.length - 1
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
                                    {organizationName}
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
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {address}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                                  {websiteUrl}
                                </a>
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {pointOfContactName}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {pointOfContactEmail}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600 uppercase">
                                {howHeardAboutUs}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600 uppercase">
                                {veteranSpecificServices}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600 uppercase">
                                {servicesProvided}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600 uppercase">
                                {description}
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
                                onClick={() => handleOpenViewModal({
                                  organizationName,
                                  phone,
                                  address,
                                  websiteUrl,
                                  pointOfContactName,
                                  pointOfContactEmail,
                                  howHeardAboutUs,
                                  veteranSpecificServices,
                                  servicesProvided,
                                  description,
                                  _id,
                                })}
                              >
                                <MdVisibility className="h-4 w-4" />
                              </Typography>
                              <Typography
                                as="a"
                                href="#"
                                className="text-xs font-semibold text-blue-gray-600"
                                onClick={() => handleOpenEditModal({
                                  organizationName,
                                  phone,
                                  address,
                                  websiteUrl,
                                  pointOfContactName,
                                  pointOfContactEmail,
                                  howHeardAboutUs,
                                  veteranSpecificServices,
                                  servicesProvided,
                                  description,
                                  _id,
                                })}
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
                      colSpan="11"
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
              Edit {selectedUser.organizationName}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Organization Name
              </label>
              <Input
                type="text"
                value={selectedUser.organizationName}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    organizationName: e.target.value,
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <Input
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
                Address
              </label>
              <Input
                type="text"
                value={selectedUser.address}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    address: e.target.value,
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Website
              </label>
              <Input
                type="text"
                value={selectedUser.websiteUrl}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    websiteUrl: e.target.value,
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Point of Contact
              </label>
              <Input
                type="text"
                value={selectedUser.pointOfContactName}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    pointOfContactName: e.target.value,
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Point of Contact Email
              </label>
              <Input
                type="text"
                value={selectedUser.pointOfContactEmail}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    pointOfContactEmail: e.target.value,
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                How Heard About Us
              </label>
              <Input
                type="text"
                value={selectedUser.howHeardAboutUs}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    howHeardAboutUs: e.target.value,
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Veteran Specific Services
              </label>
              <Input
                type="text"
                value={selectedUser.veteranSpecificServices}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    veteranSpecificServices: e.target.value,
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Services Provided
              </label>
              <Input
                type="text"
                value={selectedUser.servicesProvided}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    servicesProvided: e.target.value,
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Input
                type="text"
                value={selectedUser.description}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    description: e.target.value,
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSaveChanges} className="mr-2" disabled={getService.loading}>
              {getService.loading ? "Saving..." : "Save Changes"}  
              </Button>
              <Button onClick={handleCloseEditModal} color="red">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {openViewModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 uppercase">
              Viewing {selectedUser.organizationName}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Organization Name
              </label>
              <p className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                {selectedUser.organizationName}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <p className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                {selectedUser.phone}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <p className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                {selectedUser.address}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Website
              </label>
              <p className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                <a href={selectedUser.websiteUrl} target="_blank" rel="noopener noreferrer">
                  {selectedUser.websiteUrl}
                </a>
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Point of Contact
              </label>
              <p className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                {selectedUser.pointOfContactName}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Point of Contact Email
              </label>
              <p className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                {selectedUser.pointOfContactEmail}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                How Heard About Us
              </label>
              <p className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                {selectedUser.howHeardAboutUs}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Veteran Specific Services
              </label>
              <p className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                {selectedUser.veteranSpecificServices}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Services Provided
              </label>
              <p className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                {selectedUser.servicesProvided}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <p className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                {selectedUser.description}
              </p>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleCloseViewModal} className="mr-2">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicePartners;
