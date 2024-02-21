export enum Role {
  admin = 'ADMIN',
  doctor = 'DOCTOR',
  patient = 'PATIENT',
}
export enum Gender {
  male = 'MALE',
  female = 'FEMALE',
  other = 'OTHER',
}

export enum Status {
  pending = 'PENDING',
  confirmed = 'CONFIRMED',
  inprogress = 'IN_PROGRESS',
  completed = 'COMPLETED',
  cancelByDoctor = 'CANCELED_BY_DOCTOR',
  cancelByPatient = 'CANCELED_BY_PATIENT',
}
