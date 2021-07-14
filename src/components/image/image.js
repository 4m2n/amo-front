import React, { useEffect, useState } from "react"
import { pipe, tap, map, prop, zip, join } from "ramda"

// Image :: Props -> Component
const Image = ({
  filename = "",
  alt = "",
}) => {
  const [jpgSrcSet, setjpgSrcSet] = useState("")

  const sizes = [768, 1024, 1216, 1408]

  // createPrefixedFilesFromList :: [Number] -> String -> String -> [String]
  const createPrefixedFilesFromList = sizes => ext => filename => map(
    prefix => `${filename}_${prefix}.${ext}`,
    sizes,
  )

  // createSourceList :: String -> String -> [String]
  const createSourceList = createPrefixedFilesFromList(sizes)

  const generateImageSizesFromList = pipe(
    map(size => `(max-width: ${size}px) ${size}px`),
    join(", "),
  )

  // // createSrcset :: (Number, String) -> String
  // const createSrcset = (size, source) => `${source} ${size}w`

  useEffect(() => pipe(
    createSourceList("jpg"),
    sources => Promise.all(sources.map(
      source => import(`/src/assets/images/${source}`),
    )).then(pipe(
      map(prop("default")),
      zip(sizes),
      map(([size, source]) => `${source} ${size}w`),
      join(', '),
      setjpgSrcSet,
      console.warn,
    ))
  )(filename))

  // si la fenetre fait 480px de large ou moins, alors l'image fera 440px de large
  return (
    <>
      {jpgSrcSet !== "" &&
        <img
          srcSet={jpgSrcSet}
          sizes={generateImageSizesFromList(sizes)}
          alt={alt}
        />
      }
    </>
  )
}

export default Image
