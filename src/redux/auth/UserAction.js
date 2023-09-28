import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase-config";
import { setUser, updateStatus } from "./userSlice";

export const createNewAdminUser = (userInfo) => async (dispatch) => {
  try {
    dispatch(updateStatus({ progress: true, success: false, error: false }));
    // 1. use firebase auth to createUser
    const resPending = createUserWithEmailAndPassword(
      auth,
      userInfo.email,
      userInfo.password
    );

    const { user } = await resPending;

    // 2. Use firebase storage to sae the user info in DB

    const { email, phone, fName, lName } = userInfo;
    const data = { email, phone, fName, lName };
    await setDoc(doc(db, "users", user.uid), data);

    dispatch(updateStatus({ progress: false, success: true, error: false }));
  } catch (e) {
    console.log("error", e);
    // toast.error("Error", e.message);
    dispatch(updateStatus({ progress: false, success: false, error: true }));
  }
};

// Check if valid user trying to login then get user info from db and set userinfo to store
export const loginAdminUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const authSnapPromise = signInWithEmailAndPassword(auth, email, password);
      toast.promise(authSnapPromise, {
        pending: "In Progress...",
      });
      const { user } = await authSnapPromise;
      dispatch(getUserInfo(user.uid));
      toast.success("Login Success");
      //   const userResponse = await authSnapPromise;
      //   dispatch(getUserInfo(userResponse.user.uid));
    } catch (e) {
      toast.error("Login error");
    }
  };

// it grabs the user info from DB and set it to redux store
export const getUserInfo = (uid) => async (dispatch) => {
  try {
    console.log(uid);
    const userSnap = await getDoc(doc(db, "users", uid));
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const updatedUser = { ...userData, uid };
      dispatch(setUser(updatedUser));
    }
  } catch (e) {
    toast.error(e.message);
  }
};
