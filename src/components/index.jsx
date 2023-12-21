// import { useEffect } from "react";
// import { useState } from "react";
// import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
// import "./style.css";
// export default function ImageSlider({ url, limit = 5, page = 1 }) {
//   const [images, setImages] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [errorMsg, setErrMsg] = useState(null);
//   const [loading, setLoading] = useState(false);

//   async function fetchImages(getUrl) {
//     try {
//       setLoading(true);
//       const res = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
//       const data = await res.json();
//       console.log(data);
//       if (data) {
//         setImages(data);
//         setLoading(false);
//       }
//     } catch (error) {
//       setErrMsg(error.message);
//     }
//   }

//   useEffect(() => {
//     if (url !== "") fetchImages(url);
//   }, [url]);

//   if (loading) {
//     return <div>Loading data ! Please Wait</div>;
//   }
//   if (errorMsg !== null) {
//     return <div>Error occured ! {errorMsg}</div>;
//   }

//   function handlePrevious() {
//     setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
//   }
//   function handleNext() {
//     setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
//   }
//   return (
//     <div className="container">
//       <BsArrowLeftCircleFill
//         onClick={handlePrevious}
//         className="arrow arrow-left"
//       />
//       {images && images.length
//         ? images.map((imageItem, index) => (
//             <img
//               key={imageItem.id}
//               alt={imageItem.download_url}
//               src={imageItem.download_url}
//               className={
//                 currentSlide === index
//                   ? "current-image"
//                   : "current-image hide-current-image"
//               }
//             />
//           ))
//         : null}
//       <BsArrowRightCircleFill
//         onClick={handleNext}
//         className="arrow arrow-right"
//       />
//       <span className="circle-indicators">
//         {images && images.length
//           ? images.map((_, index) => (
//               <button
//                 key={index}
//                 className={
//                   currentSlide === index
//                     ? "current-indicator"
//                     : "current-indicator inactive-indicator"
//                 }
//                 onClick={() => setCurrentSlide(index)}></button>
//             ))
//           : null}
//       </span>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./style.css";

export default function ImageSlider({ url = "", limit = 5, page = 1 }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchImages = async (getUrl) => {
    try {
      setLoading(true);
      const res = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await res.json();
      setImages(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url !== "") {
      fetchImages(url);
    }
  }, [url]);

  useEffect(() => {
    // Automatic slider interval
    const intervalId = setInterval(() => {
      handleNext();
    }, 3000); // Change slide every 3 seconds (adjust as needed)

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentSlide]);

  const handlePrevious = () => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  };

  const handleNext = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  };

  if (loading) {
    return <div>Loading data! Please Wait</div>;
  }

  if (error !== null) {
    return <div>Error occurred! {error}</div>;
  }

  return (
    <div className="container">
      <BsArrowLeftCircleFill
        onClick={handlePrevious}
        className={`arrow arrow-left`}
      />
      {images.map((imageItem, index) => (
        <img
          key={imageItem.id}
          alt={imageItem.download_url}
          src={imageItem.download_url}
          className={`current-image ${
            currentSlide === index ? "" : "hide-current-image"
          }`}
        />
      ))}
      <BsArrowRightCircleFill
        onClick={handleNext}
        className={`arrow arrow-right`}
      />
      <span className="circle-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`current-indicator ${
              currentSlide === index ? "" : "inactive-indicator"
            }`}
            onClick={() => setCurrentSlide(index)}></button>
        ))}
      </span>
    </div>
  );
}
