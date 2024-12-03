import Pusher from "pusher-js";

const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY as string;
const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string;

export const pusherClient = new Pusher(pusherKey, {
  cluster: pusherCluster,
});
