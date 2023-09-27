import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebaseConfig/config";
import { TBL_PRODUCT } from "../../utils/Const";
import { setProductList } from "./ProductSlice";

export const addProductAction =
  ({ slug, ...rest }) =>
  async (dispatch) => {
    try {
      const productPromise = setDoc(doc(db, TBL_PRODUCT, slug), rest, {
        merge: true,
      });
      toast.promise(productPromise, {
        pending: "In Progress...",
        error: "Error...",
        success: "Successfully Saved",
      });
      await productPromise;
      dispatch(fetchProductsAction());
    } catch (e) {
      console.log("error", e);
      toast.error("Error", e.message);
    }
  };

export const fetchProductsAction = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, TBL_PRODUCT));
    const productList = [];
    querySnapshot.forEach((doc) => {
      const slug = doc.id;
      const data = doc.data();
      productList.push({
        ...data,
        slug,
      });
    });
    dispatch(setProductList(productList));
  } catch (e) {
    toast.error(e.message);
  }
};

export const deleteProductAction = (slug) => async (dispatch) => {
  try {
    const deletePromise = deleteDoc(doc(db, TBL_PRODUCT, slug));
    toast.promise(deletePromise, {
      pending: "In Progress...",
      error: "Error...",
      success: "Successfully Removed",
    });
    await deletePromise;
    dispatch(fetchProductsAction());
  } catch (error) {}
};