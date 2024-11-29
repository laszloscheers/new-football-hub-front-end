import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const AddsSideBar = () => {
  return (
    <aside>
      <Card>
        <CardContent className="grid py-12">
        <div className=" 2xl:space-y-8">
          <Card>
            <CardContent className="p-0">
              <Link href="#">
                <Image src="/assets/images/mock-add-for-football-hub-1.webp" alt="Ad 1" width={300} height={300} className="rounded-xl"/>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-0">
              <Link href="#">
                <Image src="/assets/images/mock-add-for-football-hub-2.webp" alt="Ad 2" width={300} height={300} className="rounded-xl"/>
              </Link>
            </CardContent>
          </Card>
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}

export default AddsSideBar;