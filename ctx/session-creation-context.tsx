import { create } from "zustand";

type SessionCreationState = {
  sessionCreation: [
    {
      client: string;
      machinesSession: [
        {
          name: string;
          start: string;
        }
      ];
    }
  ];
  setSessionCreation: (session: any) => void;
  machinesSession: {
    name: string;
    start: string;
  };
  setMachinesSession: (machinesSession: any) => void;
  sessionClient: [
    {
      id: string;
    }
  ];
  setSessionClient: (client: any) => void;
};

export const useSessionCreation = create<SessionCreationState>((set) => ({
  sessionCreation: [
    {
      client: "",
      machinesSession: [
        {
          name: "",
          start: "",
        },
      ],
    },
  ],
  setSessionCreation: (session) => set({ sessionCreation: session }),
  machinesSession: {
    name: "",
    start: "",
  },

  setMachinesSession: (machinesSession) => set({ machinesSession }),
  sessionClient: [
    {
      id: "",
    },
  ],
  setSessionClient: (client) => set({ sessionClient: client }),
}));
