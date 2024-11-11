import { getPatient } from './getPatient'
import { updatePatient } from './updatePatient'
import { createPatient } from './createPatient'
import { createAppointment } from './createAppointment'
import { getAppointment } from './getAppointment'
import { findAppointments } from './findAppointments'
import { findPhysician } from './findPhysician'
import { createNonVisitNote } from './createNonVisitNote'
import { updateNonVisitNote } from './updateNonVisitNote'
import { getNonVisitNote } from './getNonVisitNote'
import { deleteNonVisitNote } from './deleteNonVisitNote'
import { getPhysician } from './getPhysician'
import { postLetter } from './postLetter'
import { createLabOrder } from './createLabOrder'
import { createMessageThread } from './createMessageThread'
import { addHistories } from './addHistories/addHistories'
import { addAllergy } from './addAllergy/addAllergy'

export const actions = {
  getPatient,
  createPatient,
  updatePatient,
  createAppointment,
  getAppointment,
  findAppointments,
  getPhysician,
  findPhysician,
  createNonVisitNote,
  updateNonVisitNote,
  getNonVisitNote,
  deleteNonVisitNote,
  postLetter,
  createLabOrder,
  createMessageThread,
  addHistories,
  addAllergy,
}
