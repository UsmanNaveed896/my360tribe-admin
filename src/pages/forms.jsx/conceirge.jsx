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
import { useGetConciergeHook } from "@/hooks/useGetConciergeHook";

const Concierge = () => {
  const concierge = useGetConciergeHook();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    concierge.handleGetConcierge();
    if(concierge.loginResponse){
      handleCloseEditModal()
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
    console.log(selectedUser, "users");
    concierge.handleEditConciergeForm(selectedUser);
  };

  const handleDelete = (id) => {
    concierge.handleDelete(id);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
          Conceirge
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
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {[
                    "Full Name",
                    "DOB",
                    "Branch of Service",
                    "Contact Method",
                    "Source",
                    "Reason",
                    "No of Hr/Operators",
                    "Organization",
                    "Support Areas",
                    "Topics",
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
                {concierge.getConcierge?.length > 0 ? (
                  concierge.getConcierge
                    ?.slice()
                    ?.reverse()
                    ?.map(
                      (
                        {
                          fullName,
                          phone,
                          email,
                          branchOfService,
                          contactMethod,
                          howHeardAboutUs,
                          DOB,
                          _id,
                          whyConcierge,
                          hoursPerMonth,
                          numberOfOperators,
                          transitionServices,
                          recommendedTransitionServices,
                          areasOfSupport,
                          uncomfortableTopics,
                        },
                        key
                      ) => {
                        const className = `py-3 px-5 ${
                          key === concierge.getConcierge.length - 1
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
                                    className="font-semibold text-xs"
                                  >
                                    {fullName}
                                  </Typography>
                                  <p className="text-xs">{email}</p>
                                  <p className="text-xs">{phone}</p>
                                </div>
                              </div>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs  text-blue-gray-600">
                                {DOB.slice(0, 10)}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs  text-blue-gray-600">
                                {branchOfService}
                              </Typography>
                            </td>
                            <td className={className}>
                              <div className="flex justify-start">
                                <Typography className="text-xs  text-blue-gray-600 ">
                                  {contactMethod}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs  text-blue-gray-600 ">
                                {howHeardAboutUs}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs  text-blue-gray-600 ">
                                {whyConcierge}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs  text-blue-gray-600 ">
                                {hoursPerMonth} / {numberOfOperators}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs  text-blue-gray-600 ">
                                {transitionServices}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs  text-blue-gray-600 ">
                                {recommendedTransitionServices}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs  text-blue-gray-600 ">
                                {uncomfortableTopics}
                              </Typography>
                            </td>
                            <td
                              className={className}
                              style={{ display: "flex", gap: "6px" }}
                            >
                              <Typography
                                as="a"
                                href="#"
                                className="text-xs  text-blue-gray-600"
                                onClick={() => handleOpenViewModal({
                                  fullName,
                                  phone,
                                  email,
                                  branchOfService,
                                  contactMethod,
                                  howHeardAboutUs,
                                  DOB,
                                  _id,
                                  whyConcierge,
                                  hoursPerMonth,
                                  numberOfOperators,
                                  transitionServices,
                                  recommendedTransitionServices,
                                  areasOfSupport,
                                  uncomfortableTopics,
                                })}
                              >
                                <MdVisibility className="h-4 w-4" />
                              </Typography>
                              <Typography
                                as="a"
                                href="#"
                                className="text-xs font-semibold text-blue-gray-600"
                                onClick={() => handleOpenEditModal({
                                  fullName,
                                  phone,
                                  email,
                                  branchOfService,
                                  contactMethod,
                                  howHeardAboutUs,
                                  DOB,
                                  _id,
                                  whyConcierge,
                                  hoursPerMonth,
                                  numberOfOperators,
                                  transitionServices,
                                  recommendedTransitionServices,
                                  areasOfSupport,
                                  uncomfortableTopics,
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
          </div>
        </CardBody>
        
        )}
      </Card>

      {openEditModal && selectedUser && (
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
         <h2 className="text-xl font-bold mb-4 uppercase">
           Edit {selectedUser.fullName}
         </h2>
         <div className="mb-4">
           <label className="block text-sm font-medium text-gray-700">
             Full Name
           </label>
           <Input
             type="text"
             value={selectedUser.fullName}
             onChange={(e) =>
               setSelectedUser({
                 ...selectedUser,
                 fullName: e.target.value,
               })
             }
             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
           />
         </div>
         <div className="mb-4">
           <label className="block text-sm font-medium text-gray-700">
             DOB
           </label>
           <Input
             type="text"
             value={selectedUser.DOB.slice(0, 10)}
             onChange={(e) =>
               setSelectedUser({ ...selectedUser, DOB: e.target.value })
             }
             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
           />
         </div>
         <div className="mb-4">
           <label className="block text-sm font-medium text-gray-700">
             Branch of Service
           </label>
           <Input
             type="text"
             value={selectedUser.branchOfService}
             onChange={(e) =>
               setSelectedUser({
                 ...selectedUser,
                 branchOfService: e.target.value,
               })
             }
             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
           />
         </div>
         <div className="mb-4">
           <label className="block text-sm font-medium text-gray-700">
             Contact Method
           </label>
           <Input
             type="text"
             value={selectedUser.contactMethod}
             onChange={(e) =>
               setSelectedUser({
                 ...selectedUser,
                 contactMethod: e.target.value,
               })
             }
             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
           />
         </div>
         <div className="mb-4">
           <label className="block text-sm font-medium text-gray-700">
             Source
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
             Reason
           </label>
           <Input
             type="text"
             value={selectedUser.whyConcierge}
             onChange={(e) =>
               setSelectedUser({
                 ...selectedUser,
                 whyConcierge: e.target.value,
               })
             }
             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
           />
         </div>
         <div className="mb-4">
           <label className="block text-sm font-medium text-gray-700">
             No of Hours/Operators
           </label>
           <Input
             type="text"
             value={selectedUser.hoursPerMonth}
             onChange={(e) =>
               setSelectedUser({
                 ...selectedUser,
                 hoursPerMonth: e.target.value,
               })
             }
             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
           />
           <Input
             type="text"
             value={selectedUser.numberOfOperators}
             onChange={(e) =>
               setSelectedUser({
                 ...selectedUser,
                 numberOfOperators: e.target.value,
               })
             }
             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
           />
         </div>
         <div className="mb-4">
           <label className="block text-sm font-medium text-gray-700">
             Organization
           </label>
           <Input
             type="text"
             value={selectedUser.transitionServices}
             onChange={(e) =>
               setSelectedUser({
                 ...selectedUser,
                 transitionServices: e.target.value,
               })
             }
             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
           />
         </div>
         <div className="mb-4">
           <label className="block text-sm font-medium text-gray-700">
             Support Areas
           </label>
           <Input
             type="text"
             value={selectedUser.recommendedTransitionServices}
             onChange={(e) =>
               setSelectedUser({
                 ...selectedUser,
                 recommendedTransitionServices: e.target.value,
               })
             }
             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
           />
         </div>
         <div className="mb-4">
           <label className="block text-sm font-medium text-gray-700">
             Topics
           </label>
           <Input
             type="text"
             value={selectedUser.uncomfortableTopics}
             onChange={(e) =>
               setSelectedUser({
                 ...selectedUser,
                 uncomfortableTopics: e.target.value,
               })
             }
             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
           />
         </div>
         <div className="flex justify-end">
           <Button onClick={handleSaveChanges} className="mr-2" disabled={concierge.loading}>
           {concierge.loading ? "Saving..." : "Save Changes"}  
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
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 uppercase">
              Viewing {selectedUser.fullName}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <p className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                {selectedUser.fullName}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                DOB
              </label>
              <p className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                {selectedUser.DOB.slice(0, 10)}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Branch of Service
              </label>
              <p className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                {selectedUser.branchOfService}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Contact Method
              </label>
              <p className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                {selectedUser.contactMethod}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Source
              </label>
              <p className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                {selectedUser.howHeardAboutUs}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Reason
              </label>
              <p className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                {selectedUser.whyConcierge}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                No of Hours/Operators
              </label>
              <p className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                {selectedUser.hoursPerMonth} / {selectedUser.numberOfOperators}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Organization
              </label>
              <p className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                {selectedUser.transitionServices}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Support Areas
              </label>
              <p className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                {selectedUser.recommendedTransitionServices}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Topics
              </label>
              <p className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                {selectedUser.uncomfortableTopics}
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

export default Concierge;
