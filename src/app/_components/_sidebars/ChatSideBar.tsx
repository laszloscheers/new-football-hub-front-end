"use client"

import React, { useEffect, useState, useTransition } from 'react'
import { useSession } from 'next-auth/react'
import { Send, MessageCircle, LogIn } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import SignUpBanner from './_components/SignUpBanner'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FormError } from '@/components/form-error'
import { LoginButton } from '@/components/auth/login-button'
import { pusherClient } from '@/lib/pusher'

interface Message {
  username: string
  message: string
}

const ChatSideBar = () => {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<Message[]>([])
  const [error, setError] = useState<string | string[] | undefined>("")
  const [isPending, startTransition] = useTransition()
  const [input, setInput] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false)


  useEffect(() => { 
    pusherClient.subscribe('chat');
    
    pusherClient.bind('message', (data: { message: string; username: string }) => {
      setMessages((prev) => [...prev, { username: data.username, message: data.message }]);
    })

    return () => {
      pusherClient.unsubscribe('chat');
    };
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || !session) return
    setError("");

    startTransition(() => {
      fetch('/api/pusher', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: session?.user?.name,
          message: input,
          token: session?.user?.token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setError(data.error)
        })
    })

    setInput('');
  }

  return (
    <>
      <SignUpBanner />
      {/* Mobile/Tablet View */}
      <div className="2xl:hidden fixed bottom-4 right-4 z-50 ">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="rounded-full shadow-lg gap-2">
              <MessageCircle className="h-5 w-5" />
              <span>Chat</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-[400px] p-0">
            <div className="flex flex-col h-full mb-2">
              <div className="px-4 py-3 border-b">
                <h2 className="font-semibold">Live Chat</h2>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex flex-col gap-1",
                        message.username === session?.user?.name ? "items-end" : "items-start"
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-lg px-3 py-2 max-w-[80%]",
                          message.username === session?.user?.name
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        <p className="text-sm break-words">{message.message}</p>
                      </div>
                      <p className="text-xs text-muted-foreground px-2">
                        {message.username}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t p-4">
                {session ? (
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                      placeholder="Type your message here..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="flex-1"
                    />

                    <Button 
                      type="submit" 
                      size="icon"
                      disabled={isPending}
                    >
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </form>
                ) : (
                  <LoginButton mode="modal" asChild>
                    <Button variant="ghost" className="p-0 w-full flex flex-row justify-start pl-2 h-8">
                      <LogIn className="w-3 h-3 mr-2" />
                      Login
                    </Button>
                  </LoginButton>
                )}
              </div>
            </div>
            <FormError message={error as any} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop View */}
      <div className="hidden 2xl:block h-[50vh] mt-2">
        <Card className="h-full">
          <div className="flex flex-col h-full mb-2">
            <div className="px-4 py-3 border-b">
              <h2 className="font-semibold">Live Chat</h2>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex flex-col gap-1",
                      message.username === session?.user?.name ? "items-end" : "items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-lg px-3 py-2 max-w-[80%]",
                        message.username === session?.user?.name
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      <p className="text-sm break-words">{message.message}</p>
                    </div>
                    <p className="text-xs text-muted-foreground px-2">
                      {message.username}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t p-4">
              {session ? (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    placeholder="Type your message here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1"
                  />

                  <Button 
                    type="submit" 
                    size="icon"
                    disabled={isPending}
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </form>
              ) : (
                <LoginButton mode="modal" asChild>
                  <Button variant="ghost" className="p-0 w-full flex flex-row justify-start pl-2 h-8">
                    <LogIn className="w-3 h-3 mr-2" />
                    Login
                  </Button>
                </LoginButton>
              )}
            </div>
          </div>
          <FormError message={error as any} />
        </Card>
      </div>
    </>
  )
}

export default ChatSideBar;