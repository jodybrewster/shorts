import NewShort from "@/components/modules/NewShort";
import ShortList from "@/components/modules/ShortList";
import Image from "next/image";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="SectionContent w-9/12 h-72 flex-col justify-start items-center gap-6 inline-flex">
        <div className="Title self-stretch h-9 flex-col justify-start items-start gap-2.5 flex">
          <h2 className="ShortIt self-stretch text-black text-3xl font-semibold font-['Inter'] leading-9">
            SHORT IT!
          </h2>
        </div>
       
       <NewShort />
      
      </div>
    </main>
  );
}
