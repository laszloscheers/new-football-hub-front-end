"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { CornerDownLeft, Menu, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SignUpBanner from './_components/SignUpBanner';
import { ChatInput } from './_components/ChatInput';
import Pusher from 'pusher-js';

const ChatSideBar = () => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
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

  const ChatContent = () => (
    <>
      <SignUpBanner />
      <Card className='mt-4 h-[60vh]'>
        <CardHeader>
          <CardTitle>Live Chat</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8">
          <div className='grid gap-4'>
            {messages && messages.map((message, index) => (
              <div key={index} className='grid gap-1'>
                <p className="text-sm font-medium leading-none text-right">{message.message}</p>
                <p className="text-sm text-muted-foreground text-right">
                  {message.username}
                </p>
              </div>
            ))}
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
    </>
  );

  return (
    <>
      <div className="2xl:hidden fixed bottom-4 right-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="rounded-full shadow-lg">
              <MessageCircle className="h-6 w-6" />
              <span>Open Chat</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-[400px] sm:max-w-lg">
            <ChatContent />
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden 2xl:block">
        <ChatContent />
      </div>
    </>
  )
};

export default ChatSideBar;