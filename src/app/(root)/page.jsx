import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
   <div className="flex items-center justify-center h-screen">
    <Button>Hello</Button>
    <UserButton/>
   </div>
  );
}
