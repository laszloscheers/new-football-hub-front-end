import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SignUpBanner from './_components/SignUpBanner';

const ChatSideBar = () => {
  return (
    <aside>
      <SignUpBanner />
      <Card className='mt-4 h-[40%]'>
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