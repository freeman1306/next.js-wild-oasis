'use client';

import { updateGuest } from '@/app/_lib/actions';
import { useFormStatus } from 'react-dom';
import SubmitButton from './SubmitButton';

function UpdateProfileForm({ guest, children }) {
  const { fullName, email, nationality, nationalID, countryFlag } = guest;

  return (
    <form
      action={updateGuest}
      className="bg-primary-900 lg:py-8 lg:px-12 md:py-8 py-6 md:px-10 sm:px-8 px-6 text-lg flex md:gap-6 gap-4 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          defaultValue={fullName}
          name="fullName"
          className="md:px-5 md:py-3 px-3 py-2 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          defaultValue={email}
          name="email"
          className="md:px-5 md:py-3 px-3 py-2 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img
            src={countryFlag}
            alt="Country flag"
            className="md:h-5 h-3 rounded-sm"
          />
        </div>
        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          defaultValue={nationalID}
          name="nationalID"
          className="md:px-5 md:py-3 px-3 py-2 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center md:gap-6 gap-4">
        <SubmitButton pendingLabel="Updating...">
          Update reservation
        </SubmitButton>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
