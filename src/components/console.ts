// Styling Variables
const consoleGrey = "font-weight:bold; color:#777;";
const consoleBlue = "font-weight:bold; color:#0F669D;";
const consoleHeaderStyle =
    "font-size:20px; font-weight:bold; letter-spacing:0.02em; line-height:1.4em; font-family:helvetica,arial; color:#0F669D;";
const consoleTitleStyle =
    "font-size:16px; font-weight:normal; letter-spacing:0.2em; line-height:1.4em; font-family:helvetica,arial; color:#0F669D;";
const consoleBodyStyle =
    "font-size:14px; font-weight:lighter; letter-spacing:0.2em; line-height:1.4em; font-family:helvetica,arial; color:#777;";

// Display Variables
const consoleLogo = `
%cXX  XX %cXXXXXX %cXX     XX     %cXXXXXX  XX
%cXX  XX %cXX     %cXX     XX     %cXX  XX  XX
%cXX  XX %cXX     %cXX     XX     %cXX  XX  XX
%cXXXXXX %cXXXX   %cXX     XX     %cXX  XX  XX
%cXXXXXX %cXXXX   %cXX     XX     %cXX  XX  XX
%cXX  XX %cXX     %cXX     XX     %cXX  XX  XX
%cXX  XX %cXX     %cXX     XX     %cXX  XX    
%cXX  XX %cXXXXXX %cXXXXXX XXXXXX %cXXXXXX  XX 
`;

const consoleHeader = "%cSOFTWARE ENGINEER & HUMAN AFTER ALL";
const consoleTitle1 = "%cHello!";
const consoleTitle2 = "%cAbout";
const consoleTitle3 = "%cContact";
const consoleBody1 = `%c
Born & raised right in the Alps, I call Grenoble my home city. I grew with the web and made the frontend my domain of expertise. 
`;

const consoleBody2 = `%c
Currently I'm a Software Engineer at Viseo, where I'm Tech Lead for front-end solutions. In this role i'm auditing projects, concieving & developing webapps, doing consulting work in my domain of expertise and also give courses (to collegues & customers) on new technologies. 

Always learning and growing, and in between my obsessions with my road bike and hockey.
`;


export function print(): void {
    // Log Logo
    console.log(
        consoleLogo,
        consoleGrey,
        consoleBlue,
        consoleGrey,
        consoleBlue,
        consoleGrey,
        consoleBlue,
        consoleGrey,
        consoleBlue,
        consoleGrey,
        consoleBlue,
        consoleGrey,
        consoleBlue,
        consoleGrey,
        consoleBlue,
        consoleGrey,
        consoleBlue,
        consoleGrey,
        consoleBlue,
        consoleGrey,
        consoleBlue,
        consoleGrey,
        consoleBlue,
        consoleGrey,
        consoleBlue,
        consoleGrey,
        consoleBlue,
        consoleGrey,
        consoleBlue,
        consoleGrey,
        consoleBlue,
        consoleGrey,
        consoleBlue
    );

    // Log Body
    console.group(consoleHeader, consoleHeaderStyle);
    console.group(consoleTitle1, consoleTitleStyle);
    console.info(consoleBody1, consoleBodyStyle);
    console.groupEnd();
    console.group(consoleTitle2, consoleTitleStyle);
    console.info(consoleBody2, consoleBodyStyle);
    console.groupEnd();
    console.group(consoleTitle3, consoleTitleStyle);
    Array.from(document.querySelectorAll("#logos > a")).forEach((link) => {
        console.info(link.getAttribute("href"));
    });
    console.groupEnd();
    console.groupEnd();
}