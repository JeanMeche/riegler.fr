import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'flex justify-center',
  },
  template: `
    <div class="container grid grid-cols-12 md:gap-10 justify-between lg:mt-[220px]">
      <!-- sidber personal info -->
      <div class="col-span-12 lg:col-span-4 hidden lg:block h-screen sticky top-44">
        <div
          class="w-full mb-6 lg:mb-0 mx-auto relative bg-white text-center dark:bg-[#111111] px-6 rounded-[20px] mt-[180px] md:mt-[220px] lg:mt-0"
        >
          <!-- profile image -->
          <img
            src="./me.png"
            class="w-[240px] absolute left-[50%] transform -translate-x-[50%] h-[240px] drop-shadow-xl mx-auto rounded-[20px] -mt-[140px]"
            alt="about avatar"
          />
          <div class="pt-[100px] pb-8">
            <h1 class="mt-6 mb-1 text-[26px] font-semibold dark:text-white">Matthieu Riegler</h1>
            <h3
              class="mb-4 text-[#7B7B7B] inline-block dark:bg-[#1D1D1D] px-5 py-1.5 rounded-lg dark:text-[#A6A6A6]"
            >
              Software Engineer
            </h3>
            <div class="flex justify-center space-x-3">
              <!-- facebook icon and link -->
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <span class="socialbtn text-[#1773EA]">
                  <i class="fa-brands fa-facebook-f"></i>
                </span>
              </a>
              <!-- twitter icon and link -->
              <a href="https://twitter.com/jean__meche" target="_blank" rel="noopener noreferrer">
                <span class="socialbtn text-[#1C9CEA]">
                  <i class="fa-brands fa-twitter"></i>
                </span>
              </a>
              <!-- linkedin icon and link -->
              <a
                href="https://www.linkedin.com/in/matthieuriegler/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="socialbtn text-[#0072b1]">
                  <i class="fa-brands fa-linkedin-in"></i>
                </span>
              </a>
            </div>

            <div class="p-7 rounded-2xl mt-7 bg-[#F3F6F6] dark:bg-[#1D1D1D]">
              <div class="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] pb-2.5">
                <span class="socialbtn bg-white dark:bg-black text-[#E93B81] shadow-md">
                  <i class="fa-solid fa-mobile-screen-button"></i>
                </span>
                <div class="text-left ml-2.5">
                  <p class="text-xs text-[#44566C] dark:text-[#A6A6A6]">Phone</p>
                  <p class="dark:text-white">+123 456 7890</p>
                </div>
              </div>
              <div class="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">
                <span class="socialbtn bg-white dark:bg-black text-[#6AB5B9] shadow-md">
                  <i class="fa-solid fa-envelope-open-text"></i>
                </span>
                <div class="text-left ml-2.5">
                  <p class="text-xs text-[#44566C] dark:text-[#A6A6A6]">Email</p>
                  <p class="dark:text-white">matthieu&#64;riegler.fr</p>
                </div>
              </div>
              <div class="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">
                <span class="socialbtn bg-white dark:bg-black text-[#FD7590] shadow-md">
                  <i class="fa-solid fa-location-dot"></i>
                </span>
                <div class="text-left ml-2.5">
                  <p class="text-xs text-[#44566C] dark:text-[#A6A6A6]">Location</p>
                  <p class="dark:text-white">Grenoble, France</p>
                </div>
              </div>
              <div class="flex py-2.5">
                <span class="socialbtn bg-white dark:bg-black text-[#C17CEB] shadow-md">
                  <i class="fa-solid fa-calendar-days"></i>
                </span>
                <div class="text-left ml-2.5">
                  <p class="text-xs text-[#44566C] dark:text-[#A6A6A6]">Birthday</p>
                  <p class="dark:text-white">December 29, 1989</p>
                </div>
              </div>
            </div>

            <!-- dowanload button -->
            <button class="dowanload-btn">
              <img class="mr-3" src="./images/icons/dowanload.png" alt="icon" />
              Download CV
            </button>
          </div>
        </div>
      </div>
      <!-- sidber info end -->

      <div class="col-span-12 lg:col-span-8 flex flex-col">
        <header
          class="lg:flex items-center h-[144px] hidden p-[30px] ml-auto mb-10 rounded-[16px] bg-white dark:bg-[#111111]"
        >
          <nav class="hidden lg:block">
            <nav class="hidden lg:block">
              <ul class="flex gap-2">
                <li>
                  <a
                    class="menu-item p-7 rounded-2xl mt-7 bg-[#F3F6F6] dark:bg-[#1D1D1D]"
                    href="./aboutOne.html"
                  >
                    <span class="text-xl mb-1">
                      <i class="fa-regular fa-user"></i>
                    </span>
                    About
                  </a>
                </li>
                <li>
                  <a
                    class="menu-item p-7 rounded-2xl mt-7 bg-[#F3F6F6] dark:bg-[#1D1D1D]"
                    href="./resumeOne.html"
                  >
                    <span class="text-xl mb-1">
                      <i class="fa-regular fa-file-lines"></i>
                    </span>
                    Resume
                  </a>
                </li>
                <li>
                  <a
                    class="menu-item p-7 rounded-2xl mt-7 bg-[#F3F6F6] dark:bg-[#1D1D1D]"
                    href="./portfiloOne.html"
                  >
                    <span class="text-xl mb-1">
                      <i class="fas fa-briefcase"></i>
                    </span>
                    Works
                  </a>
                </li>
                <li>
                  <a
                    class="menu-item p-7 rounded-2xl mt-7 bg-[#F3F6F6] dark:bg-[#1D1D1D]"
                    href="./blogOne.html"
                  >
                    <span class="text-xl mb-1">
                      <i class="fa-brands fa-blogger"></i>
                    </span>
                    Blogs
                  </a>
                </li>
                <li>
                  <a
                    class="menu-item p-7 rounded-2xl mt-7 bg-[#F3F6F6] dark:bg-[#1D1D1D]"
                    href="./contactOne.html"
                  >
                    <span class="text-xl mb-1">
                      <i class="fa-solid fa-address-book"></i>
                    </span>
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </nav>
        </header>

        <div>
          <!-- resume section start -->
          <div class="bg-white lg:rounded-2xl dark:bg-[#111111]">
            <div class="container sm:px-5 md:px-10 lg:px-14">
              <div class="py-12 px-4 md:px-0">
                <!-- resume page title -->
                <h2 class="after-effect after:left-44">Resume</h2>
                <div
                  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-6 mt-[30px]"
                >
                  <!-- eductation start -->
                  <div>
                    <div class="flex items-center space-x-2 mb-4">
                      <i class="fa-solid text-6xl text-[#F95054] fa-graduation-cap"></i>
                      <h4 class="text-5xl dark:text-white font-medium">Education</h4>
                    </div>
                    <div
                      class="bg-[#fff4f4] dark:bg-transparent py-4 pl-5 pr-3 space-y-2 mb-6 rounded-lg dark:border-[#212425] dark:border-2"
                    >
                      <span class="text-tiny text-gray-lite dark:text-[#b7b7b7]">2021-2023</span>
                      <h3 class="text-xl dark:text-white">Ph.D in Horriblensess</h3>
                      <p class="dark:text-[#b7b7b7]">ABC University, Los Angeles, CA</p>
                    </div>
                    <div
                      class="bg-[#fff1fb] dark:bg-transparent py-4 pl-5 pr-3 space-y-2 rounded-lg mb-6 dark:border-[#212425] dark:border-2"
                    >
                      <span class="text-tiny text-gray-lite dark:text-[#b7b7b7]">
                        2019 - Present
                      </span>
                      <h3 class="text-xl dark:text-white">Sr. Software Tester</h3>
                      <p class="dark:text-[#b7b7b7]">Google Inc.</p>
                    </div>
                    <div
                      class="py-4 pl-5 bg-[#fff4f4] dark:bg-transparent pr-3 space-y-2 rounded-lg dark:border-[#212425] dark:border-2"
                    >
                      <span class="text-tiny text-gray-lite dark:text-[#b7b7b7]">2021</span>
                      <h3 class="text-xl dark:text-white">Best Developer</h3>
                      <p class="dark:text-[#b7b7b7]">University Of Melbourne, NA</p>
                    </div>
                  </div>
                  <!-- eductation end -->

                  <!-- experiment start -->
                  <div>
                    <div class="flex items-center space-x-2 mb-4">
                      <i class="fa-solid text-6xl text-[#F95054] fa-briefcase"></i>
                      <h4 class="text-5xl dark:text-white font-medium">Experience</h4>
                    </div>
                    <div
                      class="py-4 pl-5 pr-3 space-y-2 mb-6 rounded-lg bg-[#eef5fa] dark:bg-transparent dark:border-[#212425] dark:border-2"
                    >
                      <span class="text-tiny text-gray-lite dark:text-[#b7b7b7]">2017-2021</span>
                      <h3 class="text-xl dark:text-white">Computer Science</h3>
                      <p class="dark:text-[#b7b7b7]">Imperialize Technical Institute</p>
                    </div>
                    <div
                      class="bg-[#f2f4ff] dark:bg-transparent py-4 pl-5 pr-3 space-y-2 rounded-lg mb-6 dark:border-[#212425] dark:border-2"
                    >
                      <span class="text-tiny text-gray-lite dark:text-[#b7b7b7]">2015-2017</span>
                      <h3 class="text-xl dark:text-white">Cr. Web Developer</h3>
                      <p class="dark:text-[#b7b7b7]">ib-themes ltd.</p>
                    </div>
                    <div
                      class="py-4 bg-[#eef5fa] dark:bg-transparent pl-5 pr-3 space-y-2 rounded-lg dark:border-[#212425] dark:border-2"
                    >
                      <span class="text-tiny text-gray-lite dark:text-[#b7b7b7]">2008</span>
                      <h3 class="text-xl dark:text-white">Best Writter</h3>
                      <p class="dark:text-[#b7b7b7]">Online Typodev Soluation Ltd.</p>
                    </div>
                  </div>
                  <!-- experiment start -->
                </div>
              </div>
            </div>

            <!-- working section start -->
            <div
              class="container bg-color-810 dark:bg-[#0D0D0D] py-12 px-2 sm:px-5 md:px-10 lg:px-20"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="col-span-1">
                  <h4 class="text-5xl dark:text-white font-medium mb-6">Working Skills</h4>
                  <div class="mb-5">
                    <div class="flex justify-between mb-1">
                      <span class=" font-semibold text-[#526377] dark:text-[#A6A6A6]">
                        Web Design
                      </span>
                      <span class=" font-semibold text-[#526377] dark:text-[#A6A6A6">65%</span>
                    </div>
                    <div class="w-full bg-[#edf2f2] rounded-full h-1 dark:bg-[#1c1c1c]">
                      <div class="bg-[#FF6464] h-1 rounded-full" style="width: 65%"></div>
                    </div>
                  </div>

                  <div class="mb-5">
                    <div class="flex justify-between mb-1">
                      <span class=" font-semibold text-[#526377] dark:text-[#A6A6A6]">
                        Mobile App
                      </span>
                      <span class=" font-semibold text-[#526377] dark:text-[#A6A6A6">85%</span>
                    </div>
                    <div class="w-full bg-[#edf2f2] rounded-full h-1 dark:bg-[#1c1c1c]">
                      <div class="bg-[#9272d4] h-1 rounded-full" style="width: 85%"></div>
                    </div>
                  </div>

                  <div class="mb-5">
                    <div class="flex justify-between mb-1">
                      <span class=" font-semibold text-[#526377] dark:text-[#A6A6A6]">
                        Illustrator
                      </span>
                      <span class=" font-semibold text-[#526377] dark:text-[#A6A6A6">75%</span>
                    </div>
                    <div class="w-full bg-[#edf2f2] rounded-full h-1 dark:bg-[#1c1c1c]">
                      <div class="bg-[#5185d4] h-1 rounded-full" style="width: 75%"></div>
                    </div>
                  </div>

                  <div class="mb-5">
                    <div class="flex justify-between mb-1">
                      <span class=" font-semibold text-[#526377] dark:text-[#A6A6A6]">
                        Photoshope
                      </span>
                      <span class=" font-semibold text-[#526377] dark:text-[#A6A6A6">90%</span>
                    </div>
                    <div class="w-full bg-[#edf2f2] rounded-full h-1 dark:bg-[#1c1c1c]">
                      <div class="bg-[#ca56f2] h-1 rounded-full" style="width: 90%"></div>
                    </div>
                  </div>
                </div>

                <div class="col-span-1">
                  <h4 class="text-5xl dark:text-white font-medium mb-8">Knowledges</h4>
                  <div class="flex gap-y-5 gap-x-2.5 flex-wrap">
                    <button class="resume-btn">Digital Design</button>
                    <button class="resume-btn">Marketing</button>
                    <button class="resume-btn">Social Media</button>
                    <button class="resume-btn">Print</button>
                    <button class="resume-btn">Time Management</button>
                    <button class="resume-btn">Flexibility</button>
                    <button class="resume-btn">Print</button>
                  </div>
                </div>
              </div>
            </div>
            <!-- working section end -->

            <!-- footer start -->
            <footer class="overflow-hidden rounded-b-2xl" style="background: transparent;">
              <p class="text-center py-6 text-gray-lite dark:text-color-910">
                © 2022 All Rights Reserved by
                <a
                  class="hover:text-[#FA5252] duration-300 transition"
                  href="https://themeforest.net/user/ib-themes"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ib-themes
                </a>
                .
              </p>
            </footer>
            <!-- footer end -->
          </div>
          <!-- resume section start -->
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export default class CvComponent {}
