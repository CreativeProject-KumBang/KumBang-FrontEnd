import React, { useEffect, useState, useRef } from "react";
import styled from 'styled-components';

const IMG = styled.img`
  width: 100%;
  //height: 70vh;
`;

const Container = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
`;
const ButtonPrev = styled.button`
  all: unset;
  border: 1px solid coral;
  padding: 0.5em 2em;
  color: coral;
  border-radius: 10px;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: coral;
    color: #fff;
  }
`;

const ButtonNext = styled.button`
  all: unset;
  border: 1px solid coral;
  padding: 0.5em 2em;
  color: coral;
  float: right;
  border-radius: 10px;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: coral;
    color: #fff;
  }
`;
const SliderContainer = styled.div`
  width: 100%;
  display: flex;
`;

function Slider(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  //const slideRef = useRef();

  const TOTAL_SLIDES = 2;
  let files = props.files;

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };


  const divStyle = {
    width: "100%",
    display: "flex"
  };

  useEffect(() => {
    const slideRef = document.getElementById("slider");
    if (slideRef) {
      slideRef.style.transition = "all 0.5s ease-in-out";
      slideRef.style.transform = `translateX(-${currentSlide}00%)`;
    }

  }, [currentSlide]);
  return (
    <div>
      {(!(files.length === 0)) ? (
        <div>
          <Container>
            <div id="slider" style={divStyle} >
              {files.map((img, i) => <IMG src={"http://192.168.239.130:8080" + img.path} key={i} />)}
            </div>
          </Container>
          <div>
            <ButtonPrev onClick={prevSlide}>◀</ButtonPrev>
            <ButtonNext onClick={nextSlide}>▶</ButtonNext>
          </div>
        </div>
      ) : (
        <div>이미지 없음</div>
      )}
    </div>
  );
}

export default Slider;