'use client';

import { useFormStatus } from 'react-dom';

function SubmitButton({ children, pendingLabel }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

export default SubmitButton;
