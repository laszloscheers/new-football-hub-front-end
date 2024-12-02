import Pusher from "pusher-js";

export const pusherClient = new Pusher(process.env.PUSHER_KEY || "", {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "",
});
