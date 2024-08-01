// UserModal.js
import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import { useRegisterHook } from '@/hooks/useRegisterHook';

const UserModal = ({ user ,open ,handleOpen ,setOpen}) => {
const data=useRegisterHook();

console.log(data.userResponse,"userss")
  return (
    <>
     
      <Dialog open={open} handler={()=>setOpen(!open)}>
        <DialogHeader>User Information</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col items-center">
            <img
              src={localStorage.getItem('photo')}
              alt="User"
              className="rounded-full w-24 h-24 mb-4"
            />
            <p><strong>Full Name:</strong> {localStorage.getItem('name')}</p>
            <p><strong>Email:</strong> {localStorage.getItem('email')}</p>
            <p><strong>Phone:</strong> {localStorage.getItem('phone')}</p>
            <p><strong>Status:</strong> {localStorage.getItem('status')}</p>
            <p><strong>Role:</strong> {localStorage.getItem('role')}</p>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="outlined" className='shadow-none' onClick={()=>setOpen(!open)}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default UserModal;
