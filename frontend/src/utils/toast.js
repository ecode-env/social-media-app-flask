import { toast } from 'react-toastify';

export const notifySuccess = (message = 'Operation successful') => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
  });
};

export const notifyError = (message = 'Something went wrong') => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
  });
};
