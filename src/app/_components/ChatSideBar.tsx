import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ChatSideBar = () => {
  return (
    <aside className="">
      <Card className=' h-[80%]'>
        <CardHeader>
          <CardTitle>Live Chat</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8">
        <div className="p-4">
            {/* Add your live chat component here */}
            <p>Live chat messages will appear here...</p>
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}

export default ChatSideBar