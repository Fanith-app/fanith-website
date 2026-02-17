import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {}

const GameRoomCardShape: React.FC<Props> = (props) => {
  return (
    <svg
      viewBox="0 0 330 248"
      fill="none"
      className="absolute inset-0 w-full h-full"
      {...props}
    >
      <path
        d="M93.8506 11L102.712 21.9346L102.862 22.1201H222.668L222.817 21.9277L231.319 11H299.731L322.5 32.2617V236.167L311.262 247H0.5V21.832L11.7383 11H93.8506Z"
        stroke="rgba(255,255,255,0.3)"
        fill="#1a1a1a"
      />

      <path
        d="M248.217 10.7109L234.145 0.5H89.0873L75.0547 10.6818"
        stroke="rgba(255,255,255,0.3)"
      />

      <path
        d="M236.711 10.0996H231.298L222.277 19.9905H227.69L236.711 10.0996Z"
        fill="#9E1D1D"
      />

      <path
        d="M89.4883 10.0996H94.9009L103.922 19.9905H98.5093L89.4883 10.0996Z"
        fill="#9E1D1D"
      />
    </svg>
  );
};

export default GameRoomCardShape;
