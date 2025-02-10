import { Jimp } from 'jimp'
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

const INPUT_DIR = './input/'
const OUTPUT_DIR = './output/'

const removeDSStore = f => f !== '.DS_Store'

const getMask = async (jimpImage) => {
  const WHITE = 0xffffffff
  const mask = jimpImage.clone()
  const { width, height } = mask.bitmap
  const white = new Jimp({ width, height, color: WHITE })
  return white.composite(mask, 0, 0).invert()
}

const main = async () => {
  const color = process.argv[2]
  if (!color) {
    console.error(chalk.red('\n** Please provide a color code as an argument! **\n'))
    process.exit(1)
  }
  console.log(chalk.green(`\nColoring images to \#${color} (${`0x${color}ff`}):\n`))
  await fs.readdir(INPUT_DIR, (err, files) => {
    files.filter(removeDSStore).forEach(async file => {
      const inputFilePath = path.join(INPUT_DIR, file)
      const outputFilePath = path.join(OUTPUT_DIR, file)
      try {
        const jimpImage = await Jimp.read(`${INPUT_DIR}/${file}`)
        const { width, height } = jimpImage.bitmap
        console.log('  ', inputFilePath, '\t--> ', outputFilePath, `${width}x${height}`)

        const colorLayer = new Jimp({ width, height, color: parseInt(`0x${color}ff`, 16) })

        const whiteWithMask = await getMask(jimpImage)
        colorLayer.mask(whiteWithMask, 0, 0)
        await colorLayer.write(outputFilePath)
      } catch (err) {
        console.error(inputFilePath, err)
      }
    })
  })
}

main()
