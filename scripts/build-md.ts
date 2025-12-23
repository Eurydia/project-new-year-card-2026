import { writeFileSync } from 'fs'

enum Palette {
  Pink,
  Green,
  Blue,
  Purple,
}

const thumbnail = {
  [Palette.Pink]: [
    'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1519882189396-71f93cb4714b?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1458929526027-052f5d6a3c5e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1495987976467-244d20b4b39a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1529420972496-b5119438ba73?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1527112862739-c3b9466d902e?q=80&w=1546&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1499842790329-14db82033291?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ],
  [Palette.Green]: [
    'https://images.unsplash.com/photo-1475072166306-7bb75d10a53d?q=80&w=1546&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1628356925512-813cd0fb6aba?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1627157691522-89bec1b7701c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ],
  [Palette.Blue]: [
    'https://images.unsplash.com/photo-1530526904956-ee2aab667f93?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1520690214124-2405c5217036?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1471696035578-3d8c78d99684?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1516834474-48c0abc2a902?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1667518570111-4228eec61abd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM5fHx8ZW58MHx8fHx8',
    'https://images.unsplash.com/photo-1710526278917-8a08cad4d826?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExMXx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1685281034881-85559ed2b476?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwNXx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1747552160552-53dd17a6b7e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ],
  [Palette.Purple]: [
    'https://images.unsplash.com/photo-1617476716725-84b235bb69c9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDc1fHx8ZW58MHx8fHx8',
  ],
} as const

const counter = {
  [Palette.Pink]: 0,
  [Palette.Green]: 0,
  [Palette.Blue]: 0,
  [Palette.Purple]: 0,
}

const PaletteColor = {
  [Palette.Pink]: '#f48fb1',
  [Palette.Green]: '#558b2f',
  [Palette.Blue]: '#90caf9',
  [Palette.Purple]: '#90caf9',
} as const

type Data =
  | {
      password: string
      title: string
      favicon: string
      color: Palette
      thumbnail?: undefined
      quote: {
        content: string
        from: string
      }
    }
  | {
      password: string
      title: string
      favicon: string
      color: string
      thumbnail: string
      quote: {
        content: string
        from: string
      }
    }

const Pickup: { [k: string]: Data } = {}

for (const [
  name,
  { thumbnail: currT, color, favicon, password, quote, title },
] of Object.entries(Pickup)) {
  let t = ''
  let c = ''
  if (currT === undefined) {
    const tChoices = thumbnail[color]
    t = tChoices[counter[color]++ % tChoices.length]
    c = PaletteColor[color]
  } else {
    t = currT
    c = color
  }

  const content = `\
---
thumbnail: "${t}"
title: "${title}"
color: "${c}"
password: "${password}"
favicon: "${favicon}"
---

# To **${name}**

Wishing you a new year with a calmer mind and lighter days.

May stress ease its grip, and may you feel more steady from week to week.

May your health stay strong.

May you have good sleep, good energy, and time to rest.

May you find your rhythm. 

And may the year end with you feeling proud of how you took care of yourself and kept going.

> ${quote.content}
>
> &mdash; ${quote.from}


**With warmest wishes for a blessed New Year,**

Thanakorn Phuttharaksa`

  writeFileSync(`./scripts/out/${name}.md`, content, { flag: 'w+' })
}
