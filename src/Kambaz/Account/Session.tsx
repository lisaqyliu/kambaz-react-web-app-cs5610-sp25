import * as client from "./client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (err: any) {
      if (err.response?.status === 403 || err.response?.status === 401) {
        console.log("Not logged in — skipping session init.");
      } else {
        console.error("Session fetch error:", err);
      }
    } finally {
      setPending(false); 
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (pending) return null;

  return children;
}
