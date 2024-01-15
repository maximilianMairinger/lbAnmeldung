import setup from "./setup"
import PushSaver from "pushsafer-notifications"
import xrray from "xrray"; xrray()
import { josmFsReflection } from "josm-adapter"
import puppeteer, { Locator } from "puppeteer"
import ms from "millisecond"
import delay from "tiny-delay"


if (process.env.PUSHSAFER_KEY === undefined) throw new Error("No pushsafer key provided")
if (process.env.TGM_USERNAME === undefined) throw new Error("No tgm username provided")
if (process.env.TGM_PASSWORD === undefined) throw new Error("No tgm password provided")


console.log("process.env.DEV", process.env.DEV)

function log(...msg) {
  console.log(timeNow(), ...msg)
}

function logError(...msg) {
  console.error(timeNow(), ...msg)
}


function timeNow() {
  return new Date().toLocaleString("de-AT", { timeZone: "Europe/Vienna" })
}


setup("lbAnmeldung").then(async ({app, db}) => {
  const file = await josmFsReflection("./public/res/changes.json", {length: 0})
  function addLineToFile(txt: string) {
    const len = file.length.get()
    file({length: len + 1, [len]: {time: timeNow(), change: txt}})
  }

  const p = new PushSaver({
    k: process.env.PUSHSAFER_KEY as string,
    debug: false
  });


  let working = true
  let lastTxt = await checkWithPup()
  if (file.length.get() === 0) addLineToFile(lastTxt)
  if (!process.env.DEV) sendMsgToClients("Started and operational")
  if (file[file.length.get()-1].change.get() !== lastTxt) {
    sendMsgToClients("Change detected")
    addLineToFile(lastTxt)
  }
  setInterval(async () => {
    const newTxt = await checkWithPup()
    try {
      if (!working) {
        sendMsgToClients("Operational")
      }
      working = true
      if (lastTxt !== newTxt) {
        addLineToFile(newTxt)
        sendMsgToClients("Change detected")
      }
    }
    catch(e) {
      logError(e)
      if (working) {
        sendMsgToClients("Not operational")
      }
      working = false
    }
  }, ms("5min"))
  
  






  function sendMsgToClients(msg: string, priority = 0) {
    return new Promise((res, rej) => {
      log(msg)
      p.send( {s: 5, m: process.env.DEV ? `[dev]: ${msg}` : `[prod]: ${msg}`, pr: priority}, ( err, result ) => {
        res({ok: !err, result, err})
      });
    })
  }

  
})




async function checkWithPup() {
  log("starting pup")

  const browser = await puppeteer.launch({
    headless: process.env.DEV ? false : 'new',
    args: [
      '--no-sandbox'
    ],
  });
  const page = await browser.newPage();
  const timeout = 20000;
  page.setDefaultTimeout(timeout);

  {
    const targetPage = page;
    await targetPage.setViewport({
        width: 1010,
        height: 876
    })
  }
  {
    const targetPage = page;
    const promises = [] as any[];
    const startWaitingForEvents = () => {
        promises.push(targetPage.waitForNavigation());
    }
    startWaitingForEvents();
    await targetPage.goto('https://lb-anmeldung.tgm.ac.at');
    await Promise.all(promises);
  }
  // {
  //   const targetPage = page;
  //   await (Locator.race([
  //       targetPage.locator('::-p-aria(TGM Benutzername)'),
  //       targetPage.locator('form > div > div:nth-of-type(1) input'),
  //       targetPage.locator('::-p-xpath(//*[@id=\\"app\\"]/div[2]/div/div/div/div/form/div/div[1]/div/input)'),
  //       targetPage.locator(':scope >>> form > div > div:nth-of-type(1) input')
  //   ]) as any)
  //       .setTimeout(timeout)
  //       .click({
  //         offset: {
  //           x: 163.953125,
  //           y: 26.65625,
  //         },
  //       });
  // }
  {
    const targetPage = page;
    await (Locator.race([
        targetPage.locator('::-p-aria(TGM Benutzername)'),
        targetPage.locator('form > div > div:nth-of-type(1) input'),
        targetPage.locator('::-p-xpath(//*[@id=\\"app\\"]/div[2]/div/div/div/div/form/div/div[1]/div/input)'),
        targetPage.locator(':scope >>> form > div > div:nth-of-type(1) input')
    ]) as any)
        .setTimeout(timeout)
        .fill(process.env.TGM_USERNAME as string);
  }
  {
    const targetPage = page;
    await targetPage.keyboard.down('Tab');
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up('Tab');
  }
  {
    const targetPage = page;
    await (Locator.race([
        targetPage.locator('::-p-aria(Passwort)'),
        targetPage.locator('form > div > div:nth-of-type(2) input'),
        targetPage.locator('::-p-xpath(//*[@id=\\"app\\"]/div[2]/div/div/div/div/form/div/div[2]/div/input)'),
        targetPage.locator(':scope >>> form > div > div:nth-of-type(2) input')
    ]) as any)
        .setTimeout(timeout)
        .fill(process.env.TGM_PASSWORD as string);
  }
  {
    const targetPage = page;
    const promises = [];
    const startWaitingForEvents = () => {
        promises.push(targetPage.waitForNavigation());
    }
    await Locator.race([
        targetPage.locator('::-p-aria(Anmelden)'),
        targetPage.locator('#app > div.container button'),
        targetPage.locator('::-p-xpath(//*[@id=\\"app\\"]/div[2]/div/div/div/div/form/div/button)'),
        targetPage.locator(':scope >>> #app > div.container button'),
        targetPage.locator('::-p-text(Anmelden)')
    ])
        .setTimeout(timeout)
        .on('action', () => startWaitingForEvents())
        .click({
          offset: {
            x: 89.953125,
            y: 31.65625,
          },
        });
    await Promise.all(promises);
  }

  await delay(50)
  await page.waitForSelector("#app > div.ui.container > div.ui.styled.fluid.accordion h5.ui.top.attached.header")
  await delay(3000)
  
  const str = await page.evaluate(() => {
    const els = document.querySelectorAll("#app > div.ui.container > div.ui.styled.fluid.accordion h5.ui.top.attached.header")
    if (els === null) return null
    let str = ""
    for (const e of Array.from(els)) {
      str += e.textContent + "\n"
    }

    return str === "" ? null : str
  })

  if (str === null) {
    throw new Error("Could not find the text")
  }

  await browser.close();

  log("done pup")

  return str
}









