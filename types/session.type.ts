import { Client } from "./client.type";

export type SessionType = {
  id: string;
  client: Client;
  machinesSession: [
    {
      startTime: string | number | Date;
      id: string;
      name: string;
      start: string;
    }
  ];
};
