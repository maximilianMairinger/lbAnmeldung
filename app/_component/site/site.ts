import Component from "../component"
import declareComponent from "../../lib/declareComponent"
import BlockButton from "./../_themeAble/_focusAble/_formUi/_rippleButton/_blockButton/blockButton"
import ajaon from "ajaon"
import delay from "delay"
import diff from "fast-diff"
import { Data } from "josm"

const ajax = ajaon()


export default class Site extends Component {

  constructor() {
    super()


    const historyWrapper = ce("history-wrapper")

    this.apd(new BlockButton("Open history", async () => {
      historyWrapper.emptyNodes()
      let changes = (await ajax.get("/res/changes.json")) as {change: string, time: string}[]
      console.log(changes)
      for (let i = 0; i < changes.length; i++) {
        const change = changes[i]
        const historyEntryElem = ce("history-entry")
        historyWrapper.prepend(historyEntryElem)

        const heading = ce("h2")
        heading.txt(`List from ${change.time}`)
        historyEntryElem.apd(heading)


        const fullEntryElem = ce("full-entry")
      

        const showRawToggle = new Data(true)
        fullEntryElem.on("click", () => {
          showRawToggle.set(!showRawToggle.get())
        })


        const lastChange = changes[i -1]
        let diffTxt: string
        if (lastChange !== undefined) {
          const diffs = diff(lastChange.change, change.change)
          let s = ""
          for (const d of diffs) {
            if (d[0] === 0) s += "<diff-same>" + d[1] + "</diff-same>"
            else if (d[0] === 1) s += "<diff-add>" + d[1] + "</diff-add>"
            else if (d[0] === -1) s += "<diff-rem>" + d[1] + "</diff-rem>"
          }
          diffTxt = s
        }
        else {
          diffTxt = "<diff-same>" + change.change + "</diff-same>"
        }

        showRawToggle.get((showRawToggle) => {
          fullEntryElem.html(showRawToggle ? diffTxt : change.change)
        })
        
        
        historyEntryElem.apd(fullEntryElem)
      }
      await delay(500)
    }))

    
    this.apd(historyWrapper)


  }

  stl() {
    return require("./site.css").toString()
  }
  pug() {
    return require("./site.pug").default
  }
}

declareComponent("site", Site)
