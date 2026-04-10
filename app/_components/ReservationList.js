'use client';

import { useOptimistic } from 'react';
import ReservationCard from './ReservationCard';
import { deleteBooking } from '../_lib/actions';

function ReservationList({ bookings }) {
  const [optmisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currBookings, bookingId) => {
      return currBookings.filter((booking) => booking.id !== bookingId);
    },
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }
  return (
    <ul className="space-y-6">
      {optmisticBookings.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
