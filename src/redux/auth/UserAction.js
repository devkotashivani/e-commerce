
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig/config";
import { toast } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { setUser } from "./UserSlice";

export const createNewAdminUser = (userInfo) => async (dispatch) => {
    try {
      
      // 1. use firebase auth to createUser
      const resPending = createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      );
      toast.promise(resPending, {
        pending: "In Progress...",
      });
  
      const { user } = await resPending;

      // 2. Use firebase storage to save the user info in DB
      console.log(user)
  
      const { email, phone, fName, lName } = userInfo;
      const data = { email, phone, fName, lName };
      await setDoc(doc(db, "users", user.uid), data);

      toast.success("New User Registered")
  
      
    } catch (e) {
      toast.error("Error", e.message);
      
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
      console.log(authSnapPromise)
      const { user } = await authSnapPromise;
      console.log(user)
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

