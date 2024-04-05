import axios from "axios";
import { propertyDetailsAction } from "./propertyDetails-slice";

export const getPropertyDetails = (id) => async (dispatch) => {
  try {
    dispatch(propertyDetailsAction.getListRequest());
    const response = await axios(`/api/v1/rent/listing/${id}`); //by default axios takes get command, .get not necessary,,, if any other command we have to write .post, .put, .patch etc

    if (!response) {
      throw new Error("Could not fetch any property details.....");
    }

    const { data } = response.data;
    dispatch(propertyDetailsAction.getPropertyDetails(data));
  } catch (error) {
    dispatch(propertyDetailsAction.getErrors(error.response.data.error));
  }
};
