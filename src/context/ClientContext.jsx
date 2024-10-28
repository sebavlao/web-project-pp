import { createContext, useState } from "react";

export const ClientContext = createContext();

export default function ClientProvider ({ children }) {
   //1-
  const [updProfile, setUpdProfile] = useState(false);
  //2-
  const [updJobs, setUpdJobs] = useState(false);
  //3-
  const [updModal, setUpdModal] = useState(false);
  //4-
  const [jobIdModal, setJobIdModal] = useState(false);

  return <ClientContext.Provider 
        value={{
            // 1- Variables for update profile section
            updProfile,
            setUpdProfile,

            // 2- Variables for update section of jobs
            updJobs,
            setUpdJobs,

            //3- Variables for update modal of single job
            updModal,
            setUpdModal,

            //4- Variables for set job id of modal
            jobIdModal,
            setJobIdModal
        }}>
            {children}
        </ClientContext.Provider>;
};
