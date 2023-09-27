import { auth, db } from "../../firebaseConfig/config";
import { toast } from "react-toastify";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { setCategoryList } from "./CategorySlice";
import { setModalShow } from "../systemState/systemSlice";
import { TBL_CATEGORY } from "../../utils/Const";

export const addCategoryAction =
  ({ slug, ...rest }) =>
  async (dispatch) => {
    try {
      // 2. Use firebase storage to save the user info in DB

      const catPromise = setDoc(doc(db, "categories", slug), rest);
      toast.promise(catPromise, {
        pending: "In Progress...",
        error: "Error Occured",
        success: "Successfully saved",
      });
      dispatch(fetchCategoryAction())
    } catch (e) {
      toast.error("Error", e.message);
    }
  };

// get categories from firebase and store it in redux
export const fetchCategoryAction = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, TBL_CATEGORY));
    const catList = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const slug = doc.id;
      const data = doc.data()
      catList.push({
        ...data,
        slug
      })
      
    });
    dispatch(setCategoryList(catList))

  } catch (e) {
    toast.error(e.message);
  }
};

export const deleteCategory = (slug) => async(dispatch)=>{
  try{
    const deletePromise = deleteDoc(doc(db,TBL_CATEGORY, slug))
    toast.promise(deletePromise, {
      pending: "In Progress...",
      error: "Error Occured",
      success: "Successfully deleted",
    });
    await deletePromise
    dispatch(setModalShow(false))
    dispatch(fetchCategoryAction())
  } catch (e) {
    toast.error("Error", e.message);
  }
 
}