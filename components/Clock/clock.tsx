"use client";
import { useEffect } from "react";
import css from "./clock.module.css";
export default function Clock() {
  useEffect(() => {
    setTime();

    setInterval(function () {
      setTime();
    }, 1000);

    function setTime() {
      let hourDom = document.getElementById("hour");
      if (!hourDom) {
        return;
      }
      var d = new Date();
      var h = d.getHours();
      var m = d.getMinutes();
      var s = d.getSeconds();

      var hour = 360 * (h / 12);
      var minute = 360 * (m / 60);
      var second = 360 * (s / 60);
      
      if (hourDom) {
        hourDom.style.transform = "rotate(" + hour + "deg)";
      }
      let minuteDom = document.getElementById("minute");
      if (minuteDom) {
        minuteDom.style.transform = "rotate(" + minute + "deg)";
      }
      let secondDom = document.getElementById("second");
      if (secondDom) {
        secondDom.style.transform = "rotate(" + second + "deg)";
      }
    }
  }, []);
  return (
    <div className={css.clock}>
      <div className={css.middle}></div>
      <div className={css.middle1}></div>
      <div id="hour" className={css.hour}></div>
      <div id="minute" className={css.minute}></div>
      <div id="second" className={css.second}></div>
    </div>
  );
}
