import { useState, useEffect } from "react";
// 每次執行這個函式會偵測視窗大小設定給windowSize
// 偵測window 視窗如果有變動，會再執行一次上面函式，持續記錄視窗大小

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      console.log('window', windowSize)
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
