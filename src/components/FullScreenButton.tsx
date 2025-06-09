import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Maximize, Minimize} from "lucide-react";

const FullScreenButton = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  return (
    <Button onClick={toggleFullScreen} variant="ghost" size="icon" className="hidden sm:flex  ">
      {isFullScreen ? <Minimize /> : <Maximize />}
    </Button>
  );
};

export default FullScreenButton;
