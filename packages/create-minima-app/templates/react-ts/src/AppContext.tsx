import { createContext, useRef, useEffect, useState } from "react";
import { MDS } from "@minima-global/mds";

export const appContext = createContext<{ loaded: boolean }>({ loaded: false });

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const initialised = useRef(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!initialised.current) {
      initialised.current = true;

      MDS.init((msg) => {
        console.log(msg);

        if (msg.event === "inited") {
          setLoaded(true);
        }
      });
    }
  }, []);

  const context = {
    loaded
  };

  return (
    <appContext.Provider value={context}>
      {children}
    </appContext.Provider>
  );
};

export default AppProvider;
