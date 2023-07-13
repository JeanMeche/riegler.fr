import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  host: {
    class: 'flex justify-center',
  },
  styles: [
    `
      :root {
        --geist-text-gradient: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0.8),
          #000
        );
        --develop-start-gradient: #007cf0;
        --develop-end-gradient: #00dfd8;
      }

      span {
        background-image: linear-gradient(
          90deg,
          var(--start-color),
          var(--end-color)
        );
      }

      span:after {
        content: var(--content);
        position: absolute;
        display: block;
        width: 100%;
        text-align: center;
        margin-bottom: -10px;
        background: var(--geist-text-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        top: 0;
        bottom: 0;
        left: 0;
      }
    `,
  ],
  template: `
    <h1 aria-label="Real Artists Ship." class="flex flex-col text-lg">
      <span
        class="relative"
        style="--content:'Develop.';--padding:0.05em;--start-color:var(--develop-start-gradient);--end-color:var(--develop-end-gradient)"
      >
        <span class="bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500"
          >Develop.
        </span>
      </span>
      <span
        class="relative"
        style="--content:'Preview.';--padding:0.05em;--start-color:var(--preview-start-gradient);--end-color:var(--preview-end-gradient)"
      >
        <span
          class="animated-gradient-text_foreground__PuOdy animated-gradient-text_foreground-2__m3PnD"
        >
          Preview.
        </span>
      </span>
      <span
        class="relative"
        style="--content:'Ship.';--padding:0.05em;--start-color:var(--ship-start-gradient);--end-color:var(--ship-end-gradient)"
      >
        <span
          class="animated-gradient-text_foreground__PuOdy animated-gradient-text_foreground-3__KfLOT"
        >
          Ship.
        </span>
      </span>
    </h1>
  `,
})
export default class TestComponent {}
