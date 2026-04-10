'use server';

import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';
import { supabase } from './supabase';
import { getBookings } from './data-service';
import { redirect } from 'next/navigation';

export async function updateProfile(formData) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData.get('nationality').split('%');

  if (!/^[A-Za-z0-9]{6,12}$/.test(nationalID)) {
    throw new Error('Invalid national ID');
  }

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.questId);

  if (error) {
    throw new Error('Guest could not be updated');
  }
  revalidatePath('/account/profile');
}

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuest: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 500), // Limit observations to 500 chars
    extrasPrice: 0, // Calculate extras price based on formData if needed
    totalPrice: bookingData.cabinPrice, // Calculate total price based on base price and extras
    isPaid: false,
    hasBreakfast: false, // Set to true if breakfast is included based on formData
    status: 'unconfirmed',
  };

  const { error } = await supabase.from('bookings').insert([newBooking]);

  if (error) {
    throw new Error('Booking could not be created');

    revalidatePath(`/cabins/${bookingData.cabinId}`);

    redirect('/cabins/thankyou');
  }
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId)) {
    throw new Error('Unauthorized to delete this booking');
  }

  const { data, error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  revalidatePath('/account/reservations');
}

export async function updateBooking(formData) {
  const session = await auth();
  console.log(session.user, formData);

  if (!session) throw new Error('Unauthorized');
  const bookingId = Number(formData.get('bookingId'));

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId)) {
    throw new Error('Unauthorized to update this booking');
  }

  const updateData = {
    numGuest: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 500), // Limit observations to 500 chars
  };

  const { data, error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', bookingId)
    .select()
    .single();

  if (error) {
    throw new Error('Booking could not be updated');
  }

  revalidatePath(`'/account/reservations/edit/'${bookingId}`);
  revalidatePath('/account/reservations');

  redirect('/account/reservations');
}
