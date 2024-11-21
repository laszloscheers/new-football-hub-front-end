import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const AddsSideBar = () => {
  return (
    <aside>
      <Card>
        <CardHeader>
          <CardTitle>Advertisements</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8">
        <div className="p-4 space-y-4">
            <Card>
              <CardContent className="p-4">
                <Image src="" alt="Ad 1" width={200} height={200} />
                <p className="mt-2 text-center text-gray-300">Advertisement 1</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Image src="" alt="Ad 2" width={200} height={200} />
                <p className="mt-2 text-center text-gray-300">Advertisement 2</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}

export default AddsSideBar;