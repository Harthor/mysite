import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]); // location(라우팅 경로) 변경마다 실행됨
  
    return null // UI를 렌더링하지 않는 컴포넌트
  }

  export default ScrollToTop;