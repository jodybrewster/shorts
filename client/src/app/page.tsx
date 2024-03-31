import NewShort from "@/components/modules/NewShort";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-5 pt-10 md:p-24 bg-gray-100">
        <div className="SectionContent w-9/12 h-72 flex-col justify-start items-center gap-6 inline-flex ">
          <div className="Title self-stretch h-9 flex-col justify-start items-start gap-2.5 flex">
            <h2 className="ShortIt self-stretch text-black text-3xl font-light font-['Inter'] leading-9 text-primary">
              Short it!
            </h2>
          </div>

          <NewShort />
        </div>
      </main>
      <Toaster />
    </>
  );
}
