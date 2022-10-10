import React from "react"

import TokenList from "decentraland-gatsby/dist/utils/dom/TokenList"

import "./Share.css"

export const Share = React.memo(function (
  props: React.SVGAttributes<SVGElement>
) {
  return (
    <svg
      {...props}
      viewBox="2 0 20 20"
      className={TokenList.join(["icon-share", props.className])}
    >
      <path d="M14.85,17.15a.42.42,0,0,1-.24-.07L9.23,14A.52.52,0,0,1,9,13.57V10.79a.5.5,0,0,1,.23-.41l5.37-3.52a.49.49,0,0,1,.69.14.5.5,0,0,1-.14.69L10,11.06v2.22l5.12,2.93a.51.51,0,0,1,.19.69A.5.5,0,0,1,14.85,17.15Z" />
      <circle cx="16.6" cy="5.94" r="2.48" />
      <path d="M16.6,9.42a3.48,3.48,0,1,1,3.47-3.48A3.48,3.48,0,0,1,16.6,9.42Zm0-5a1.48,1.48,0,1,0,1.47,1.48A1.49,1.49,0,0,0,16.6,4.46Z" />
      <circle cx="7.4" cy="12.18" r="2.48" />
      <path d="M7.4,15.65a3.48,3.48,0,1,1,3.48-3.47A3.47,3.47,0,0,1,7.4,15.65Zm0-5a1.48,1.48,0,1,0,1.48,1.48A1.48,1.48,0,0,0,7.4,10.7Z" />
      <circle cx="16.6" cy="18.01" r="2.48" />
      <path d="M16.6,21.48A3.48,3.48,0,1,1,20.07,18,3.48,3.48,0,0,1,16.6,21.48Zm0-4.95A1.48,1.48,0,1,0,18.07,18,1.48,1.48,0,0,0,16.6,16.53Z" />
    </svg>
  )
})
