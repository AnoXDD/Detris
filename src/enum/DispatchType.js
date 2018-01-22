/**
 * Created by Anoxic on 1/11/2018.
 *
 * An enum class to show the kind of dispatch, if it's instant or if it needs
 * to wait, etc.
 */


const DispatchType = {
  // A regular dispatch, can be instant or delayed
  REGULAR      : "REGULAR",
  ON_CLEAR     : "ON_CLEAR",
  ONLY_IF_CLEAR: "ONLY_IF_CLEAR",
  // Overwrite future payloads and dispatch instantly
  OVERWRITE    : "OVERWRITE",
};

export default DispatchType;
