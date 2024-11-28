"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SignUpBanner from './_components/SignUpBanner';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { CornerDownLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatInput } from './_components/ChatInput';
import Pusher from 'pusher-js';

const ChatSideBar = () => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatInput, setChatInput] = useState('');
  let allMessages = [];

  useEffect(() => {
    // Enable pusher logging - don't include this in production
    // Pusher.logToConsole = true;

    // const pusher = new Pusher('', {
    //   cluster: '',
    // });

    // var channel = pusher.subscribe('chat');
    // channel.bind('message', function(data: { message: string; username: string }) {
    //   allMessages.push(data);
    //   setMessages(allMessages);
    // });
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await fetch('', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
      body: JSON.stringify({
        username: session?.user?.name,
        message: chatInput 
      }),
    });
    setIsLoading(false);
    setChatInput('');
  };

  return (
    <aside>
      <SignUpBanner />
      <Card className='mt-4 h-[60vh]'>
        <CardHeader>
          <CardTitle>Live Chat</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8">
            <div className='grid gap-4'>
            {messages && messages.map((message) => {
              return (
                <div className='grid gap-1'>
                  <p className="text-sm font-medium leading-none text-right">{message.message}</p>
                  <p className="text-sm text-muted-foreground text-right">
                    {message.username}
                  </p>
                </div>
              )
            })
            }
            <form
              onSubmit={submit}
              className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
            >
              <ChatInput
                value={chatInput}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setChatInput(e.target.value)}
                placeholder="Type your message here..."
                className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
              />
              <div className="flex items-center p-3 pt-0">
                <Button
                  disabled={isLoading}
                  type="submit"
                  size="sm"
                  className="ml-auto gap-1.5"
                >
                  Send Message
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}

export default ChatSideBar;