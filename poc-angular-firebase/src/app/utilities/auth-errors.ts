import { FirebaseError } from "@angular/fire/app";

export const getFirebaseErrorMessage = (error: FirebaseError): string => {
  let message;
  console.log(error.code)
  switch (error.code) {
    case 'auth/wrong-password':
      message = 'Your password is incorrect'
      break;
    case 'auth/invalid-credential':
      message = 'Invalid creadentials'
      break;
    case 'auth/user-not-found':
      message = 'The user was not found'
      break;
    case 'auth/email-already-in-use':
      message = 'The user with email already exists'
      break;
    default:
      message = 'An unexpected error occured. Please contact system administrator'
  }

  return message;
}