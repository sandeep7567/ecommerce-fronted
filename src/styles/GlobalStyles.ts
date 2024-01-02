"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  body{
    background-color: #eee;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
  }

  .flying {
  position:absolute;
  bottom:20px;
  animation:fly-in 2s ease-out forwards;
  opacity:0;
}
@keyframes fly-in {
  from {
    transform: translateY(0);
    opacity: 0;
    scale: 1;
  }
  to {
    transform: translateY(-100vh);
    opacity: 1;
  }
}

@keyframes fly {
  100% {
    top: 0;
    left: 100%;
    opacity: 0;
    display: none;
  }
}
`;

export default GlobalStyles;
