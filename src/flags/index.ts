import aeFlag from "./AE.svg";
import arFlag from "./AR.svg";
import atFlag from "./AT.svg";
import auFlag from "./AU.svg";
import brFlag from "./BR.svg";
import chFlag from "./CH.svg";
import cnFlag from "./CN.svg";
import czFlag from "./CZ.svg";
import deFlag from "./DE.svg";
import dkFlag from "./DK.svg";
import frFlag from "./FR.svg";
import gbFlag from "./GB.svg";
import hrFlag from "./HR.svg";
import inFlag from "./IN.svg";
import itFlag from "./IT.svg";
import jpFlag from "./JP.svg";
import krFlag from "./KR.svg";
import mxFlag from "./MX.svg";
import myFlag from "./MY.svg";
import nlFlag from "./NL.svg";
import nzFlag from "./NZ.svg";
import seFlag from "./SE.svg";
import usFlag from "./US.svg";
import zaFlag from "./ZA.svg";

export const flagMap: Record<string, string> = {
  AE: aeFlag,
  AR: arFlag,
  AT: atFlag,
  AU: auFlag,
  BR: brFlag,
  CH: chFlag,
  CN: cnFlag,
  CZ: czFlag,
  DE: deFlag,
  DK: dkFlag,
  FR: frFlag,
  GB: gbFlag,
  HR: hrFlag,
  IN: inFlag,
  IT: itFlag,
  JP: jpFlag,
  KR: krFlag,
  MX: mxFlag,
  MY: myFlag,
  NL: nlFlag,
  NZ: nzFlag,
  SE: seFlag,
  US: usFlag,
  ZA: zaFlag,
};

export const fallbackFlag = gbFlag;
