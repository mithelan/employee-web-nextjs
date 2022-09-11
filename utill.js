import { isArray } from "lodash";
import Notiflix from "notiflix";
import { Notify } from "notiflix/build/notiflix-notify-aio";

export default function getGender(type) {
  switch (type) {
    case "M":
      return "Male";
      break;
    case "F":
      return "Female";
      break;
    default:
      break;
  }
}

export const authMsg = (type, data) => {
  let msg,
    title = null;
  if (isArray(data)) {
    const [message, heading] = data;
    msg = message;
    title = heading;
  } else {
    msg = data;
  }
  switch (type) {
    case "info":
      Notiflix.Notify.info(msg, {
        timeout: 2000,
      });
      break;
    case "success":
      Notiflix.Notify.success(msg, {
        timeout: 2000,
      });
      break;
    case "warning":
      Notiflix.Notify.warning(msg, {
        timeout: 2000,
      });
      break;
    case "error":
      Notiflix.Notify.failure(msg, {
        timeout: 2000,
      });
      break;
    default:
      break;
  }
};

export const getCommonError = (errorResponse) => {
  try {
    const errorData = errorResponse.response;

    if (!errorData) {
      return "Oops, Something went wrong!";
    }

    if (errorData.data.message) {
      return errorData.data.message;
    }

    if (errorData.status) {
      if (errorData.status === 400) {
        return "Your entered value is not valid or required, Please check again!";
      } else if (errorData.status === 401) {
        return [
          "You were idle too long. You'll need to login again.",
          "You've Timed Out!",
        ];
      } else if (errorData.status === 403) {
        return (
          errorData.data.message ||
          "You don't have permission to make this call"
        );
      } else if (errorData.status === 404) {
        return "Sorry, Record not found";
      } else if (errorData.status === 405) {
        return "Request is not allowed";
      } else if (errorData.status === 500) {
        return "Oops, Something went wrong!";
      } else {
        return "Oops, Something went wrong!";
      }
    }

    return "Oops, Something went wrong!";
  } catch (error) {
    console.error("getCommonError -> error", error);
    return "Oops, Something went wrong!";
  }
};
