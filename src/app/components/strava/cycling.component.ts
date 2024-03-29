import { Component } from '@angular/core';

@Component({
  selector: 'app-cycling',
  standalone: true,
  imports: [],
  template: `
    <div class="cyclingWrapper">
      <div class="bikeRiding">
        <div class="clouds"></div>
        <div class="shadowWrapper">
          <div class="shadow"></div>
          <div className="">Loading...</div>
        </div>
        <div class="cyclist">
          <div class="bike">
            <div class="leftTyre">
              <div class="spokes"></div>
            </div>
            <div class="rightTyre">
              <div class="spokes"></div>
            </div>
            <div class="wheel"></div>
            <div class="pedals"></div>
            <div class="chain"></div>
          </div>
          <div class="girl">
            <div class="top"></div>
            <div class="rightArm"></div>
            <div class="leftArm"></div>
            <div class="head"></div>
            <div class="hair"></div>
            <div class="strap"></div>
            <div class="trousers">
              <div class="leftLeg">
                <div class="leftcalf"></div>
              </div>
              <div class="rightLeg">
                <div class="calf"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .cyclingWrapper * {
        --jersey: #3c3c3c;

        box-sizing: content-box;
        &:after,
        &:before {
          box-sizing: content-box;
        }
      }

      .cyclingWrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        width: 100%;
        transform: scale(0.8);
      }

      .bikeRiding {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 600px;
        overflow: hidden;
        background-color: lightblue;
        border-radius: 24px;
      }

      .cyclist {
        position: relative;
        animation: ride 1s linear infinite;
        top: 20px;
      }

      @keyframes ride {
        0% {
          transform: scaleY(1);
        }
        25% {
          transform: scaleY(1.02);
        }
        50% {
          transform: scaleY(1);
        }
        75% {
          transform: scaleY(1.02);
        }
        100% {
          transform: scaleY(1);
        }
      }

      .bike {
        position: relative;
        background-color: #e5383b;
        width: 180px;
        height: 10px;
        border-radius: 10px;
        box-shadow: inset 3px -3px rgba(0, 0, 0, 0.1);
      }

      .bike:before,
      .bike:after {
        content: '';
        position: absolute;
        background-color: #e5383b;
        width: 8px;
        height: 140px;
        top: -10px;
      }

      .bike:before {
        transform: rotate(35deg);
        left: 126px;
        box-shadow: -120px 85px #e5383b, 0px -30px #e5383b;
      }

      .bike:after {
        transform: rotate(-35deg);
        left: 49px;
        box-shadow: 120px 85px #e5383b, 0px -30px #e5383b;
      }

      .leftTyre,
      .rightTyre {
        width: 150px;
        height: 150px;
        position: absolute;
        border: 10px solid #333;
        border-radius: 50%;
        z-index: 1;
        top: 30px;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .leftTyre {
        left: -140px;
      }

      .rightTyre {
        left: 155px;
      }

      .leftTyre:before,
      .rightTyre:before {
        content: '';
        position: absolute;
        width: 135px;
        height: 135px;
        border-radius: 50%;
        border: 8px solid #fcfffc;
      }

      .leftTyre:after,
      .rightTyre:after {
        content: '';
        position: absolute;
        width: 2px;
        height: 145px;
        left: 75px;
        top: 0;
        background-color: #fcfffc;
      }

      .spokes {
        position: absolute;
        width: 145px;
        height: 2px;
        background-color: #fcfffc;
        top: 75px;
      }

      .spokes:before,
      .spokes:after {
        content: '';
        position: absolute;
        width: 145px;
        height: 2px;
        background-color: #fcfffc;
        left: 3px;
      }

      .spokes:before {
        transform: rotate(45deg);
      }

      .spokes:after {
        transform: rotate(-45deg);
      }

      .wheel {
        z-index: 6;
        position: absolute;
        border-radius: 50%;
        background-color: #a4161a;
        width: 20px;
        height: 20px;
        top: 105px;
        left: -65px;
        box-shadow: 295px 0 #a4161a, 146px 0px #a4161a;
      }

      .wheel:before {
        content: '';
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 100%;
        border-top: 11px solid #333;
        border-left: 8px solid #e5383b;
        border-bottom: 8px solid transparent;
        border-right: 8px solid transparent;
        transform: rotate(80deg);
        top: -140px;
        left: 240.2px;
      }

      .shadowWrapper {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 2rem;

        top: 510px;
      }
      .shadow {
        width: 520px;
        height: 15px;
        background-color: rgba(0, 0, 0, 0.2);
        left: 45px;
        border-radius: 10px;
        animation: scale 2s linear infinite;
      }

      @keyframes scale {
        0% {
          transform: scaleX(1);
        }
        25% {
          transform: scaleX(0.9);
        }
        50% {
          transform: scaleX(1);
        }
        75% {
          transform: scaleX(0.9);
        }
        100% {
          transform: scaleX(1);
        }
      }

      .pedals {
        position: relative;
        z-index: 7;
        width: 50px;
        height: 50px;
        border: 5px solid #ba181b;
        border-radius: 50%;
        top: 85px;
        left: 60px;
        animation: spin 1s linear infinite;
      }

      .pedals:before {
        content: '';
        position: absolute;
        border-radius: 10px;
        background-color: #adb5bd;
        height: 30px;
        width: 5px;
        left: 22px;
        top: -5px;
      }

      .chain {
        position: absolute;
        top: 81px;
      }

      .chain:before,
      .chain:after {
        content: '';
        position: absolute;
        background-color: #333;
        width: 140px;
        height: 2px;
        left: -60px;
      }

      .chain:before {
        top: 20px;
        transform: rotate(-10deg);
      }

      .chain:after {
        top: 47px;
        transform: rotate(10deg);
      }

      .girl {
        position: absolute;
      }

      .top {
        position: absolute;
        width: 80px;
        height: 80px;
        border-top: 50px solid var(--jersey);
        border-left: 50px solid var(--jersey);
        border-top-left-radius: 100%;
        top: -190px;
        left: -18px;
      }

      .top:before {
        content: '';
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--jersey);
        left: 50px;
        top: -50px;
        box-shadow: -10px 10pxvar (--jersey);
      }

      .rightArm,
      .leftArm {
        position: absolute;
        width: 15px;
        height: 100px;
        border-radius: 20px;
        transform: rotate(-30deg);
      }

      .rightArm {
        background-color: #deab90;
        left: 130px;
        top: -175px;
        z-index: 8;
      }

      .leftArm {
        background-color: #cd9777;
        left: 105px;
        top: -185px;
        z-index: -1;
      }

      .rightArm:before,
      .leftArm:before {
        content: '';
        position: absolute;
        width: 15px;
        height: 100px;
        border-radius: 20px;
        top: 85px;
        left: 15px;
        transform: rotate(-20deg);
      }

      .rightArm:before {
        background-color: #deab90;
      }

      .leftArm:before {
        background-color: #cd9777;
      }

      .head {
        position: absolute;
        background-color: #cd9777;
        width: 40px;
        height: 20px;
        top: -190px;
        left: 110px;
        z-index: -1;
        transform: rotate(-20deg);
      }

      .head:before,
      .head:after {
        content: '';
        position: absolute;
        background-color: #deab90;
        border-radius: 50%;
      }

      .head:before {
        width: 75px;
        height: 75px;
        left: 30px;
        top: -30px;
      }

      .head:after {
        width: 20px;
        height: 20px;
        left: 78px;
        top: 25px;
      }

      .hair {
        position: absolute;
        width: 80px;
        height: 40px;
        border-radius: 0 100% 0 0;
        background-color: #bb3e03;
        top: -245px;
        left: 142px;
        z-index: 10;
      }

      .hair:after {
        content: '';
        position: absolute;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        background-color: #bb3e03;
        left: -20px;
      }

      .hair:before {
        /*content:"";*/
        position: absolute;
        width: 80px;
        height: 25px;
        border-radius: 50% 0/100% 0;
        background-color: #ee9b00;
        transform-origin: right;
        left: -84px;
        top: 37px;
        animation: hair 1s linear infinite;
      }

      @keyframes hair {
        0% {
          transform: rotate(0);
        }
        25% {
          transform: rotate(10deg);
        }
        50% {
          transform: rotate(0);
        }
        75% {
          transform: rotate(10deg);
        }
        100% {
          transform: rotate(0);
        }
      }

      .strap {
        position: absolute;
        background-color: #333;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        top: -197px;
        left: 197px;
      }

      .strap:after {
        content: '';
        position: absolute;
        background-color: #333;
        width: 7px;
        height: 60px;
        border-radius: 10px;
        transform: rotate(-15deg);
        top: -22px;
        left: -30px;
      }

      .strap:before {
        content: '';
        position: absolute;
        background-color: #ee9b00;
        width: 60px;
        height: 30px;
        border-radius: 50px 50px 50px 0;
        left: -60px;
        top: -30px;
      }

      .trousers {
        position: absolute;
        top: -90px;
        left: -20px;
      }

      .rightLeg {
        position: absolute;
        background-color: #0a9396;
        width: 120px;
        height: 37px;
        top: 17px;
        left: 12px;
        border-radius: 0 10px 0 30px;
        transform-origin: top left;
        z-index: 7;
        animation: rotate 1s linear infinite;
      }

      .trousers:after {
        content: '';
        position: absolute;
        width: 60px;
        height: 60px;
        border-radius: 0 25px 50px 50px;
        left: -5px;
        background-color: #0a9396;
        transform: rotate(20deg);
      }

      .trousers:before {
        content: '';
        position: absolute;
        background-color: #333;
        width: 65px;
        height: 25px;
        border-radius: 20px;
        left: -10px;
        top: 50px;
      }

      .leftLeg {
        position: absolute;
        background-color: #005f73;
        width: 120px;
        height: 37px;
        top: 14px;
        left: 13px;
        border-radius: 0 10px 0 30px;
        transform-origin: top left;
        z-index: -4;
        animation: rotate 1s linear infinite;
        animation-delay: 0.5s;
      }

      @keyframes rotate {
        0% {
          transform: rotate(0);
        }
        25% {
          transform: rotate(15deg);
        }
        55% {
          transform: rotate(30deg);
        }
        80% {
          transform: rotate(15deg);
        }
        100% {
          transform: rotate(0);
        }
      }

      .calf {
        position: absolute;
        transform-origin: top;
        width: 33px;
        height: 120px;
        background-color: #0a9396;
        left: 87px;
        top: 9px;
        border-radius: 0 10px 0 0;
        animation: cycle 1s linear infinite;
      }

      .leftcalf {
        position: absolute;
        transform-origin: top;
        width: 33px;
        height: 120px;
        background-color: #005f73;
        left: 87px;
        top: 9px;
        border-radius: 0 10px 0 0;
        animation: cycle 1s linear infinite;
        animation-delay: 0.5s;
      }

      .leftcalf:before,
      .calf:before {
        content: '';
        position: absolute;
        background-color: #bb3e03;
        width: 55px;
        height: 30px;
        border-radius: 0 20px 0 0;
        top: 119px;
        box-shadow: inset 0 -10px #fff;
      }

      .leftcalf:after,
      .calf:after {
        content: '';
        position: absolute;
        background-color: #333;
        width: 35px;
        height: 10px;
        border-radius: 10px;
        top: 150px;
        left: 10px;
      }

      @keyframes cycle {
        0% {
          transform: rotate(0);
        }
        25% {
          transform: rotate(-27deg);
        }
        50% {
          transform: rotate(-32deg);
        }
        75% {
          transform: rotate(-10deg);
        }
        100% {
          transform: rotate(0);
        }
      }

      .clouds {
        position: absolute;
        width: 130px;
        height: 30px;
        border-radius: 20px;
        background-color: rgba(255, 255, 255, 0.5);
        top: 250px;
        animation: clouds 2.7s linear infinite reverse;
      }

      .clouds:before,
      .clouds:after {
        content: '';
        position: absolute;
        width: 130px;
        height: 30px;
        border-radius: 20px;
        background-color: rgba(255, 255, 255, 0.5);
      }

      .clouds:before {
        left: -300px;
        top: -200px;
        animation: clouds 2.2s linear infinite reverse;
      }

      .clouds:after {
        left: 350px;
        top: -100px;
        animation: clouds 3.1s linear infinite reverse;
      }

      @keyframes clouds {
        from {
          left: -600px;
        }
        to {
          left: 600px;
        }
      }
    `,
  ],
})
export class CyclingComponent {}
