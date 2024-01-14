import HighlightAbleIcon from "../highlightAbleIcon";
import declareComponent from "../../../../../lib/declareComponent";
import { Data } from "josm";

const outlinedPath = "M110.872 314.776C83.7162 314.754 57.5109 304.774 37.2193 286.727C16.9278 268.679 3.95882 243.817 0.768608 216.849C-2.4216 189.881 4.3884 162.679 19.9089 140.395C35.4295 118.111 58.5829 102.292 84.9844 95.9345C91.0123 74.0891 102.617 54.1863 118.659 38.1796C134.701 22.1729 154.629 10.6123 176.487 4.63244C198.346 -1.34746 221.384 -1.54116 243.34 4.07036C265.296 9.68188 285.416 20.9058 301.724 36.6405C316.749 28.1474 333.726 23.7126 350.984 23.7725C402.041 23.7725 444.619 62.5725 450.461 112.235C466.754 119.13 480.959 130.169 491.661 144.256C504.861 161.601 511.982 182.81 511.924 204.606C511.944 221.303 507.784 237.738 499.825 252.415C491.866 267.092 480.36 279.543 466.356 288.634C452.352 297.726 436.295 303.167 419.649 304.463C403.003 305.76 386.298 302.869 371.055 296.055C358.006 311.001 342.029 323.11 324.112 331.632C306.195 340.155 286.72 344.91 266.892 345.604C247.063 346.298 227.304 342.915 208.835 335.665C190.366 328.415 173.582 317.453 159.52 303.455C144.383 310.899 127.741 314.771 110.872 314.776ZM173.912 274.886C185.176 288.219 199.325 298.815 215.288 305.872C231.252 312.928 248.611 316.261 266.053 315.616C283.495 314.972 300.561 310.368 315.961 302.153C331.36 293.938 344.689 282.327 354.937 268.199C357.161 265.135 360.461 263.025 364.176 262.293C367.89 261.561 371.744 262.26 374.964 264.25C383.463 269.496 392.983 272.866 402.889 274.134C412.794 275.403 422.857 274.542 432.402 271.608C441.948 268.674 450.757 263.735 458.24 257.121C465.723 250.508 471.707 242.372 475.792 233.26C479.877 224.147 481.969 214.267 481.927 204.28C481.885 194.294 479.711 184.431 475.55 175.353C471.389 166.275 465.337 158.19 457.799 151.639C450.261 145.089 441.41 140.223 431.84 137.369C428.774 136.452 426.082 134.578 424.157 132.022C422.232 129.465 421.175 126.36 421.14 123.159C420.879 104.705 413.379 87.0916 400.257 74.1128C387.135 61.1341 369.441 53.8285 350.984 53.7695C335.637 53.7019 320.699 58.7163 308.5 68.0305C305.439 70.3633 301.598 71.43 297.772 71.0099C293.946 70.5898 290.428 68.715 287.945 65.7735C275.688 51.2403 259.566 40.4742 241.445 34.7208C223.325 28.9673 203.945 28.4616 185.549 33.2621C167.153 38.0625 150.491 47.973 137.492 61.8471C124.493 75.7212 115.688 92.9919 112.094 111.661C111.504 114.731 109.97 117.54 107.706 119.695C105.441 121.85 102.56 123.244 99.4654 123.681C87.4839 125.362 76.0315 129.706 65.9505 136.396C55.8696 143.086 47.4167 151.951 41.2136 162.338C35.0104 172.726 31.2149 184.372 30.1061 196.42C28.9974 208.468 30.6037 220.611 34.8068 231.956C39.01 243.301 45.703 253.56 54.3937 261.977C63.0843 270.395 73.5514 276.757 85.025 280.595C96.4986 284.434 108.687 285.652 120.693 284.159C132.699 282.666 144.218 278.5 154.402 271.968C157.458 270.014 161.118 269.233 164.705 269.769C168.292 270.306 171.563 272.124 173.912 274.886Z"
const filledPath = "M111.103 315.206C83.9476 315.184 57.7423 305.204 37.4507 287.157C17.1592 269.109 4.19026 244.247 1.00005 217.279C-2.19016 190.311 4.61984 163.109 20.1403 140.825C35.6609 118.541 58.8143 102.722 85.2158 96.3642C91.2437 74.5188 102.848 54.616 118.89 38.6093C134.932 22.6026 154.86 11.042 176.718 5.06213C198.577 -0.91777 221.615 -1.11147 243.571 4.50005C265.527 10.1116 285.647 21.3355 301.955 37.0702C316.98 28.5771 333.957 24.1423 351.215 24.2022C402.272 24.2022 444.85 63.0022 450.692 112.665C466.985 119.56 481.19 130.599 491.892 144.686C505.092 162.031 512.213 183.24 512.155 205.036C512.175 221.733 508.015 238.168 500.056 252.845C492.097 267.522 480.591 279.973 466.587 289.064C452.583 298.156 436.526 303.597 419.88 304.893C403.234 306.19 386.529 303.299 371.286 296.485C358.237 311.431 342.26 323.54 324.343 332.062C306.426 340.585 286.951 345.34 267.123 346.034C247.294 346.728 227.535 343.345 209.066 336.095C190.597 328.845 173.813 317.883 159.751 303.885C144.614 311.329 127.972 315.201 111.103 315.206ZM174.143 275.316C185.407 288.649 199.556 299.245 215.519 306.302C231.483 313.358 248.842 316.691 266.284 316.046C283.726 315.402 300.792 310.798 316.192 302.583C331.591 294.368 344.92 282.757 355.168 268.629C357.392 265.565 360.692 263.455 364.407 262.723C368.121 261.991 371.975 262.69 375.195 264.68C383.694 269.926 393.214 273.296 403.12 274.564C413.025 275.833 423.088 274.972 432.633 272.038C442.179 269.104 450.988 264.165 458.471 257.551C465.954 250.938 471.938 242.802 476.023 233.69C480.108 224.577 482.2 214.697 482.158 204.71C482.116 194.724 479.942 184.861 475.781 175.783C471.62 166.705 521 197 455 275.316C445.996 286 439 291 430 294.5C427 295.5 424.5 296 421 296.485C418.5 296.831 415.5 297 413.5 297C409.5 297 385 297 369.5 285C356.5 300 357.5 299 343.5 308C332.611 315 323.5 321.714 310 327.5C306.5 329 301 331.438 297 333C293 334.562 286 336.5 279.5 336.5C265.5 336.5 260.5 336.095 242.5 333.5C222.5 330.617 178.024 306.718 164.936 287.157C140.731 296.43 144.731 294.277 130.731 299.93C117.731 303.649 121.359 303.664 113.731 305.43C111.731 305.893 106.731 306.302 103.231 306.302C99.7314 306.302 96.7314 306.302 93.7314 306.302C83.7314 306.302 70.1402 298.159 60.7314 289.93C54.6251 284.589 52.923 282.93 46.2314 274.564C7.73145 226.43 31.4463 184.802 30.3375 196.85C29.2288 208.898 30.8351 221.041 35.0382 232.386C39.2414 243.731 45.9344 253.99 54.6251 262.407C63.3157 270.825 73.7828 277.187 85.2564 281.025C96.73 284.864 108.918 286.082 120.924 284.589C132.93 283.096 144.449 278.93 154.633 272.398C157.689 270.444 161.349 269.663 164.936 270.199C168.523 270.736 171.794 272.554 174.143 275.316Z"






export default class ThoughtBubble extends HighlightAbleIcon {
  private elem = this.q("#elem") as SVGPathElement
  constructor() {
    super()
    // this.elem.css({d: outlinedPath})
  }
  highlight() {
    super.highlight()
    this.elem.anim({d: filledPath})
    return this
  }
  downlight() {
    super.downlight()
    this.elem.anim({d: outlinedPath})
    return this
  }

  pug() {
    return require("./thoughtBubble.pug").default
  }
}

declareComponent("thought-bubble", ThoughtBubble)
