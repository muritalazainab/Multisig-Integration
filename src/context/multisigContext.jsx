import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
  } from "react";
  import useContractInstance from "../hook/useContractInstance";
  import { Contract } from "ethers";
  import ABI from "../ABI/multisig.json";
  import useSignerOrProvider from "../hook/useSignerOrProvider";
  
  const MultisigContext = createContext({
    multisigs: [],
  });
  export const MultisigContextProvider = ({ children }) => {
    const [multisigs, setMultisig] = useState([]);
    const readOnlyMultisigContract = useContractInstance();
    const { readOnlyProvider } = useSignerOrProvider();
  
    const formatEnum = (value) => {
      const status = Number(value);
      switch (status) {
        case 1:
          return "Created";
        case 2:
          return "Edited";
        case 3:
          return "Completed";
        case 4:
          return "Added";
        // default:
        //   return "Pending";
      }
    };
  
    const getMultisig = useCallback(async () => {
      if (!readOnlyMultisigContract) return;
  
      try {
        const data = await readOnlyMultisigContract.getAllTransaction();
        const formattedMultisigs = data.map((multisig) => ({
          title: multisig.amount,
          receiver: todo.receiver,
          status: formatEnum(multisig.status),
        }));
  
        setMultisigMultisig(formattedMultisigs);
      } catch (error) {
        console.log("Error fetching transaction", error);
      }
    }, [readOnlyMultisigContract]);
  
    useEffect(() => {
      getMultisig();
    }, [getMultisig]);
  
    const multisigCreateHandler = useCallback((amount, receiver, status) => {
      setMultisig((prevState) => [
        ...prevState,
        { amount, receiver, status: formatEnum(status) },
      ]);
    }, []);
  
    useEffect(() => {
      const contract = new Contract(
        import.meta.env.VITE_MULTISIG_CONTRACT_ADDRESS,
        ABI,
        readOnlyProvider
      );
      contract.on("Transaction Created", multisigCreateHandler);
      return () => {
        contract.off("Transaction Created", multisigCreateHandler);
      };
    }, [multisigCreateHandler, readOnlyProvider]);
  
    // updating a particular todo
    const MultisigUpdateHandler = useCallback((index, amount, receiver, status) => {
      setMultisig((prevState) => {
        const updatedMultisigs = [...prevState];
        updatedMultisigs[Number(index)] = {
          amount,
          receiver,
          status: formatEnum(status),
        };
        return updatedMultisigs;
      });
    }, []);
  
    useEffect(() => {
      const contract = new Contract(
        import.meta.env.VITE_MULTISIG_CONTRACT_ADDRESS,
        ABI,
        readOnlyProvider
      );
      contract.on("Transaction Created", MultisigUpdateHandler);
      return () => {
        contract.off("Transaction Created", MultisigUpdateHandler);
      };
    }, [MultisigUpdateHandler, readOnlyProvider]);
  
    // completing a todo
    const multisigCompletionHandler = useCallback((index, status) => {
      setMultisig((prevState) => {
        const updatedMultisigs = [...prevState];
        updatedMultisigs[Number(index)] = {
          ...updatedMultisigs[Number(index)],
          status: formatEnum(status),
        };
        return updatedMultisigs;
      });
    }, []);
  
    useEffect(() => {
      const contract = new Contract(
        import.meta.env.VITE_MULTISIG_CONTRACT_ADDRESS,
        ABI,
        readOnlyProvider
      );
      contract.on("Transaction Completed", multisigCompletionHandler);
      return () => {
        contract.off("Transaction Completed", multisigCompletionHandler);
      };
    }, [multisigCompletionHandler, readOnlyProvider]);
  
    // deleting a todo
    const multisigDeleteHandler = useCallback((index) => {
      setMultisig((prevState) => {
        const updatedMultisigs = [...prevState];
        updatedMultisigs.splice(Number(index), 1);
        return updatedMultisigs;
      });
    }, []);
  
    useEffect(() => {
      const contract = new Contract(
        import.meta.env.VITE_MULTISIG_CONTRACT_ADDRESS,
        ABI,
        readOnlyProvider
      );
      contract.on("Transaction Deleted", multisigDeleteHandler);
      return () => {
        contract.off("Transaction Deleted", multisigDeleteHandler);
      };
    }, [multisigDeleteHandler, readOnlyProvider]);
  
    return (
      <MultisigContextProvider value={{ multisigs }}>
  {children}
      </MultisigContextProvider>
     
     
    );
  };
  
  // eslint-disable-next-line react-refresh/only-export-components
  export const useMultisig = () => {
    const context = useContext(MultisigContext);
    return context;
  };
  