import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getImages = () => {
    if (searchInput) {
      setLoading(true);

      fetch(
        `https://tofu-node-apis.onrender.com/api/pinterest?q=${searchInput}`
      )
        .then((res) => res.json())
        .then((res) => {
          setImages(res.images);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast({
        title: "What should I search?"
      });
    }
  };

  return (
    <>
      <div className={`w-full ${images.length > 0 ? 'h-[40vh]' : 'h-screen'} grid place-content-center transition-[height] duration-300`}>
        <div className="flex items-center gap-1 justify-between max-sm:flex-col max-justify-center">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="search-box" className="text-gray-300 text-2xl max-sm:text-[15px]">
              Search
            </Label>
            <Input
              type="text"
              id="search-box"
              placeholder="Search"
              className="text-white w-[400px] h-[40px] max-sm:w-[300px]"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="mt-9 ml-8 text-[17px] p-5 max-sm:mt-2 max-sm:ml-0 max-sm:text-[15px]"
            onClick={getImages}
            disabled={loading}
          >
            {loading ? "Searching..." : "Find Images"}
          </Button>
        </div>
      </div>
      {images.length > 0 && (
        <div className="flex gap-4 w-full min-h-screen p-40 pt-0 flex-wrap items-center justify-center">
          {images.map((imageUrl, index) => (
           <div key={index} className="flex-grow min-w-[450px] relative before:content-[''] before:block before:pt-[100%] max-sm:min-w-[300px]">
             <img
              key={index}
              src={imageUrl}
              alt={`Image ${index + 1}`}
              className="w-full h-full rounded-xl object-cover object-top absolute top-0"
            />
           </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
